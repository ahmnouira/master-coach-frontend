import { Component, Input, OnInit } from '@angular/core';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IService } from 'src/app/interfaces/service.interface';
import { RouteService } from 'src/app/services/route-service/route.service';
import { ServicesService } from 'src/app/services/services-service/services.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  animations: Animations,
})
export class ServiceFormComponent extends FormHelper implements OnInit {
  @Input() id: string = '';

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
    price: '',
    image: undefined,
  };

  constructor(
    private servicesService: ServicesService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.id) {
      this.isLoading = true;
      // means edit
      this.servicesService.getService(this.id).subscribe((res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        const service = res.data as IService;
        this.form = {
          description: service.description,
          title: service.title,
          duration: service.duration,
          image: this.getFileUrl(service.image),
          price: service.price,
          isFree: service.isFree,
          isPriceHidden: service.isPriceHidden,
          isFixedPrice: service.isFixedPrice,
          testimonies: this.getArray(service.testimonies),
          category: service.category,
          isAutoConfirmed: service.isAutoConfirmed,
        };
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  addPhoto(data: File) {
    this.form.image = data;
  }

  async submit() {
    this.isSubmitting = true;

    const { title, description, duration, price } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }

    let formData = this.getFormData(this.form);

    formData.set('price', parseInt(price).toString());

    console.log(this.form);

    /*
    this.servicesService.addService(formData).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.onSuccess(() => {
          this.routeService.navigate(['/pages/coach/services']);
        });
      },
      (err) => this.onError(err)
    );
    */
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
