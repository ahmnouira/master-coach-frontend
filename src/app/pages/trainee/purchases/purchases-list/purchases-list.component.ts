import { Component, OnInit } from '@angular/core';
import {
  CLIENT_PURCHASES_ACTION_COLUMNS,
  CLIENT_PURCHASES_DISPLAYED_COLUMNS,
} from 'src/app/constants/client/purchases';
import {
  COACH_DOCS_FILTERS_TYPES,
  COACH_DOCS_FILTERS_WITH,
} from 'src/app/constants/documents';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { OrderService } from 'src/app/services/order-service/order.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { DatableTableAction } from 'src/app/shared/datatable/action.model';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss'],
})
export class PurchasesListComponent extends PageHelper implements OnInit {
  search = '';

  filters = {
    type: '',
    with: '',
  };

  selectedProfiles: any = [];

  selectedTypes: any[] = [];
  selectedWith: any[] = [];

  ACTION_COLUMNS: DatableTableAction[] = CLIENT_PURCHASES_ACTION_COLUMNS;
  DISPLAYED_COLUMNS: any[] = CLIENT_PURCHASES_DISPLAYED_COLUMNS;

  FILTER_TYPES = COACH_DOCS_FILTERS_TYPES;
  FILTER_WITH = COACH_DOCS_FILTERS_WITH;

  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';

  constructor(
    private orderService: OrderService,
    private routerService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.getData(this.orderService.getOrders(), {
      debug: true,
    });
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  onActionClicked(element: any) {
    const { action, item } = element;
    switch (action) {
      case 'view':
        break;

      case 'download':
        this.loadingAnimation = true;
        this.generatePDF(item._id);
        break;
    }
  }

  generatePDF(id: string) {
    this.orderService.generatePDF(id).subscribe(
      (res) => {
        console.log(typeof res);
        FileHelper.createFile(res as Blob, `order-${id}`);
        this.loadingAnimation = false;
      },
      (error) => {
        console.error(error);
        this.loadingAnimation = false;
      }
    );
  }

  handleSearch(event) {}

  public onOptionsSelected(event: any, selectname: string) {
    const value = event.target.value;
    console.log(value);
    if (this.data.length == 0) this.data = this.data;
    if (selectname == 'type') {
      this.data = this.data.filter((elem) =>
        elem?.type.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
