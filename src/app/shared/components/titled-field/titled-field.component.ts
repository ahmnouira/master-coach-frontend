import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titled-field',
  templateUrl: './titled-field.component.html',
  styleUrls: ['./titled-field.component.scss']
})
export class TitledFieldComponent implements OnInit {


  @Input() title: string = ''

  @Input() titleHidden :boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
