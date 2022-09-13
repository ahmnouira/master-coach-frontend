import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-card-tools',
  templateUrl: './client-card-tools.component.html',
  styleUrls: ['./client-card-tools.component.scss']
})
export class ClientCardToolsComponent implements OnInit {

  selectedUser: any 




  constructor() { }

  ngOnInit(): void {
  }

  handleEdit() {

  }


  deleteUser(selectedUser) {

  }
}
