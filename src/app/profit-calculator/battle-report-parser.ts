import {SHIPS, IShipCost} from '../ship';

interface IMap<T> {
    [index: string]: T;
    [index: number]: T;
}

class Player {
  public initial: IMap<number> = {};
  public final: IMap<number> = {};
  public losses: IShipCost;
  public constructor(public name: string) {

  }

  public calculateLosses() : void {
    this.losses = {
      metal: 0,
      crystal: 0,
      deuterium: 0
    };

    for(var i = 0; i < SHIPS.length; ++i) {
      var ship = SHIPS[i];
      if(!this.initial[ship.name]) continue;

      var lost = this.initial[ship.name] - (this.final[ship.name] || 0);
      this.losses.metal += lost * ship.metal || 0;
      this.losses.crystal += lost * ship.crystal || 0;
      this.losses.deuterium += lost * ship.deuterium || 0;
    }
  }
}

enum Winner {
  Attacker = 0,
  Defender = 1
}

export class BattleReport {
  public attackers: IMap<Player> = {};
  public defenders: IMap<Player> = {};
  public debris: IShipCost = {
    metal: 0,
    crystal: 0,
    deuterium: 0
  };
  public resources: IShipCost = {
    metal: 0,
    crystal: 0,
    deuterium: 0
  };
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
  public losses: IShipCost;
  public winner: Winner;

  public calculateLosses(): void {
    this.losses = {
      metal: 0,
      crystal: 0,
      deuterium: 0
    };

    var playerCollection: IMap<Player>
      = (this.winner === Winner.Attacker) ? this.attackers : this.defenders;

    for(var i in playerCollection) {
      if(!playerCollection.hasOwnProperty(i)) continue;
      this.losses.metal += playerCollection[i].losses.metal;
      this.losses.crystal += playerCollection[i].losses.crystal;
      this.losses.deuterium += playerCollection[i].losses.deuterium;
    }
  }
}

export class BattleReportParser {
  private allowShips: string[];

  public constructor(private report: string) {
    this.allowShips = SHIPS.map(function(s) {
      return s.name;
    });
  }

  public parse() : BattleReport {
    var lines:Array<string> = this.report.split('\n');
    var round1:boolean = false;
    var endOfBattle:boolean = false;
    var buffer:Array<string>;
    var result: BattleReport = new BattleReport();

    for(var i = 0; i < lines.length; ++i) {
      var line = lines[i];

      if(line === "Round 1") {
        round1 = true;
        buffer = [];
        continue;
      } else if (line === "END OF BATTLE") {
        endOfBattle = true;
        buffer = [];
        continue;
      } else if(line.indexOf("obtaining") >= 0) {
        var regex = /obtaining ([0-9,]+) Metal, ([0-9,]+) Crystal and ([0-9,]+) Deuterium/gi;
        var matches = regex.exec(line);
        result.resources.metal = parseInt(matches[1].replace(/\,/g,''));
        result.resources.crystal = parseInt(matches[2].replace(/\,/g,''));
        result.resources.deuterium = parseInt(matches[3].replace(/\,/g,''));
      } else if (line.indexOf("A debris field of") >= 0) {
        var regex = /A debris field of ([0-9,']+) Metal and ([0-9,']+) Crystal/gi;
        var matches = regex.exec(line);
        result.debris.metal = parseInt(matches[1].replace(/[\,\']/g,''));
        result.debris.crystal = parseInt(matches[2].replace(/[\,\']/g,''));
      }

      if(round1 && line.indexOf("The attacking fleet fires a total force of") >= 0) {
        round1 = false;
        // Parse buffer
        this.extractInitialPlayers(result, buffer);
      }

      if(endOfBattle && line.indexOf("has won the battle") >= 0) {
        endOfBattle = false;
        this.extractResults(result, buffer);

        result.winner = (line.indexOf("attacker") >= 0) ? Winner.Attacker : Winner.Defender;
      }

      if(round1 || endOfBattle) {
        buffer.push(line);
      }
    }
    result.calculateLosses();
    return result;
  }

  private extractInitialPlayers(report: BattleReport, buffer: Array<string>) : void {
    for(var i = 0; i < buffer.length; ++i) {
      if(buffer[i].indexOf("Attacker") >= 0) {
        var playerData = buffer.slice(i, i + 4);
        this.fillPlayer(report.attackers, playerData);
        i = i + 3;
      } else if (buffer[i].indexOf("Defender") >= 0) {
        var playerData = buffer.slice(i, i + 4);
        this.fillPlayer(report.defenders, playerData);
        i = i + 3;
      }
    }
  }

  private fillPlayer(playerCollection: IMap<Player>, playerData: string[]) : void {
    var name = playerData[0].split('	  ')[1];
    var player = playerCollection[name] || new Player(name);

    player.initial = this.createShipMap(playerData[2], playerData[3]);
    player.calculateLosses();
    playerCollection[name] = player;
  }

  private createShipMap(shipString:string, amountString: string) : IMap<number> {
    var result :IMap<number> = {};
    var ships = shipString.split('\t');
    var amounts = amountString.split('\t').map((a) => parseInt(a));
    for(var i = 0; i < ships.length; ++i) {
      var ship = ships[i];
      if(this.allowShips.indexOf(ship) < 0) continue;
      result[ship] = amounts[i];
    }

    return result;
  }

  private extractResults(report: BattleReport, buffer: string[]) : void {
    for(var i = 0; i < buffer.length; ++i) {
      if(buffer[i].indexOf("Attacker") >= 0) {
        var playerData = buffer.slice(i, i + 4);
        var name = playerData[0].split('	  ')[1];
        var player = report.attackers[name];
        player.final = this.createShipMap(playerData[2], playerData[3]);
        player.calculateLosses();
        i = i + 3;
      } else if (buffer[i].indexOf("Defender") >= 0) {
        var playerData = buffer.slice(i, i + 4);
        var name = playerData[0].split('	  ')[1];
        var player = report.defenders[name];
        player.final = this.createShipMap(playerData[2], playerData[3]);
        player.calculateLosses();
        i = i + 3;
      }
    }
  }
}
