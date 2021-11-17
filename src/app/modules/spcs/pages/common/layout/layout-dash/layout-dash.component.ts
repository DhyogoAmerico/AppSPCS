import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-dash',
  templateUrl: './layout-dash.component.html',
  styleUrls: ['./layout-dash.component.less']
})
export class LayoutDashComponent implements OnInit {

  public typeUSer = 'admin';
  constructor() { }

  ngOnInit() {
  }

}
