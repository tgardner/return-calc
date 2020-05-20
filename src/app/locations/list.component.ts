import { Component, OnInit } from '@angular/core';
import { LocationService, ILocation } from './location.service';
import { EnvService } from '../config/env.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LocationListComponent implements OnInit {
  public galaxy: number = 1;
  public system: number = 1;
  public players: string[] = [];
  public searchTerm: string = "";
  public searchResults: ILocation[] = [];
  public Math: any;

  public get url(): string {
    if (this.env.get("storageProvider").toUpperCase() == "SHEET") {
      return this.env.get("url");
    }
    return null;
  }

  constructor(public locationService: LocationService, private env: EnvService) {
    this.Math = Math;
  }

  async ngOnInit() {
    await this.locationService.load();
    this.onChange();
  }

  public onChange(): void {
    this.players = this.locationService.system(this.galaxy, this.system)
      .map(l => l?.player);
  }

  public catchSearchEnter($event: any): void {
    if ($event.keyCode == 13) {
      this.search();
    }
  }

  public search(): void {
    this.searchResults = this.locationService.search(this.searchTerm);
  }
}
