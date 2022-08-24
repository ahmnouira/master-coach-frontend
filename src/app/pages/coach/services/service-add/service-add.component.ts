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
    isPriceHidden: false,
    duration: '',
    category: '',
    price: 0,
    image: undefined,
  };

  error: string = '';
  isLoading = false;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {}

  addPhoto(data: File) {
    this.form.image = data as File;
  }

  async submit() {
    this.isLoading = true;

    const { title, description, duration } = this.form;

    if (!title || !description || !duration) {
      this.isLoading = false
      return;
    }

    let formData = new FormData();
    for (const key in this.form) {
      if (key === 'image') {
        formData.append('image', this.form[key] as File);
        formData.append('files', this.form[key] as File);
      } else {
        formData.append(key, JSON.stringify(this.form[key]));
      }
    }

    this.servicesService.addService(formData).subscribe(
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
