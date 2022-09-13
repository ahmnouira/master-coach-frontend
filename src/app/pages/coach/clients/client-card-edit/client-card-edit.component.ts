import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-card-edit',
  templateUrl: './client-card-edit.component.html',
  styleUrls: ['./client-card-edit.component.scss']
})
export class ClientCardEditComponent implements OnInit {

  selectedUserToupdate: any

  selectedUser: any

  selectedTeam: any 

  coachTeams: any[]

  

  constructor() { }

  saveUser() {}

  ngOnInit(): void {
  }

}
