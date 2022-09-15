import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Service } from 'src/app/models/service/service.model';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent extends PageHelper implements OnInit {
  search = '';

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

  hideService(id: string) {
    const filteredData = this.data.filter((el) => el._id !== id);
    this.data = [...filteredData];
    this.found = Boolean(filteredData.length);
    this.servicesService.hideService(id).subscribe(
      (_res) => {},
      (err) => {
        console.error(err);
      }
    );
  }

  trackById(_index: number, service: Service) {
    return service._id;
  }

  filterInputChanged(event: any) {}
}
