import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/interfaces/service.interface';
import { ServicesService } from 'src/app/services/services-service/services.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss'],
  animations: Animations,
})
export class ServiceAddComponent implements OnInit {
  form: IService = {
    description: '',
    title: '',
    isFree: true,
    isFixedPrice: true,
    testimonies: [],
    isAutoConfirmed: false,
    image: '',
    duration: '',
    category: '',
    price: 0,
  };

  error: string = '';
  isLoading = false;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {}

  addPhoto(event: any) {}

  async submit() {
    const { description, title, price } = this.form;

    this.isLoading = true;

    this.servicesService.addService(this.form).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.error = '';
        this.isLoading = false;
      },
      (err) => this.onError(err)
    );
  }

  onError(error: any) {
    console.log(error);
    this.isLoading = false;
    this.error = error;
  }
}
