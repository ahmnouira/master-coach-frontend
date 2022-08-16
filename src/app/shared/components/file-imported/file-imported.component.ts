import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-imported',
  templateUrl: './file-imported.component.html',
  styleUrls: ['./file-imported.component.scss'],
})
export class FileImportedComponent implements OnInit {
  @Input() label: string;
  @Input() name: string;
  @Input() title: string;
  @Input() sanitizer: any;
  @Input() onDelete: any;

  constructor() {}

  ngOnInit(): void {}
}
