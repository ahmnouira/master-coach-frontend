import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';

@Component({
  selector: 'app-client-invited-list',
  templateUrl: './client-invited-list.component.html',
  styleUrls: ['./client-invited-list.component.scss']
})
export class ClientInvitedListComponent extends PageHelper implements OnInit {

  constructor() { 
      super()
  }

  ngOnInit(): void {
  }

}
