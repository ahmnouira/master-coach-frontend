import { Component, Input, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';

@Component({
  selector: 'app-client-card-view',
  templateUrl: './client-card-view.component.html',
  styleUrls: ['./client-card-view.component.scss']
})
export class ClientCardViewComponent extends UserHelper implements OnInit {

  user :any 


  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
