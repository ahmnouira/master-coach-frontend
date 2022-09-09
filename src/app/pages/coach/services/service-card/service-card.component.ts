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

  @Input() forClient: boolean = false;

  backgroundImage: string;

  width: string;
  minHeight: string;

  path: string;

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getPath();
    this.width = this.forClient ? '340px' : 'auto';
    this.minHeight = this.forClient ? '200px' : '230px';
  }

  getPath() {
    if (this.forClient) {
      this.path = `/pages/client/rdv/detail-formation`;
    } else {
      this.path = `/pages/coach/services/edit/${this.service._id}`;
    }
  }

  getBackgroundImage() {
    if (typeof this.service.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #DDF2FA00 0%, #DDF2FA 100%), url(${FileHelper.getUrl(
        this.service.image
      )})`;
    }
  }
}
