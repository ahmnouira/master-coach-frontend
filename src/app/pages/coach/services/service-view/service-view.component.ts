import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Service } from 'src/app/models/service/service.model';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss'],
})
export class ServiceViewComponent
  extends PageHelper<Service>
  implements OnInit
{
  id: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getId();
    this.getService();
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getService() {
    this.getData(this.servicesService.getService(this.id));
  }
}
