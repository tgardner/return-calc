import { Component, OnInit } from '@angular/core';
import { SheetService } from '../locations/sheet.service';
import { ILocation } from '../locations/ilocation';
import { JsonService } from '../locations/json.service';
import { JsonbinService } from '../locations/jsonbin.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public galaxy: number = 1;
  public system: number = 1;
  public players: string[] = [];
  public searchTerm: string = "";
  public searchResults: ILocation[] = [];
  public Math: any;

  public get url(): string {
    if(!this.locationService || this.locationService instanceof SheetService) {
      return (this.locationService.config as any).url;
    }
    return null;
  }

  constructor(public locationService: JsonbinService) {
    this.Math = Math;
  }

  async ngOnInit() {
    await this.locationService.load();
    this.onChange();
  }

  public onChange() : void {
    this.players = this.locationService.system(this.galaxy, this.system)
      .map(l => l?.player);
  }

  public catchSearchEnter($event: any): void {
    if ($event.keyCode == 13) {
      this.search();
    }
  }

  public search() : void {
    this.searchResults = this.locationService.search(this.searchTerm);
  }
}
