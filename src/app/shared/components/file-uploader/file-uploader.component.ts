import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() name: string;

  @Input() label: string = 'Ajouter une photo';

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addFile(event: any) {
    this.onClick.emit(event);
  }
}
