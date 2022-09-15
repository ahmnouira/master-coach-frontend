import { Component, Input, OnInit } from '@angular/core';
import { ServiceChez } from 'src/app/models/service/service-chez.enum';
import { ServiceFormat } from 'src/app/models/service/service-format.enum';
import { SessionType } from 'src/app/models/service/service-type.enum';

@Component({
  selector: 'app-value-info',
  templateUrl: './value-info.component.html',
  styleUrls: ['./value-info.component.scss'],
})
export class ValueInfoComponent implements OnInit {
  @Input() chez: ServiceChez;
  @Input() type: SessionType;
  @Input() format: ServiceFormat;

  @Input() center: boolean = true;

  title: string;
  icon: string;

  constructor() {}

  ngOnInit(): void {
    if (this.format) {
      this.getData();
    }
    if (this.type) {
      this.getType();
    }
  }

  getData() {
    switch (this.format) {
      case ServiceFormat.CONFERENCE:
        this.title = 'Session via visioconférence';
        this.icon = 'assets/img/common/video-call.svg';
        break;

      case ServiceFormat.PRESENT:
        this.title = this.chez
          ? 'Session présentiel chez ' + this.chez
          : 'Session individuelle';
        this.icon = 'assets/img/common/profile%20(1).svg';
        break;
      default:
        break;
    }
  }
  getType() {
    this.title = `Session ${
      this.type === SessionType.INDIVIDUAL
        ? 'individuelle'
        : SessionType.COLLECTIVE
        ? 'collective'
        : ''
    }`;
    this.icon = 'assets/img/common/profile%20(1).svg';
  }
}
