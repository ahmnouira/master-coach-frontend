import { Component, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Document } from 'src/app/models/document/document.model';
import { DocumentsService } from 'src/app/services/document-service/documents.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { datatable_action } from 'src/app/shared/datatable/datatable.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
})
export class DocumentsListComponent extends PageHelper implements OnInit {
  filterString = '';

  documents: Document[] = [
    {
      _id: '1',
      ref: '001',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'Quizz',
    },
    {
      _id: '2',
      ref: '002',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'Rapport',
    },
  ];

  selectedProfiles: any = [];

  ACTION_COLUMNS: datatable_action[] = [];
  DISPLAYED_COLUMNS: any[] = [];

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
    this.ACTION_COLUMNS.push(
      {
        value: '',
        childrens: [
          {
            type: 'view',
            iconClass: 'view',
          },
        ],
      },
      {
        value: '',
        childrens: [
          {
            type: 'trash',
            iconClass: 'trash',
          },
        ],
      }
    );

    this.DISPLAYED_COLUMNS = [
      {
        data: 'ref',
        value: 'ref',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'title',
        value: 'title',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'type',
        value: 'type',
        type: 'text',
        search: true,
        sort: true,
      },
    ];
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

  onActionClicked(element: any) {
    console.log('Element', element);

    let coachObject = this.documents.filter(
      (obj) => obj._id == element.item.coach_id
    );
    let quizObject = {
      coachData: coachObject,
      quizData: element.item,
    };
    if (element.action == 'view') {
      this.routerService.navigateByUrl('/pages/coach/documents/edit', {
        state: { id: quizObject },
      });
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
    if (this.documents.length == 0) this.documents = this.data;
    if (selectname == 'type') {
      this.documents = this.data.filter((elem) =>
        elem?.type.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectname == 'status') {
      this.documents = this.data.filter((elem) =>
        elem?.status.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
