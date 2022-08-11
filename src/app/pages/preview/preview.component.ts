import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  constructor(public modal: NgxSmartModalService) {}

  ngOnInit(): void {}

  openModal(modal) {
    this.modal.getModal(modal).open();
  }
}
