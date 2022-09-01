import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() placeholder = 'Recherche'

  
  constructor() { }

  ngOnInit(): void {
  }

  handleChange(event: any) {
    this.modelChange.emit(event.target.value)
  }

}
