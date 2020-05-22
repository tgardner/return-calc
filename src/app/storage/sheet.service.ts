import { HttpClient } from '@angular/common/http';
import { StorageService, ILocation } from './storage.service';
import { EnvService } from '../config/env.service';

export class SheetService extends StorageService {
  private galaxyRows: number;

  constructor(private http: HttpClient, private env: EnvService) {
    super();

    this.galaxyRows = this.systemPlanets + 1;
  }

  async load(): Promise<ILocation[]> {
    const url = this.env.get('url') + '/gviz/tq';
    const data = await this.http.get(url, {
      responseType: 'text',
      params: {
        headers: '0'
      }
    }).toPromise();
    this.data = this.parseResponse(data);
    return this.data;
  }

  private parseResponse(response: string): ILocation[] {
    let result = response.replace('/*O_o*/', '').replace(/.*\(/, '');
    result = result.substring(0, result.length - 2);
    const json = JSON.parse(result);
    return this.parseRows(json.table.rows);
  }

  private parseRows(rows: any[]): ILocation[] {
    const data = [];
    for (let i = 0; i < rows.length; ++i) {
      if (i % this.galaxyRows > this.systemPlanets || i % this.galaxyRows === 0) { continue; }
      const row = rows[i];

      for (let j = 0; j < row.c.length; ++j) {
        if (j === 0 || !row.c[j] || !row.c[j].v) { continue; }
        const value = row.c[j].v;

        const location = this.cellToLocation(i, j);
        location.player = value;
        data.push(location);
      }
    }

    return data;
  }

  private cellToLocation(row: number, col: number): ILocation {
    const galaxy = Math.floor(row / this.galaxyRows) + 1;
    const system = col;
    const planet = row % this.galaxyRows;

    return {
      galaxy: galaxy,
      system: system,
      planet: planet
    };
  }
}
