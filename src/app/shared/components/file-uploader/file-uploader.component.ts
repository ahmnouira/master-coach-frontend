import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() name: string;

  @Input() label: string = 'Ajouter une photo';
  @Input() accept: string;

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addFile(event: any) {
    console.log(event);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.onClick.emit(reader.result as string);
      };
    }
  }
}
