import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';
import { ServicesService } from 'src/app/services/services-service/services.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  animations: Animations,
})
export class ServicesListComponent implements OnInit {
  filterString = '';
  isLoading = true;
  found: boolean = true;
  error: string = '';
  services: Service[];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.servicesService
      .getServices({
        all: false,
      })
      .pipe()
      .subscribe(
        (res) => {
          if (!res.success) {
            this.isLoading = false;
            this.error = res.error;
            return;
          }
          this.services = res.data;
          this.found = Boolean(res.data.length);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.found = false;
          this.error = error;
        }
      );
  }

  filterInputChanged(event) {}
}
