import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [
    {
      title: '',
      price: '',
      features: [],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
