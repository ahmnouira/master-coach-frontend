import { Component, Input, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document/document.model';

@Component({
  selector: 'app-documents-info',
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.scss'],
})
export class DocumentsInfoComponent implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit(): void {}
}
