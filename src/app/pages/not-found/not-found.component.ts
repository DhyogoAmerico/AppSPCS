import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit {

  
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    // this.GetTeste();
  }
  
  GetTeste() {
    this.sharedService.GetAllStates().subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

}
