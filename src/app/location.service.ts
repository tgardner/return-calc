import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planet } from './planet';

const PlanetsPerSystem = 15;
const GalaxyRows = PlanetsPerSystem + 1;

export class LocationServiceConfig {
  url: string
}

export interface ILocation {
  location: Planet,
  player: string
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public readonly url: string;

  constructor(private http: HttpClient,
    config: LocationServiceConfig) {
    this.url = config.url;
  }

  public async get() {
    var url = this.url + "/gviz/tq"
    var response = await this.http.get(url, {
      responseType: 'text',
      params: {
        headers: "0"
      }
    }).toPromise();

    return this.parseResponse(response);
  }

  private parseResponse(response: string): ILocation[] {
    var result = response.replace("/*O_o*/", "").replace(/.*\(/, "");
    result = result.substring(0, result.length - 2);
    var json = JSON.parse(result);
    var locations: ILocation[] = [];

    for (var row = 0; row < json.table.rows.length; ++row) {
      var r = json.table.rows[row];
      if (!r || row % GalaxyRows < 1 || row % GalaxyRows > PlanetsPerSystem) continue;

      for (var col = 0; col < json.table.cols.length; ++col) {
        var c = r.c[col];
        if (!c || !c.v || col === 0) continue;

        var planet = this.getLocation(row, col);
        locations.push({
          location: planet,
          player: c.v.toString()
        });
      }
    }

    return locations;
  }

  private getLocation(row: number, col: number): Planet {
    var galaxy = Math.floor(row / GalaxyRows) + 1
    var system = col;
    var planet = row % GalaxyRows;

    return new Planet(galaxy, system, planet);
  }
}
