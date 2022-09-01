import { Component, OnInit } from '@angular/core';
import {
  COACH_DOCS_ACTION_COLUMNS,
  COACH_DOCS_DISPLAYED_COLUMNS,
  COACH_DOCS_FILTERS_TYPES,
  COACH_DOCS_FILTERS_WITH,
} from 'src/app/constants/documents';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Document } from 'src/app/models/document/document.model';
import { DocumentsService } from 'src/app/services/document-service/documents.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { DatableTableAction } from 'src/app/shared/datatable/action.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
})
export class DocumentsListComponent
  extends PageHelper<Document[]>
  implements OnInit
{
  filterString = '';

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

  constructor(
    private documentService: DocumentsService,
    private routerService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.getData(
      this.documentService.getDocuments({
        all: false,
      }),
      {
        debug: true,
      }
    );
  }

  // when action is clicked
  onActionClicked(element: any) {
    const { action, item } = element;
    switch (action) {
      case 'view':
        this.routerService.navigate([
          `/pages/coach/documents/edit/${item._id}`,
        ]);
        break;
      case 'edit':
        this.routerService.navigate([
          `/pages/coach/documents/edit/${item._id}`,
        ]);
        break;
      case 'delete':
        window.alert('NOT IMPLEMENTED!');
        break;
    }
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  filterInputChanged(event) {}

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
