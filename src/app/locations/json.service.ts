import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ILocation } from './ilocation';
import { HttpClient } from '@angular/common/http';

export class JsonServiceConfig {
  url: string
}

interface IDataStore {
  locations: ILocation[];
}

@Injectable({
  providedIn: 'root'
})
export class JsonService extends BaseService {
  constructor(private http: HttpClient, public config: JsonServiceConfig) {
    super();
  }
  
  async load(): Promise<ILocation[]> {
    var data = await this.http.get<IDataStore>(this.config.url).toPromise();
    this.data = data.locations;
    return this.data;
  }
}
