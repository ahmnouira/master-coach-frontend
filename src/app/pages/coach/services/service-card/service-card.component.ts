import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { Service } from 'src/app/models/service/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;

  backgroundImage: string;

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
  }

  getBackgroundImage() {
    if (typeof this.service.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #DDF2FA00 0%, #DDF2FA 100%), url(${FileHelper.getUrl(
        this.service.image
      )})`;
    }
  }
}
