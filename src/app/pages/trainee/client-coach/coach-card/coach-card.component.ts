import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss'],
})
export class CoachCardComponent implements OnInit {
  @Input() coach: User;

  path: string;

  constructor() {}

  ngOnInit(): void {
    this.path = '/pages/client/coaches/details/' + this.coach._id;
  }

  renderSkills() {
    if (this.coach.category) {
      console.log('category', this.coach.category);
      // return this.coach.category.join('-')
    }
    return '';
  }
}
