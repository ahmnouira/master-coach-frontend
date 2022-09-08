import { Component, Input, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss'],
})
export class CoachCardComponent extends UserHelper implements OnInit {
  @Input() coach: User;

  constructor() {
    super()
  }

  ngOnInit(): void {
    const path = '/pages/client/coaches/details/' + this.coach._id
    this.init(this.coach, path)
  }

  renderSkills() {
    if (this.coach.category) {
      console.log('category', this.coach.category);
      // return this.coach.category.join('-')
    }
    return '';
  }
}
