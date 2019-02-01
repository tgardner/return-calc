import { Component, OnInit } from '@angular/core';
import { BattleReportParser, BattleReport } from './battle-report-parser';

@Component({
  selector: 'app-profit-calculator',
  templateUrl: './profit-calculator.component.html',
  styleUrls: ['./profit-calculator.component.scss']
})
export class ProfitCalculatorComponent implements OnInit {
  public report: string = ``;
  public battleReport: BattleReport;

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
