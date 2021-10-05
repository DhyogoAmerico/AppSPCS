import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps-component',
  templateUrl: './steps-component.component.html',
  styleUrls: ['./steps-component.component.less']
})
export class StepsComponent implements OnInit {
  @Input() itemSteps: any[];
  @Input() currentStep = 0;
  constructor() {
  }
  
  ngOnInit() {
    console.log(this.itemSteps.length);
  }

}
