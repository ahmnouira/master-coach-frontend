import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: '[datatable-footer]',
  template: `
    <div class="flex-row mr-3" hidden>
      <span class="mr-1">Nb de résultats par tableau</span>
      <select
        class="pl-form-control"
        style="padding : 4.44px"
        [(ngModel)]="itemsPerPage"
        (change)="onChangeItemsPerPage()"
      >
        <option [value]="10">10</option>
        <option [value]="25">25</option>
        <option [value]="50">50</option>
        <option [value]="100">100</option>
      </select>
    </div>
    <div class="flex-row">
      <span class="mr-1">
        {{
          totalItems > endItem
            ? startItem + ' - ' + endItem + ' sur ' + totalItems
            : startItem + ' - ' + totalItems + ' sur ' + endItem
        }}
      </span>
      <pagination
        [boundaryLinks]="false"
        [totalItems]="totalItems"
        [itemsPerPage]="itemsPerPage"
        [maxSize]="0"
        [customPreviousTemplate]="prevTemplate"
        [customNextTemplate]="nextTemplate"
        (pageChanged)="pageChanged($event)"
      ></pagination>
    </div>
    <ng-template
      #prevTemplate
      let-disabled="disabled"
      let-currentPage="currentPage"
    >
      <span class="material-icons">chevron_left</span>
    </ng-template>
    <ng-template
      #nextTemplate
      let-disabled="disabled"
      let-currentPage="currentPage"
    >
      <span class="material-icons">chevron_right</span>
    </ng-template>
  `,
  styles: [
    `
      .page-item {
        /*border: 1.5px solid #000;*/
        font: normal normal normal 13px/17px Fredoka;
      }

      .page-item:not(:last-child) {
        margin-right: 4px;
      }

      .page-item:not(:first-child):not(:last-child) {
        padding-top: 3px;
      }

      .page-link {
        color: #3c4d5d !important;
        margin-top: 0.25rem;
        border: none !important;
        font-weight: 700 !important;
        align-items: center !important;
        margin: 0 !important;
        padding: 0px !important;
        height: auto !important;
        min-width: auto !important;
        border-radius: 0 !important;
      }

      .page-item.active .page-link {
        background-color: #fafafa !important;
      }

      .page-item:first-child .page-link::before,
      .page-item:last-child .page-link::after {
        content: none !important;
      }

      .pagination {
        margin: 0;
      }

      .page-item:not(.disabled) .page-link:not(:active):focus {
        outline: 2px solid #366a95 !important;
        outline-offset: 2px !important;
        background-color: #fafafa !important;
      }

      .page-item.disabled {
        /*border: 1px solid #5C5C5C !important;*/
        background: #5c5c5c !important;
        cursor: not-allowed !important;
      }

      .page-item.disabled .page-link {
        /*background: #5C5C5C !important;*/
        color: #3c4d5d !important;
      }

      .page-link:hover {
        background-color: #73b5e3 !important;
        color: #000000 !important;
      }

      .page-item:not(.disabled):not(:focus):hover {
        background-color: #73b5e3 !important;
        border: 1.5px solid #73b5e3 !important;
      }

      .flex-row {
        display: flex;
        align-items: center;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableFooterComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() startItem: number = 0;
  @Input() endItem: number = 10;
  @Input() paginationmessag: string = '';
  //limit number for page links in pager
  @Input() maxSize: number = 0;
  //if false first and last buttons will be hidden
  @Input() showBoundaryLinks: boolean = false;
  @Output() onpageChanged = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  pageChanged(event) {
    this.onpageChanged.emit(event);
  }

  onChangeItemsPerPage() {
    this.onpageChanged.emit({
      itemsPerPage: this.itemsPerPage,
      page: 1,
    });
  }
}
