import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-succes',
  templateUrl: './modal-succes.component.html',
  styleUrls: ['./modal-succes.component.scss']
})
export class ModalSuccesComponent implements OnInit {

  @Input() description : string;

  constructor() { }

  ngOnInit(): void {
  }

}
