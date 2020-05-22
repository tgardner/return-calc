import { Component } from '@angular/core';
import { BattleReportParser, BattleReport, Winner } from '../../battle-report';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-profit-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class ProfitCalculatorComponent {
  public Editor = ClassicEditor;
  public report: string = '';
  public battleReport: BattleReport;
  public debug: boolean = false;

  constructor() {}

  public parse(): void {
    var parser = new BattleReportParser();
    this.battleReport = parser.parse(this.report);
  }

  public clear(): void {
    this.report = '';
    this.battleReport = null;
  }

  public changeWinner($event) {
    this.battleReport.winner = $event.target.checked ? Winner.Attacker : Winner.Defender;
  }
}
