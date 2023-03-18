import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isNetWorth$: Observable<boolean>;

  constructor(private route: ActivatedRoute) {
    this.isNetWorth$ = this.route.queryParamMap.pipe(
      map((q) => q.has('v') && q.get('v') === 'net worth')
    );
  }
}
