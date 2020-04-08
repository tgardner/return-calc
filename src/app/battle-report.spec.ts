import { BattleReportParser, Winner } from './battle-report';

describe('BattleReportParser', () => {
  let parser = new BattleReportParser();

  it('should parse no ships or defenses', () => {
    const reportString = '<p>The attacker has won the battle obtaining 0 metal, 0 crystal and 0 Deuterium.<br>The attacker has lost a total of 0 units and 0 deuterium.<br>The defender has lost a total of 0 units and 0 deuterium.<br>A debris field of 0 metal and 0 crystal is now floating in orbit around the planet.<br>The chance for a moon to arise from the debris is 0%.</p><h4>Beginning of Battle</h4><figure class="table"><table><thead><tr><th><strong>Attackers</strong></th><th><strong>Defenders</strong></th></tr></thead><tbody><tr><td><p><strong>TDizzle [3:153:12 (M)]</strong><br><strong>WSA:+180%/+180%/+180%</strong>Ships</p><p>Espionage Probe</p><p>1</p></td><td><strong>Void2 [3:157:10 (M)]</strong><br><strong>WSA:+80%/+90%/+80%</strong>Destroyed</td></tr></tbody></table></figure><h4>End of Battle</h4><figure class="table"><table><thead><tr><th><strong>Attackers</strong></th><th><strong>Defenders</strong></th></tr></thead><tbody><tr><td><p><strong>TDizzle [3:153:12 (M)]</strong><br><strong>WSA:+180%/+180%/+180%</strong>Ships</p><p>Espionage Probe</p><p>1</p></td><td><strong>Void2 [3:157:10 (M)]</strong><br><strong>WSA:+80%/+90%/+80%</strong>Destroyed</td></tr></tbody></table></figure>';

    let report = parser.parse(reportString);
    expect(Object.keys(report.attackers).length).toEqual(1);
    expect(Object.keys(report.defenders).length).toEqual(1);
    expect(report.winner).toEqual(Winner.Attacker);
  });

  it('should parse an ACS draw', () => {
    const reportString = '<p>The battle ended in a draw.<br>The attacker has lost a total of 9,000,000 units and 1,000,000 deuterium.<br>The defender has lost a total of 2,082,954,000 units and 101,989,500 deuterium.<br>A debris field of 44,839,800 metal and 41,056,800 crystal is now floating in orbit around the planet.<br>The chance for a moon to arise from the debris is 20%.</p><h4>Beginning of Battle</h4><figure class="table"><table><thead><tr><th><strong>Attackers</strong></th><th><strong>Defenders</strong></th></tr></thead><tbody><tr><td><p><strong>TDizzle [1:51:12 (M)]</strong><br><strong>WSA:+180%/+180%/+180%</strong>Ships</p><p>Deathstar</p><p>251</p><p><strong>Greekgod2309 [1:64:6 (M)]</strong><br><strong>WSA:+170%/+170%/+170%</strong>Ships</p><p>Deathstar</p><p>1,120</p></td><td><p><strong>Fallenheroes [1:44:6 (P)]</strong><br><strong>WSA:+180%/+170%/+180%</strong>Ships</p><p>Large Cargo</p><p>12,500</p><p>Solar Satellite</p><p>1,200</p><p>Deathstar</p><p>16</p><p>Defense</p><p>Rocket Launcher</p><p>500,000</p><p>Light Laser</p><p>100,000</p><p>Heavy Laser</p><p>20,000</p><p>Gauss Cannon</p><p>5,000</p><p>Ion Cannon</p><p>3,000</p><p>Plasma Turret</p><p>2,600</p><p>Small Shield Dome</p><p>1</p><p>Large Shield Dome</p><p>1</p></td></tr></tbody></table></figure><h4>End of Battle</h4><figure class="table"><table><thead><tr><th><strong>Attackers</strong></th><th><strong>Defenders</strong></th></tr></thead><tbody><tr><td><p><strong>TDizzle [1:51:12 (M)]</strong><br><strong>WSA:+180%/+180%/+180%</strong>Ships</p><p>Deathstar</p><p>251</p><p><strong>Greekgod2309 [1:64:6 (M)]</strong><br><strong>WSA:+170%/+170%/+170%</strong>Ships</p><p>Deathstar</p><p>1,119</p></td><td><p><strong>Fallenheroes [1:44:6 (P)]</strong><br><strong>WSA:+180%/+170%/+180%</strong>Ships</p><p>Large Cargo</p><p>89</p><p>Solar Satellite</p><p>5</p><p>Deathstar</p><p>2</p><p>Defense</p><p>Rocket Launcher</p><p>3,758</p><p>Light Laser</p><p>759</p><p>Heavy Laser</p><p>158</p><p>Gauss Cannon</p><p>34</p><p>Ion Cannon</p><p>25</p><p>Plasma Turret</p><p>18</p></td></tr></tbody></table></figure><h4>After Round 1</h4><h4>After Round 2</h4><h4>After Round 3</h4><h4>After Round 4</h4><h4>After Round 5</h4>';

    let report = parser.parse(reportString);
    expect(Object.keys(report.attackers).length).toEqual(2);
    expect(Object.keys(report.defenders).length).toEqual(1);
    expect(report.winner).toEqual(Winner.Defender);
  });

  it('should gracefully handle bad input', () => {
    const reportString = 'this is not a valid report';
    let report = parser.parse(reportString)
    expect(report).toBeNull();
  });

});