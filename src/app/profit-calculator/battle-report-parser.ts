import { SHIPS, IShipCost } from '../ship';
const allowedShips: string[] = SHIPS.map(s => s.name);

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

  public loadShips(ships: string[], initial: boolean = true): void {
    var map: IMap<number> = initial ? this.initial : this.final;

    for (var i = 0; i < ships.length; ++i) {
      var shipString = ships[i];
      var matches = shipString.match("^(.*)\t(.+)$");
      if (!matches) continue;

      var ship = matches[1];
      var amount = parseInt(matches[2].replace(",", ""));
      if (allowedShips.indexOf(ship) < 0) continue;
      map[ship] = (map[ship] || 0) + amount;
    }
  }

  private calculateLosses(): IShipCost {
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
  public get winningPlayers(): IMap<Player> {
    return (this.winner === Winner.Attacker) ? this.attackers : this.defenders;
  }
  public get losses(): IShipCost {
    return this.calculateLosses();
  }
  public winner: Winner = Winner.Defender;

  private calculateLosses(): IShipCost {
    var losses: IShipCost = new ShipCost();

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

  private playerRegex = /^(.*) \[\d{1}:\d{1,3}:\d{1,3} \([MP]\)\]/;

  public constructor(private report: string) {
  }

  public parse(): BattleReport {
    var lines: string[] = this.report.split('\n');
    var bufferStart: number = 0;
    var result: BattleReport = new BattleReport();
    var attackerWon = false;

    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];
      if (line.indexOf("Beginning of Battle") >= 0) {
        bufferStart = i;
      } else if (line.indexOf("End of Battle") >= 0) {
        var roundData = lines.slice(bufferStart, i);
        this.parseRound(result, roundData, true);
        bufferStart = i;
      } else if (line.indexOf("After Round 1") >= 0) {
        var roundData = lines.slice(bufferStart, i);
        this.parseRound(result, roundData, false);
      } else if (line.indexOf("obtaining") >= 0) {
        var regex = /obtaining ([0-9,]+) Metal, ([0-9,]+) Crystal and ([0-9,]+) Deuterium/gi;
        var matches = regex.exec(line);
        result.resources = {
          metal: this.santizeNumber(matches[1]),
          crystal: this.santizeNumber(matches[2]),
          deuterium: this.santizeNumber(matches[3])
        };
      } else if (line.indexOf("A debris field of") >= 0) {
        var regex = /A debris field of ([0-9,']+) Metal and ([0-9,']+) Crystal/gi;
        var matches = regex.exec(line);
        result.debris = {
          metal: this.santizeNumber(matches[1]),
          crystal: this.santizeNumber(matches[2]),
          deuterium: 0
        };
      }

      if (line.indexOf("The attacker has won the battle") >= 0) {
        attackerWon = true;
      }
    }

    result.winner = attackerWon ? Winner.Attacker : Winner.Defender;

    return result;
  }

  private santizeNumber(input: string): number {
    const santizeRegex = /[\,\']/g;
    return parseInt(input.replace(santizeRegex, ''));
  }

  private fillPlayer(report: BattleReport, playerData: string[], initial = true, lastPlayer = false): void {
    var name = playerData[0].match(this.playerRegex)[1];
    var defender = false;
    if (initial && (playerData.indexOf("Destroyed") >= 0 || playerData.indexOf("Defense") >= 0) || lastPlayer) {
      defender = true;
    } else if (!initial) {
      defender = !!report.defenders[name];
    }
    var playerCollection = defender ? report.defenders : report.attackers;
    var player: Player = playerCollection[name];

    if (!player) {
      playerCollection[name] = player = new Player(name);
    }
    playerData.splice(0, 3);
    player.loadShips(playerData, initial);
  }

  private parseRound(report: BattleReport, buffer: string[], initial: boolean = true): void {
    var startIndex = 0;
    for (var i = 0; i < buffer.length; ++i) {
      if (this.playerRegex.test(buffer[i])) {
        if (startIndex === 0) {
          startIndex = i;
          continue;
        }

        var playerData = buffer.slice(startIndex, i);
        startIndex = i;
        this.fillPlayer(report, playerData, initial, false);
      }
    }
    var playerData = buffer.slice(startIndex);
    this.fillPlayer(report, playerData, initial, true);
  }
}
