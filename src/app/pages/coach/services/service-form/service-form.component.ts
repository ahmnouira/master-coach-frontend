import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IService } from 'src/app/interfaces/service.interface';
import { ServiceChez } from 'src/app/models/service/service-chez.enum';
import { ServiceFormat } from 'src/app/models/service/service-format.enum';
import { SessionType } from 'src/app/models/service/service-type.enum';
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
    format: ServiceFormat.CONFERENCE,
    chez: ServiceChez.CLIENT,
    sessionType: SessionType.COLLECTIVE,
  };

  found: boolean;

  constructor(
    private servicesService: ServicesService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.id) {
      // means edit
      this.isLoading = true;

      this.servicesService.getService(this.id).subscribe(
        (res) => {
          if (!res.success) {
            this.found = false;
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
            // these  '||' for old created services
            format: service.format || ServiceFormat.CONFERENCE,
            chez: service.chez || ServiceChez.CLIENT,
            sessionType: service.sessionType || SessionType.COLLECTIVE,
          };
          this.found = true;
          this.isLoading = false;
        },
        (err) => {
          this.found = false;
          this.onError(err);
        }
      );
    } else {
      this.found = true;
      this.isLoading = false;
    }
  }

  addPhoto(data: File) {
    this.form.image = data;
  }

  async submit() {
    this.isSubmitting = true;
    this.error = ''; // remove the error when re-submitting

    const { title, description, duration, price, isFree } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }

    // check if not a free
    if (!isFree && !parseInt(price)) {
      // this.onError('Please check price');
      this.onError('')
      return;
    }
    let formData = this.getFormData(this.form);
    formData.set('price', parseInt(price).toString());
    let method: Observable<any>;

    if (this.id) {
      method = this.servicesService.editService(this.id, formData);
    } else {
      method = this.servicesService.addService(formData);
    }

    method.subscribe(
      (res) => {
        if (!res.success && res.error) {
          this.onError(res.error);
          return;
        }
        this.onSuccess(() => {
          this.routeService.navigate(['/pages/coach/services']);
        });
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

  track(_item: any, index: number) {
    return index;
  }
}
