import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  isWildcardPage$: Observable<boolean>;

  constructor(private route: ActivatedRoute) {
    this.isWildcardPage$ = this.route.data.pipe(
      map((data) => data['wildcard'])
    );
  }
}
