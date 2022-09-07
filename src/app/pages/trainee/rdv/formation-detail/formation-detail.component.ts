import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Service } from 'src/app/models/service/service.model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.scss'],
})
export class FormationDetailComponent
  extends PageHelper<Service>
  implements OnInit
{
  id: string = '';

  isSubmitting: boolean;

  orderExist: boolean;
  freeOrder: boolean;

  isIndiv: boolean;

  isVid: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getId();
    this.getService();
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getService() {
    this.getData(this.servicesService.getService(this.id), {
      debug: true,
    });
  }

  reserver() {
    this.routeService.navigateByUrl('/pages/client/rdv/reserver', {
      state: { id: this.data },
    });
  }
}
