import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  backgroundImage: string;
  width: string;
  minHeight: string;

  editPath: string;
  viewPath: string;

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getPaths();
    this.width = this.forClient ? '340px' : 'auto';
    this.minHeight = this.forClient ? '200px' : '230px';
  }

  handleHide() {
    this.onHide.emit(this.service._id);
  }

  getPaths() {
    if (this.forClient) {
      this.viewPath = `/pages/client/rdv/detail-formation/${this.service._id}`;
    } else {
      this.editPath = `/pages/coach/services/edit/${this.service._id}`;
      this.viewPath = `/pages/coach/services/view/${this.service._id}`;
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
