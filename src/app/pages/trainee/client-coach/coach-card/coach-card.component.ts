import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss']
})
export class CoachCardComponent implements OnInit {

  @Input() coach: User

  constructor() { }

  ngOnInit(): void {
  }


  renderSkills() {
    if(this.coach.category) {
      console.log('category', this.coach.category)
        // return this.coach.category.join('-')
    }
    return ''
  }

}
