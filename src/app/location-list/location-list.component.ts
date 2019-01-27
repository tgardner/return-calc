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

  constructor(private http: HttpClient) {
    this.Math = Math;
  }

  ngOnInit() {
    this.onChange();
  }

  public onChange() : void {
    var url = this.dataSheet + "/gviz/tq";
    var data = {
      tqx: "out:json",
      tq: "select " + this.getColumnName() + " limit 15 offset " + this.getOffset()
    };

    this.http.get(url, {responseType: 'text', params: data})
      .subscribe((response) => {
        var result = response.replace("/*O_o*/", "").replace(/.*\(/, "");
        result = result.substring(0, result.length - 2);
        var json = JSON.parse(result);

        var players = [];
        for(var i = 0; i < json.table.rows.length; ++i) {
          var row = json.table.rows[i];
          players.push(row.c[0].v || "");
        }
        this.players = players;
      });
  }

  private getColumnName() : string {
    var dividend: number = this.system + 1;
    var columnName: string = "";
    var modulo: number;

    while(dividend > 0) {
      modulo = (dividend - 1) % 26;
      columnName = String.fromCharCode(65 + modulo) + columnName;
      dividend = Math.round((dividend - modulo) / 26);
    }

    return columnName;
  }

  private getOffset() : number {
    return 17 * (this.galaxy - 1) + 1;
  }

}
