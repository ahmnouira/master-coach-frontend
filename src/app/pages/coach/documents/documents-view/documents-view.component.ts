import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Document } from 'src/app/models/document/document.model';
import { DocumentsService } from 'src/app/services/document-service/documents.service';

@Component({
  selector: 'app-documents-view',
  templateUrl: './documents-view.component.html',
  styleUrls: ['./documents-view.component.scss'],
})
export class DocumentsViewComponent
  extends PageHelper<Document>
  implements OnInit
{
  id: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getId();
    this.getDocument();
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getDocument() {
    this.getData(this.documentService.getDocument(this.id));
  }
}
