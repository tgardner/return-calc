import { Component, OnInit } from '@angular/core';
import { StorageService, ILocation } from '../../../storage/storage.service';
import { EnvService } from '../../../config/env.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LocationListComponent implements OnInit {
  public galaxy = 1;
  public system = 1;
  public players: string[] = [];
  public searchTerm = '';
  public searchResults: ILocation[] = [];
  public Math: Math;

  public get url(): string {
    if (this.env.get('storageProvider').toUpperCase() === 'SHEET') {
      return this.env.get('url');
    }
    return null;
  }

  constructor(public locationService: StorageService, private env: EnvService) {
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
    if ($event.keyCode === 13) {
      this.search();
    }
  }

  public search(): void {
    this.searchResults = this.locationService.search(this.searchTerm);
  }
}
