import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CalculatorType } from './calculator/calculator.component';

@Injectable({
  providedIn: 'root'
})
export class CalculatorGuard implements CanActivate {
  
  constructor(private router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var calculator = next.paramMap.get('calculator')!;
    const calculatorEnum = Object.keys(CalculatorType)
      .find(key => key.toLowerCase() === calculator.toLowerCase());

    if (!calculatorEnum) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;

  }
}
