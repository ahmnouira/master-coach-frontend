import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  filterString = '';


  constructor() { }

  ngOnInit(): void {
  }


  filterInputChanged(event) {
    
  }

}
