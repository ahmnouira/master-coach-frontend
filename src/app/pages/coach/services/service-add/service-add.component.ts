import { Component, OnInit } from '@angular/core';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IService } from 'src/app/interfaces/service.interface';
import { ServicesService } from 'src/app/services/services-service/services.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss'],
  animations: Animations,
})
export class ServiceAddComponent extends FormHelper implements OnInit {
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

  constructor(private servicesService: ServicesService) {
    super();
  }

  ngOnInit(): void {}

  addPhoto(data: File) {
    this.form.image = data;
  }

  async submit() {
    this.isSubmitting = true;

    const { title, description, duration } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }

    let formData = this.getFormData(this.form);

    this.servicesService.addService(formData).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.onSuccess();
      },
      (err) => this.onError(err)
    );
  }

  handleDelete() {
    if (this.form.testimonies.length) {
      this.form.testimonies.splice(this.form.testimonies.length - 1, 1);
    }
  }

  handleAdd() {
    this.form.testimonies = [
      ...this.form.testimonies,
      {
        id: new Date().getTime(),
        text: '',
      },
    ];
  }

  track(item: any, index: number) {
    return index;
  }
}
