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
    // this.isLoading = true

    this.servicesService.hideService(id).subscribe(
      (res) => {
        const filteredData = this.data.filter(
          (el: any) => el._id !== id
        ) as any[];
        console.log(filteredData.length);
        this.found = Boolean(filteredData.length);
        this.onSuccess();
        this.data = [...filteredData];
      },
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
