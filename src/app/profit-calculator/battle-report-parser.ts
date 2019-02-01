import {SHIPS, IShipCost} from '../ship';
const allowedShips :string[] = SHIPS.map(s => s.name);

interface IMap<T> {
    [index: string]: T;
    [index: number]: T;
}

class ShipCost implements IShipCost {
  public constructor(
    public metal: number = 0,
    public crystal: number = 0,
    public deuterium: number = 0) {

  }
}

class Player {
  public initial: IMap<number> = {};
  public final: IMap<number> = {};
  public get losses(): IShipCost {
    return this.calculateLosses();
  }

  public constructor(public name: string) {
  }

  public loadShips(shipString: string, amountString: string, initial: boolean = true) : void {
    var map :IMap<number> = initial ? this.initial : this.final;
    var ships = shipString.split('\t');
    var amounts = amountString.split('\t').map(a => parseInt(a));

    for(var i = 0; i < ships.length; ++i) {
      var ship = ships[i];
      if(allowedShips.indexOf(ship) < 0) continue;
      map[ship] = (map[ship] || 0) + amounts[i];
    }
  }

  private calculateLosses() : IShipCost {
    var losses: IShipCost = new ShipCost();

    const reducer = (acc, c) => {
      var lost = this.initial[c.name] - (this.final[c.name] || 0);
      acc.metal += lost * c.metal || 0;
      acc.crystal += lost * c.crystal || 0;
      acc.deuterium += lost * c.deuterium || 0;
      return acc;
    };

    SHIPS
      .filter(ship => !!this.initial[ship.name])
      .reduce(reducer, losses);

    return losses;
  }
}

enum Winner {
  Attacker = 0,
  Defender = 1
}

export class BattleReport {
  public attackers: IMap<Player> = {};
  public defenders: IMap<Player> = {};
  public debris: IShipCost;
  public resources: IShipCost;
  public get profit(): IShipCost {
    return {
      metal: this.resources.metal + this.debris.metal - this.losses.metal,
      crystal: this.resources.crystal + this.debris.crystal - this.losses.crystal,
      deuterium: this.resources.deuterium + this.debris.deuterium - this.losses.deuterium
    };
  };
  public get dividend(): IShipCost {
    var playerCollection: IMap<Player> = this.winningPlayers;
    var players = Object.keys(playerCollection).length;

    return {
      metal: Math.round(this.profit.metal / players),
      crystal: Math.round(this.profit.crystal / players),
      deuterium: Math.round(this.profit.deuterium / players)
    };
  }
  public get winningPlayers():IMap<Player> {
    return (this.winner === Winner.Attacker) ? this.attackers : this.defenders;
  }
  public get losses(): IShipCost {
    return this.calculateLosses();
  }
  public winner: Winner = Winner.Defender;

  private calculateLosses(): IShipCost {
    var losses :IShipCost = new ShipCost();

    var playerCollection: IMap<Player> = this.winningPlayers;
    const reducer = (acc, c) => {
      acc.metal += c.losses.metal;
      acc.crystal += c.losses.crystal;
      acc.deuterium += c.losses.deuterium;
      return acc;
    };
    Object.values(playerCollection).reduce(reducer, losses);
    return losses;
  }
}

export class BattleReportParser {
  private allowShips: string[];
  private santizeNumber = /[\,\']/g;

  public constructor(private report: string) {
    this.allowShips = SHIPS.map(function(s) {
      return s.name;
    });
  }

  public parse() : BattleReport {
    var lines: string[] = this.report.split('\n');
    var buffering: boolean = false;
    var bufferStart: number = 0;
    var result: BattleReport = new BattleReport();

    for(var i = 0; i < lines.length; ++i) {
      var line = lines[i];

      if(line.indexOf("Round 1") >= 0 || line.indexOf("END OF BATTLE") >= 0) {
        buffering = true;
        bufferStart = i;
        continue;
      } else if(line.indexOf("obtaining") >= 0) {
        var regex = /obtaining ([0-9,]+) Metal, ([0-9,]+) Crystal and ([0-9,]+) Deuterium/gi;
        var matches = regex.exec(line);
        result.resources = {
          metal: parseInt(matches[1].replace(this.santizeNumber,'')),
          crystal: parseInt(matches[2].replace(this.santizeNumber,'')),
          deuterium: parseInt(matches[3].replace(this.santizeNumber,''))
        };
      } else if (line.indexOf("A debris field of") >= 0) {
        var regex = /A debris field of ([0-9,']+) Metal and ([0-9,']+) Crystal/gi;
        var matches = regex.exec(line);
        result.debris = {
          metal: parseInt(matches[1].replace(this.santizeNumber,'')),
          crystal: parseInt(matches[2].replace(this.santizeNumber,'')),
          deuterium: 0
        };
      }

      if(!buffering) continue;

      if(line.indexOf("The attacking fleet fires a total force of") >= 0) {
        buffering = false;
        this.parseRound(result, lines.slice(bufferStart, i), true);
      } else if (line.indexOf("has won the battle") >= 0) {
        buffering = false
        this.parseRound(result, lines.slice(bufferStart, i), false);

        result.winner = (line.indexOf("attacker") >= 0) ? Winner.Attacker : Winner.Defender;
      }
    }

    return result;
  }

  private fillPlayer(playerCollection: IMap<Player>, playerData: string[], initial: boolean = true) : void {
    var name = playerData[0].split('	  ')[1].trim();
    var player: Player = playerCollection[name];
    if(!player) {
      playerCollection[name] = player = new Player(name);
      player.loadShips(playerData[2], playerData[3], true);
      if(!initial) {
        player.loadShips(playerData[2], playerData[3], false);
      }
    } else {
      player.loadShips(playerData[2], playerData[3], initial);
    }
  }

  private parseRound(report: BattleReport, buffer: string[], initial: boolean = true) : void {
    const collectionMap: IMap<IMap<Player>> = {
      "Attacker": report.attackers,
      "Defender": report.defenders
    };
    for(var i = 0; i < buffer.length; ++i) {
      for(var j in collectionMap) {
        if(buffer[i].indexOf(j) >= 0) {
          var playerData = buffer.slice(i, i + 4);
          this.fillPlayer(collectionMap[j], playerData, initial);
          i = i + 3;
        }
      }
    }
  }
}
