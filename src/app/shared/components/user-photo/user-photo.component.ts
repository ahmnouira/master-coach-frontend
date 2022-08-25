import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
})
export class UserPhotoComponent implements OnInit {
  @Input() src: string | File;

  @Output() onChange = new EventEmitter();

  photo: string;

  error: string;
  constructor() {}
  ngOnInit(): void {
    this.getPicture();

    console.log('userPhoto', this.photo, this.src)
  }
  getPicture() {
    if (this.src && typeof this.src === 'string') {
      this.photo = this.src;
    } else {
      this.photo = '/assets/img/common/utilisateur.png';
    }
  }

  handleChange(event: any) {
    const reader: FileReader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files as File[];
      this.onChange.emit(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log('reader', reader.result);
        this.photo = reader.result as string;
      };
      reader.onerror = (err) => {
        console.log('onrerror', reader.error);
        this.error = 'Error';
      };
    }
  }
}
