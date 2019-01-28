import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../planet';

const GALAXY_ROWS: number = 17;

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public galaxy: number = 1;
  public system: number = 1;
  public dataSheet: string = "https://docs.google.com/spreadsheets/d/1-jGoyvLPn1WqqtxzldSBXVA_i8kJxJNGejQbcOTbXFs";
  public players: Array<string> = [];
  public searchTerm: string = "";
  public searchResults: Array<string> = [];
  private galaxyData: any;
  public Math: any;

  constructor(private http: HttpClient) {
    this.Math = Math;
  }

  ngOnInit() {
      var url: string = this.dataSheet + "/gviz/tq?headers=1";
      // Load galaxy
      this.http.get(url, {responseType: 'text'})
        .subscribe((response) => {
          this.galaxyData = this.parseResponse(response);
            this.onChange();
        });
  }

  public onChange() : void {
    if(!this.galaxyData) return;

    var start = this.getOffset();
    var players = [];
    for(var i = 0; i < 15; ++i) {
      var c = this.galaxyData.table.rows[start + i].c[this.system];
      players.push(c ? c.v || "" : "");
    }
    this.players = players;
  }

  public catchSearchEnter($event: any):void {
    if($event.keyCode == 13) {
      this.search();
    }
  }

  public search() : void {
    if(!this.galaxyData || !this.searchTerm) return;

    var json = this.galaxyData;
    var results = [];
    for(var row = 0; row < json.table.rows.length; ++row) {
      var r = json.table.rows[row];
      if(!r || row % GALAXY_ROWS < 1) continue;

      for(var col = 0; col < json.table.cols.length; ++col) {
          var c = r.c[col];
          if(!c || !c.v || col === 0) continue;

          if(c.v.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) {
            var planet = this.getLocation(row, col);
            results.push({
              location: planet,
              player: c.v.toString()
            });
          }
      }
    }

    results.sort(function(a,b) {
      if(a.player !== b.player)
        return a.player < b.player ? -1 : 1;

      return Planet.sort(a.location, b.location);
    });

    this.searchResults = results;
  }

  private getLocation(row: number, col: number) : Planet {
    var galaxy = Math.floor(row / GALAXY_ROWS) + 1
    var system = col;
    var planet = row % GALAXY_ROWS + (galaxy - 1);

    return new Planet(galaxy, system, planet);
  }

  private parseResponse(response: string) : object {
    var result = response.replace("/*O_o*/", "").replace(/.*\(/, "");
    result = result.substring(0, result.length - 2);
    var json = JSON.parse(result);
    return json
  }

  private getOffset() : number {
    return (GALAXY_ROWS - 1) * this.galaxy - (GALAXY_ROWS - 2);
  }

}
