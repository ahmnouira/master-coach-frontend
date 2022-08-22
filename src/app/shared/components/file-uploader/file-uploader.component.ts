import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() model: string;
  @Input() name: string;
  @Input() showLabel: boolean = false;
  @Input() label: string;
  @Input() accept: string;

  @Input() type: 'pdf' | 'photo' | undefined;

  @Input() title?: string;

  @Output() onClick = new EventEmitter();

  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'pdf':
        this.accept = 'application/pdf,application/vnd.ms-excel';
        this.title = this.title ?? 'Choisir un ficher';
        break;
      case 'photo':
        this.accept = 'image/*';
        this.title = this.title ?? 'Choisir une photo';
        break;
      default:
        this.accept = '*';
        this.title = 'Import';
    }
  }

  handleChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log('file', file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('result', reader.result);
        this.onClick.emit(reader.result as string);
      };
    }
  }

  handleDelete() {
    this.onDelete.emit();
  }
}
