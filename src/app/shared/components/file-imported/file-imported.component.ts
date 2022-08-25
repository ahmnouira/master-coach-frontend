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
  @Input() model: string;

  @Output() onDelete = new EventEmitter();

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  
  }

  handleDelete() {
    this.onDelete.emit();
  }
}
