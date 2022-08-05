import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import {
  Component,
  OnInit,
  PipeTransform,
  Pipe,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
} from "@angular/core";
import {
  datatable_action,
  datatable_displayedColomn,
  tag,
} from "./datatable.model";

import * as cloneDeep from "lodash/cloneDeep";
import { Animations } from "../animations";
import { DatePipe } from "@angular/common";

@Component({
  selector: "datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host > .tooltip-inner {
        max-width: 90px;
      }
    `,
  ],
  animations: Animations,
})
export class DatatableComponent implements OnInit {
  // when row clicked
  @Output() onRowClicked = new EventEmitter();
  //when action clicked
  @Output() onActionClicked = new EventEmitter();
  //when link clicked
  @Output() onlinkClicked = new EventEmitter();

  //when Toggle All clicked
  @Output() onToggleAllClicked = new EventEmitter();

  //when Toggle  clicked
  @Output() onToggleClicked = new EventEmitter();

  //toDisplay Small Cells
  @Input() smallCells: boolean = false;

  //to Hide actions in parent child row
  @Input() hideParentAction: boolean = false;
  //loading List
  @Input() loadingList: boolean = false;
  @Input() nbRows: number = 4;

  // text align in table  // left right or center
  @Input() childListLabel: string;
  @Input() hideTheader: boolean = false;
  @Input() textalign: "left" | "right" | "center" = "left";

  display: any = [true];
  //data
  @Input() set datatable(value) {
    if (value) {
      this._datatable = cloneDeep(value);
      this.checkAll = false;
    }
  }
  _datatable: any[] = [];
  @Output() datatableChange = new EventEmitter();
  //************server Side pagination///////////////////
  @Input() numberOfRecords: any = 0; //required when serverSidePagination true
  @Input() serverSidePagination: any = false;
  @Output() startDisplay = new EventEmitter();
  //************server Side pagination///////////////////////
  //************server Side search///////////////////
  @Input() serverSidesearch: any = false;
  @Output() search = new EventEmitter();
  //************server Side search///////////////////////

  //columns to display from datatable
  @Input() set displayedColomn(value: datatable_displayedColomn[]) {
    let searchexist = value.find((el) => {
      return el.search == true;
    });
    this.searchexist = searchexist ? true : false;
    this.displayedColomnList = value.map((el) => {
      return el;
    });
  }
  displayedColomnList: datatable_displayedColomn[] = [];
  //list of actions
  @Input() set Actions(value: datatable_action[]) {
    this._Actions = value;
    this._Actions = value.map((el) => {
      return el;
    });
  }
  _Actions: datatable_action[] = [];
  get Actions() {
    return this._Actions;
  }
  //Empty list message
  @Input() nothingToShowMessage: string = "Pas de résultats";

  //pagination message
  @Input() paginationmessag: string = "";

  //if false first and last buttons will be hidden
  @Input() showBoundaryLinks: boolean = false;
  //maximum number of items per page. If value less than 1 will display all items on one page
  @Input() set itemsPerPage(value) {
    this._itemsPerPage = value;
    this.endItem = cloneDeep(value);
    this.startItem = 0;
  }
  _itemsPerPage: number = 10;
  //limit number for page links in pager
  @Input() maxSize: number = 0;

  //if true datatable items should contain id & selected columns
  @Input() checkboxes: boolean = false;
  @Input() checkboxesMultiselect: boolean = true;

  //set if show pagination or not
  @Input() pagination: boolean = true;
  // @Input() filterInside: boolean = false;
  //******For PDF/Exel && CSV files ///
  nameOnExtract: any = "Liste";
  // @Input() showExtracttns: boolean = true;
  //******For PDF/Exel && CSV files ///
  @Input() Advancedfilter: boolean = true;
  @Input() visibility: any = true;
  bsConfigRange: Partial<BsDatepickerConfig>;
  colorTheme = "theme-bycolor-function";
  datatableexist: boolean = false;
  searchexist: boolean = false;
  @Input() set searchvalue(value: string) {
    this._searchvalue = cloneDeep(value);
    this.refreshPagination();
  }
  _searchvalue: any = "";
  sortByItem: datatable_displayedColomn;
  startItem: number = 0;
  endItem: number = 10;
  dataChild: any = [];
  dataChildRow: any = [];
  filtreopen: boolean = true;
  filters: any = [];
  associations: any = [];
  checkAll: boolean = false;

  constructor() {}
  ngOnInit() {}

  checkAllClicked() {
    this._datatable = cloneDeep(
      this._datatable.map((el) => {
        if(el.checkboxDisabled != true) {
          el.selected = this.checkAll;
        }
        return el;
      })
    );
    this.datatableChanged();
  }
  ckeckBoxClicked(row) {
    if (!this.checkboxesMultiselect) {
      this._datatable = this._datatable.map((el) => {
        if (el.selected && el.id != row.id) {
          el.selected = false;
        }
        return el;
      });
    }
    let allschecked = this._datatable.find((el) => !el.selected);
    this.checkAll = allschecked ? false : true;
    this.datatableChanged();
  }
  datatableChanged() {
    this.datatableChange.emit(this._datatable);
  }
  rowClicked(item) {
    this.onRowClicked.emit(item);
  }
  actionClicked(event) {
    this.onActionClicked.emit(event);
  }

  sortAsc(data) {
    this._datatable.sort((a, b) => {
      if (typeof a[data] == "number") return a[data] - b[data];

      let item1 = a[data] ? a[data].toUpperCase() : "";
      let item2 = b[data] ? b[data].toUpperCase() : "";
      if (item1 < item2) {
        return -1;
      }
      if (item1 > item2) {
        return 1;
      }
      return 0;
    });
  }
  sortDesc(data) {
    this._datatable.sort((b, a) => {
      if (typeof a[data] == "number") return a[data] - b[data];

      let item1 = a[data] ? a[data].toUpperCase() : "";
      let item2 = b[data] ? b[data].toUpperCase() : "";
      if (item1 < item2) {
        return -1;
      }
      if (item1 > item2) {
        return 1;
      }

      return 0;
    });
  }
  sortBy(title) {
    let data = title.data;
    title.sorted = title.sorted ? !title.sorted : true;
    this.sortByItem = title;
    if (title.sorted) {
      this.sortAsc(data);
    } else {
      this.sortDesc(data);
    }
  }
  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    if (this.serverSidePagination) {
      this.startDisplay.emit({startItem: this.startItem, itemsPerPage: event.itemsPerPage});
    }
  }
  refreshPagination() {
    this.startItem = 0;
    this.endItem = this._itemsPerPage;
    if (this.serverSidePagination) {
      this.startDisplay.emit({startItem: this.startItem, itemsPerPage: this._itemsPerPage});
    }
  }
  searchServerSide(event) {
    this.searchvalue = event.target.value;
    this.startItem = 0;
    this.endItem = 10;

    this.search.emit(this.searchvalue);
  }

  filtersChange(event) {
    this.filters = cloneDeep(event.filters);
    this.associations = cloneDeep(event.associations);
    if (this.filters.length == 0) {
      this.filtreopen = !this.filtreopen;
    }
  }
  get searchvalue() {
    return this._searchvalue;
  }
}

@Pipe({ name: "filterData", pure: false })
export class filterData implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(list, searchBody): any[] {
    if (searchBody.serverSidesearch) {
      return list;
    }
    let search = searchBody.searchvalue.toLowerCase().replace(/ /g, "");
    if (search.length == 0) return list;
    return list.filter((el) => {
      let value = false;
      let colTosearch = searchBody.displayedColomnList.filter(
        (col) => col.search
      );
      for (let index = 0; index < colTosearch.length; index++) {
        const name = colTosearch[index].data;
        const type = colTosearch[index].type;

        const column = el[name]
          ? (type == "date"
              ? this.datePipe.transform(new Date(el[name]), "dd/MM/yyyy")
              : el[name]
            )
              .toString()
              .toLowerCase()
              .replace(/ /g, "")
          : "";
        value =
          (value ||
          column.includes(search.toLowerCase()) ||
          search.includes(column.toLowerCase())) && (search != '') && (column != '');
        if(value) break;
      }

      return value;
    });
  }
}

@Pipe({ name: "paginate", pure: false })
export class paginatePipe implements PipeTransform {
  transform(list, filterObj): any[] {
    if (filterObj.serverSidePagination || filterObj.endItem == "all") {
      return list;
    }
    return list.slice(filterObj.startItem, filterObj.endItem);
  }
}
