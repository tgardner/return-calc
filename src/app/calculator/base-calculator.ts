import { CalculatorService } from './calculator.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

export abstract class BaseCalculator implements OnInit {
    constructor(
        public calculator: CalculatorService,
        protected route: ActivatedRoute,
        protected router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((p) => this.load(p));
    }

    protected load(params: Params) {
        this.calculator.load(params);
    }

    public navigate(): Promise<boolean> {
        const state = this.state();

        return this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: state,
                queryParamsHandling: 'merge',
                replaceUrl: true
            });
    }

    protected state(): any {
        return this.calculator.save();
    }
}
