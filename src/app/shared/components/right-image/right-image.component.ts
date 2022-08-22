import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-image',
  templateUrl: './right-image.component.html',
  styleUrls: ['./right-image.component.scss']
})
export class RightImageComponent implements OnInit {

  @Input() page: string

  src : string
  alt: string

  constructor() { }

  ngOnInit(): void {
    this.alt = this.page
    switch (this.page) {
      case 'add-formation':
        this.src = 'assets/img/coach/boutique/add-formation.png'
        break;

      case 'add-service': 
        this.src = 'assets/img/coach/services/add-service.jpg'
        break
      default:
        break;
    }
  }

}
