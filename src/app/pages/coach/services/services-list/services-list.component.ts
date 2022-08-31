import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { throws } from 'assert';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Service } from 'src/app/models/service/service.model';
import { ServicesService } from 'src/app/services/services-service/services.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  animations: Animations,
})
export class ServicesListComponent
  extends PageHelper
  implements OnInit
{
  filterString = '';

  constructor(private servicesService: ServicesService) {
    super()
  } 

  ngOnInit(): void {
    this.getServices();  
  }

  getServices() {
    this.getData(this.servicesService.getServices({ all: false }), {
      debug: true,
    });
  }

  filterInputChanged(event) {}
}
