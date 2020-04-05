import { Component } from '@angular/core';
import { BattleReportParser, BattleReport } from '../battle-report';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-profit-calculator',
  templateUrl: './profit-calculator.component.html',
  styleUrls: ['./profit-calculator.component.scss']
})
export class ProfitCalculatorComponent {
  public Editor = ClassicEditor;
  public report: string = '';
  public battleReport: BattleReport;
  public debug: boolean = false;

  constructor() { }

  public parse(): void {
    var parser = new BattleReportParser();
    this.battleReport = parser.parse(this.report);
  }

  public clear(): void {
    this.report = '';
    this.battleReport = null;
  }
}
