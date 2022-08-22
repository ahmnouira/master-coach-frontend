import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() model: any;
  @Input() label: string;
  @Input() title: string;
  @Input() id?: string;

  constructor() {}

  ngOnInit(): void {
    if (this.label && !this.id) {
      this.id = this.label.toLowerCase();
    }
  }
}
