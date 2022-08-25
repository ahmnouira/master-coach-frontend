import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Animations } from '../../animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: Animations,
})
export class FormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<NgForm>();
  @Input() name: any;
  @Input() animated: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  handleSubmit(event: NgForm) {
    this.onSubmit.emit(event);
  }
}
