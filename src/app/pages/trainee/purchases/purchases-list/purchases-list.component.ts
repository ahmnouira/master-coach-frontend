import { Component, OnInit } from '@angular/core';
import { COACH_DOCS_ACTION_COLUMNS, COACH_DOCS_DISPLAYED_COLUMNS, COACH_DOCS_FILTERS_TYPES, COACH_DOCS_FILTERS_WITH } from 'src/app/constants/documents';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
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

  ACTION_COLUMNS: DatableTableAction[] = COACH_DOCS_ACTION_COLUMNS;
  DISPLAYED_COLUMNS: any[] = COACH_DOCS_DISPLAYED_COLUMNS;

  FILTER_TYPES = COACH_DOCS_FILTERS_TYPES;
  FILTER_WITH = COACH_DOCS_FILTERS_WITH;

  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';

  constructor(private paymentService: PaymentService, private routerService: RouteService) {
    super();
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    /*
    this.getData(
      this.paymentService.gte({
        all: false,
      }),
      {
        debug: true,
      }
    );
    */
    this.data = [];
    this.isLoading = false;
    this.found = false;
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }


  onActionClicked(element: any) {
    const { action, item } = element;
    switch (action) {
      case 'view':
        window.alert('NOT IMPLEMENTED!');
        break;
      case 'edit':
        window.alert('NOT IMPLEMENTED!');
        break;
      case 'delete':
        window.alert('NOT IMPLEMENTED!');
        break;
    }
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
