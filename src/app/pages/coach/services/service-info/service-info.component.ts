import { Component, Input, OnInit } from '@angular/core';
import { BasicHelper } from 'src/app/helpers/BasicHelper';
import { Service } from 'src/app/models/service/service.model';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent extends BasicHelper implements OnInit {

  @Input() service: Service;

  testimonies: any[]

  constructor() { super()}

  ngOnInit(): void {
    this.testimonies = this.getArray(this.service.testimonies)
  }
}
