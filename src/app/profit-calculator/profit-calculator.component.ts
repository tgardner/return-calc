import { Component, OnInit } from '@angular/core';
import { BattleReportParser, BattleReport } from './battle-report-parser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-profit-calculator',
  templateUrl: './profit-calculator.component.html',
  styleUrls: ['./profit-calculator.component.scss']
})
export class ProfitCalculatorComponent implements OnInit {
  public Editor = ClassicEditor;
  public report: string = ``;
  public battleReport: BattleReport;
  public debug : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public parse():void {
    var parser : BattleReportParser = new BattleReportParser(this.report);
    this.battleReport = parser.parse();
  }

  public clear(): void {
    this.report = '';
    this.battleReport = undefined;
  }
}
