import { SHIPS } from '../ship';
import { ICost } from '../icost';

const allowedShips: string[] = SHIPS.map(s => s.name);

interface IMap<T> {
  [index: string]: T;
  [index: number]: T;
}

class Player {
  public initial: IMap<number> = {};
  public final: IMap<number> = {};
  public get losses(): ICost {
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

  private calculateLosses(): ICost {
    var losses: ICost = { metal: 0, crystal: 0, deuterium: 0 };

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
  public debris: ICost = { metal: 0, crystal: 0, deuterium: 0 };
  public resources: ICost = { metal: 0, crystal: 0, deuterium: 0 };
  public get profit(): ICost {
    return {
      metal: this.resources.metal + this.debris.metal - this.losses.metal,
      crystal: this.resources.crystal + this.debris.crystal - this.losses.crystal,
      deuterium: this.resources.deuterium + this.debris.deuterium - this.losses.deuterium
    };
  };
  public get dividend(): ICost {
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
  public get losses(): ICost {
    return this.calculateLosses();
  }
  public winner: Winner = Winner.Defender;

  private calculateLosses(): ICost {
    var losses: ICost = { metal: 0, crystal: 0, deuterium: 0 };

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
  public constructor(private report: string) {
  }

  public parse(): BattleReport {
    let result = new BattleReport();
    let parser = new DOMParser();
    let reportDoc = parser.parseFromString(this.report, 'text/html');

    var header = reportDoc.querySelector("p").textContent;
    var obtainedRegex = /obtaining ([0-9,]+) Metal, ([0-9,]+) Crystal and ([0-9,]+) Deuterium/gi;
    var matches = obtainedRegex.exec(header);
    if (matches != null) {
      result.resources = {
        metal: this.santizeNumber(matches[1]),
        crystal: this.santizeNumber(matches[2]),
        deuterium: this.santizeNumber(matches[3])
      };
    }

    var debrisRegex = /debris\sfield\sof\s([0-9,']+)\smetal\sand\s([0-9,']+)\scrystal/i;
    var matches = debrisRegex.exec(header);
    if (matches != null) {
      result.debris = {
        metal: this.santizeNumber(matches[1]),
        crystal: this.santizeNumber(matches[2]),
        deuterium: 0
      };
    }

    result.winner = header.indexOf("The attacker has won the battle") >= 0 ?
      Winner.Attacker : Winner.Defender;

    // Load Initial
    var attackers = reportDoc.querySelectorAll('table td:first-child');
    var defenders = reportDoc.querySelectorAll('table td:last-child');
    this.parsePlayers(result.attackers, attackers[0].innerHTML, true);
    this.parsePlayers(result.defenders, defenders[0].innerHTML, true);

    // Load Final
    this.parsePlayers(result.attackers, attackers[1].innerHTML, false);
    this.parsePlayers(result.defenders, defenders[1].innerHTML, false);

    return result;
  }

  private parsePlayers(collection: IMap<Player>, input: string, initial: boolean = false): void {
    var unparsed = input;
    var nameRegex = /^(<p>)?<strong>([a-z0-9_-]+)(\s\[\d:\d{1,3}:\d{1,3}\s\([MP]\)\])?<\/strong><br><strong>WSA:[0-9+%/]+<\/strong>(Ships|Defense|Destroyed)(<\/p>)?/i;
    var shipRegex = /^<p>([^>]+)<\/p><p>([0-9,]+)<\/p>(<p>Defense<\/p>)?/i
    var match = unparsed.match(nameRegex);
    while (match != null) {
      var name = match[2];
      if (!collection[name]) {
        collection[name] = new Player(name);
      }

      var player = collection[name];
      var ships = [];

      unparsed = unparsed.replace(nameRegex, "");
      var shipMatch = unparsed.match(shipRegex);

      while (shipMatch != null) {
        ships.push(shipMatch[1] + "\t" + this.santizeNumber(shipMatch[2]));
        unparsed = unparsed.replace(shipRegex, "");
        shipMatch = unparsed.match(shipRegex);
      }
      player.loadShips(ships, initial);
      match = unparsed.match(nameRegex);
    }
  }

  private santizeNumber(input: string): number {
    const santizeRegex = /[\,\']/g;
    return parseInt(input.replace(santizeRegex, ''));
  }
}
