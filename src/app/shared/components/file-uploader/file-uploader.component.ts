import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() model: any;

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() name: string;

  @Input() accept: string;
  @Input() title: string;

  @Input() showLabel: boolean = false;

  @Input() type: string; //  'pdf' | 'photo' | 'video' | 'audio' | undefined;
  @Input() label?: string = '';
  @Input() prefix?: string = '';

  @Input() style?: 'primary' | 'secondary' = 'primary';

  @Input() multiple?: boolean = false;

  @Output() onClick = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  @Input() form?: any = undefined;

  isEmpty: boolean;

  filename: string = '';

  constructor() {}

  ngOnInit(): void {
    this.prefix = this.prefix ? this.prefix : this.label;
    this.checkEmpty();
    this.setProperties();
  }

  setProperties() {
    if (!this.multiple && this.type) {
      switch (this.type) {
        case 'pdf':
          // application/vnd.ms-excel
          this.accept = 'application/pdf';
          this.title = this.title ?? 'Choisir un ficher';
          break;
        case 'photo':
          this.accept = 'image/*';
          this.title = this.title ?? 'Choisir une photo';
          break;

        case 'video':
          this.accept = 'video/*';
          this.title = this.title ?? 'Choisir une vidéo';
          break;
        case 'audio':
          this.accept = 'audio/*';
          this.title = this.title ?? 'Choisir un podcast';
          break;
      }
    }
  }

  checkEmpty() {
    if (this.model && typeof this.model === 'string') {
      this.isEmpty = false;
      // set the filename
      this.filename = FileHelper.getFileName(this.prefix, this.model);
    } else if (Array.isArray(this.model) && this.model.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  handleChange(event: any) {
    const reader: FileReader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files as File[];
      this.onClick.emit(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.isEmpty = false;
        this.filename = this.prefix
          ? FileHelper.formatName(this.prefix) +
            '-' +
            FileHelper.formatName(file.name)
          : FileHelper.formatName(file.name);
        // this.onClick.emit(reader.result as string);
      };
      reader.onerror = () => {
        this.isEmpty = true;
      };
    }
  }

  handleDelete() {
    this.isEmpty = true;
    this.onDelete.emit();
  }
}
