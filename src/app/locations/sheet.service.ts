import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ILocation } from './ilocation';

export class SheetServiceConfig {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class SheetService extends BaseService {
  private galaxyRows: number;
  constructor(private http: HttpClient, private config: SheetServiceConfig) {
    super();

    this.galaxyRows = this.systemPlanets + 1;
  }

  async load(): Promise<ILocation[]> {
    const url = this.config.url + "/gviz/tq";
    var data = await this.http.get(url, {
      responseType: 'text',
      params: {
        headers: "0"
      }
    }).toPromise();
    this.data = this.parseResponse(data);
    return this.data;
  }
  
  private parseResponse(response: string): ILocation[] {
    var result = response.replace("/*O_o*/", "").replace(/.*\(/, "");
    result = result.substring(0, result.length - 2);
    var json = JSON.parse(result);
    return this.parseRows(json.table.rows);
  }

  private parseRows(rows: any[]): ILocation[] {
    var data = [];
    for (var i = 0; i < rows.length; ++i) {
      if (i % this.galaxyRows === this.galaxyRows - 1 || i % this.galaxyRows == 0) continue;
      var row = rows[i];

      for (var j = 0; j < row.c.length; ++j) {
        if (j == 0 || !row.c[j] || !row.c[j].v) continue;
        var value = row.c[j].v;

        var location = this.cellToLocation(i, j);
        location.player = value;
        data.push(location);
      }
    }

    return data;
  }

  private cellToLocation(row: number, col: number): ILocation {
    var galaxy = Math.floor(row / this.galaxyRows) + 1
    var system = col;
    var planet = row % this.galaxyRows;

    return {
      galaxy: galaxy,
      system: system,
      planet: planet
    };
  }
}
