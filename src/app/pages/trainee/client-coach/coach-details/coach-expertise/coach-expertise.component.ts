import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-expertise',
  templateUrl: './coach-expertise.component.html',
  styleUrls: ['./coach-expertise.component.scss']
})
export class CoachExpertiseComponent implements OnInit {

  @Input() title: string 

  @Input() expertise: string[]

  constructor() { }

  ngOnInit(): void {
  }

}
