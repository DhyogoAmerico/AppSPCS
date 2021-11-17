import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  // create seletor base for test override property
  selector: 'master',
  template: `
    <div>Test</div>
  `
})
export class BaseComponent implements OnDestroy {
  ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
