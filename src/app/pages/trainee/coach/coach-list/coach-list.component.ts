import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {


  isLoading = false
  error: ''

  search: ''


  constructor() { 
    
  }

  ngOnInit(): void {

  
  }

}
