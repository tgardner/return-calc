import { Component, OnInit } from '@angular/core';
import { Planet } from '../planet';
import { LocationService, ILocation } from '../location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public galaxy: number = 1;
  public system: number = 1;
  public searchTerm: string = "";
  public searchResults: ILocation[];
  private galaxyData: ILocation[];
  public players: ILocation[];
  public Math: Math;

  constructor(public locationService: LocationService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.locationService.get()
      .then(galaxyData => {
        this.galaxyData = galaxyData;
        this.onChange();
      });
  }

  public onChange(): void {
    if (!this.galaxyData) return;

    var currentPage = this.galaxyData
      .filter(l => l.location.galaxy == this.galaxy && l.location.system == this.system);

    var players = new Array(15);
    for(var i in currentPage) {
      var location = currentPage[i];
      players[location.location.planet - 1] = location.player;
    }

    this.players = players;
  }

  public catchSearchEnter($event: any): void {
    if ($event.keyCode == 13) {
      this.search();
    }
  }

  public search(): void {
    if (!this.galaxyData || !this.searchTerm) return;

    var results = this.galaxyData
      .filter(l => l.player.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0);

    results.sort((a, b) => {
      if (a.player !== b.player)
        return a.player < b.player ? -1 : 1;

      return Planet.sort(a.location, b.location);
    });

    this.searchResults = results;
  }
}
