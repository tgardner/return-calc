import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      var url: string = this.dataSheet + "/gviz/tq";
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

  public search() : void {
    if(!this.galaxyData) return;

    var json = this.galaxyData;
    var results = [];
    for(var row = 0; row < json.table.rows.length; ++row) {
      var r = json.table.rows[row];
      if(!r) continue;

      for(var col = 0; col < json.table.cols.length; ++col) {
          var c = r.c[col];
          if(!c || !c.v) continue;

          if(c.v.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) {
            var system = col;
            var galaxy = Math.floor(row / 17) + 1;
            var planet = row - ((galaxy - 1) * 17);
            var location: string = galaxy.toString() + ":" + system.toString() + ":" + planet.toString();
            results.push({location: location, player: c.v.toString()});
          }
      }
    }
    results.sort(function(a,b) {
      var aP = a.location.split(":");
      var bP = b.location.split(":");
      if(aP[0] != bP[0]) return parseInt(aP[0]) < parseInt(bP[0]) ? -1 : 1;
      if(aP[1] != bP[1]) return parseInt(aP[1]) < parseInt(bP[1]) ? -1 : 1;
      if(aP[2] != bP[2]) return parseInt(aP[2]) < parseInt(bP[2]) ? -1 : 1;
      return 0;
    });
    this.searchResults = results;
  }

  private parseResponse(response: string) : object {
    var result = response.replace("/*O_o*/", "").replace(/.*\(/, "");
    result = result.substring(0, result.length - 2);
    var json = JSON.parse(result);
    return json
  }

  private getOffset() : number {
    return 16 * (this.galaxy - 1) + 1;
  }

}
