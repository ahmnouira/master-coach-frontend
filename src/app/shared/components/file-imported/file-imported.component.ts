import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-imported',
  templateUrl: './file-imported.component.html',
  styleUrls: ['./file-imported.component.scss'],
})
export class FileImportedComponent implements OnInit {
  @Input() label: string;
  @Input() name: string;
  @Input() filename: string;
  @Input() model: string | any[];

  @Input() multiple?: boolean;

  @Output() onDelete = new EventEmitter();

  sanitizerUrl: string;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.model && typeof this.model === 'string') {
      this.sanitizerUrl = this.model;
    } else {
      this.sanitizerUrl = this.label;
    }

    console.log(this.filename, this.model);
  }

  handleDelete() {
    this.onDelete.emit();
  }
}
