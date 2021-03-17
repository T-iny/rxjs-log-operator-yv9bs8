import { Component } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { log1, log2, log3 } from './log.operator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  destroy$ = new Subject();

  ngOnInit() {
    interval(1000).pipe(
      log1('from log1'),
      map(e => e * 10),
      log2('from log2'),
      map(e => e * 10),
      log3('from log3'),
      takeUntil(this.destroy$)
    )
    .subscribe(e => console.log('from subscription', e));

  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
