import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent extends PageHelper implements OnInit {
  filterString = '';

  constructor(private servicesService: ServicesService) {
    super();
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.getData(this.servicesService.getServices({ all: false }), {
      debug: true,
    });
  }

  filterInputChanged(event: any) {}
}
