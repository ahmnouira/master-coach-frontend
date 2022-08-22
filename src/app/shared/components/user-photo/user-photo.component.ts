import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
})
export class UserPhotoComponent implements OnInit {
  @Input() src: string;

  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.src = this.src ?? '/assets/img/common/utilisateur.png';
  }

  handleChange(event: any) {
    this.onChange.emit(event);
  }
}
