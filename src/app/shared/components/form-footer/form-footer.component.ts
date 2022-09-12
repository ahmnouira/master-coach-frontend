import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss'],
})
export class FormFooterComponent implements OnInit {
  @Input() error: any;

  @Input() success: boolean;

  @Input() successMessage: string;

  @Input() showDivider: boolean = true 

  constructor() {}

  ngOnInit(): void {}
}
