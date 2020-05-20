import { HttpClient } from '@angular/common/http';
import { LocationService, ILocation } from './location.service';
import { EnvService } from '../config/env.service';

interface IDataStore {
  locations: ILocation[];
}

export class JsonbinService extends LocationService {

  constructor(private http: HttpClient, private env: EnvService) {
    super();
  }

  async load(): Promise<ILocation[]> {
    const url = `https://api.jsonbin.io/b/${this.env.get('binId')}/latest`;
    var data = await this.http.get<IDataStore>(url, {
      headers: {
        "secret-key": this.env.get('secretKey')
      }
    }).toPromise();

    this.data = data.locations;
    return this.data;
  }
}
