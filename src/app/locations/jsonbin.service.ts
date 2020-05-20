import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILocation } from './ilocation';
import { LocationService } from './location.service';

export class JsonbinServiceConfig {
  binId: string;
  secretKey: string;
}

interface IDataStore {
  locations: ILocation[];
}

@Injectable()
export class JsonbinService extends LocationService {

  constructor(private http: HttpClient, public config: JsonbinServiceConfig) {
    super();
  }
  
  async load(): Promise<ILocation[]> {
    const url = `https://api.jsonbin.io/b/${this.config.binId}/latest`;
    var data = await this.http.get<IDataStore>(url, {
      headers: {
        "secret-key": this.config.secretKey
      }
    }).toPromise();
    this.data = data.locations;
    return this.data;
  }
}
