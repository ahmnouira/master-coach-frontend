import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() model: any;
  @Input() label: string = '';
  @Input() rows: string = '5'
  @Input() pattern?: string;
  @Input() name?: string;
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() patternError?: string;
  @Input() required: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.name = this.label ? this.label.toLowerCase() : '';
    this.id = this.id ?? this.name ?? '';
    this.placeholder = this.placeholder ?? this.label;
  }

}
