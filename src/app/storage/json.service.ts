import { StorageService, ILocation } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../config/env.service';

interface IDataStore {
  locations: ILocation[];
}

export class JsonService extends StorageService {
  constructor(private http: HttpClient, private env: EnvService) {
    super();
  }

  async load(): Promise<ILocation[]> {
    try {
      const data = await this.http.get<IDataStore>(this.env.get('url')).toPromise();
      this.data = data.locations;
    } catch (e) {
      console.error(e);
      this.data = [];
    }
    return this.data;
  }
}
