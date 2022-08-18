import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit {
  @Input() plan: Plan;


  @Output()  onClick: EventEmitter<Plan> = new EventEmitter<Plan>();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
      this.onClick.emit(this.plan)
  }

  
}
