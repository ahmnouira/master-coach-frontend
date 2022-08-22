import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  filterString = '';

  isLoading = true;
  error: string = '';
  found: boolean;

  services: Service[] = [
    {
      id: '1',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '2',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '3',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },

    {
      id: '4',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
  ];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.servicesService
      .getServices()
      .pipe()
      .subscribe((res) => {
        if (!res.success) {
          this.isLoading = false;
          this.error = res.error;
          return;
        }
        console.log('data', res.data);
        this.services = res.data;
        this.found = Boolean(res.data.length);
        this.isLoading = false;
      });
  }

  filterInputChanged(event) {}
}
