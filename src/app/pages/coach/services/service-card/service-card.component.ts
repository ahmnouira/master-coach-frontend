import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;

  image: string;

  constructor() {}

  ngOnInit(): void {
    this.image = this.getPicture(this.service.image);
    console.log('image', this.image);
  }

  getPicture(image: any): string {
    if (typeof image === 'string')
      return environment.apiUrl + '/uploads' + image;

    return ''; // by default
  }
}
