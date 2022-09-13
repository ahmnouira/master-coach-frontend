import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-card-view-empty',
  templateUrl: './client-card-view-empty.component.html',
  styleUrls: ['./client-card-view-empty.component.scss']
})
export class ClientCardViewEmptyComponent implements OnInit {


  coachUsers: any[]

  selectedUser: any

  constructor() { }

  ngOnInit(): void {
  }

}
