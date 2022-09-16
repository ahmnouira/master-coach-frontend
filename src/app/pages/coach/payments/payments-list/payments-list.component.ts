import { Component, OnInit } from '@angular/core';
import {
  COACH_DOCS_FILTERS_TYPES,
  COACH_DOCS_FILTERS_WITH,
} from 'src/app/constants/documents';
import {
  COACH_PAYMENTS_ACTION_COLUMNS,
  COACH_PAYMENTS_DISPLAYED_COLUMNS,
} from 'src/app/constants/coach/payments';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { DatableTableAction } from 'src/app/shared/datatable/action.model';
import { FileHelper } from 'src/app/helpers/FileHelper';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent extends PageHelper implements OnInit {
  search = '';

  filters = {
    type: '',
    with: '',
  };

  selectedProfiles: any = [];

  selectedTypes: any[] = [];
  selectedWith: any[] = [];

  ACTION_COLUMNS: DatableTableAction[] = COACH_PAYMENTS_ACTION_COLUMNS;
  DISPLAYED_COLUMNS: any[] = COACH_PAYMENTS_DISPLAYED_COLUMNS;

  FILTER_TYPES = COACH_DOCS_FILTERS_TYPES;
  FILTER_WITH = COACH_DOCS_FILTERS_WITH;

  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';

  constructor(private paymentService: PaymentService) {
    super();
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.getData(this.paymentService.getPayments(), {
      debug: true,
    });
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  handleSearch(event) {}

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
    this.paymentService.generatePDF(id).subscribe(
      (res) => {
        FileHelper.createFile(res as Blob, `payment-${id}`);
        this.loadingAnimation = false;
      },
      (error) => {
        console.error(error);
        this.loadingAnimation = false;
      }
    );
  }

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
