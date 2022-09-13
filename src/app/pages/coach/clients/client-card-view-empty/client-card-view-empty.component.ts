import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-card-view-empty',
  templateUrl: './client-card-view-empty.component.html',
  styleUrls: ['./client-card-view-empty.component.scss']
})
export class ClientCardViewEmptyComponent implements OnInit {

  coachUsers: any[]

  message: string 

  constructor() { }
  ngOnInit(): void {

      this.message = " Veuillez selectionner un client"
    
    //  Vous n'avez pas de clients dans vos équipes
  }
}
