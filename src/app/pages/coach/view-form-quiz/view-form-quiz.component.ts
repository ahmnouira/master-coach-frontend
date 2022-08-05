import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-form-quiz',
  templateUrl: './view-form-quiz.component.html',
  styleUrls: ['./view-form-quiz.component.scss']
})
export class ViewFormQuizComponent implements OnInit {

  quizData : any = {};
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.quizData = history.state?.id ? history.state?.id: {};
  }

  sendQuizData(){

  }

  editForm() {
    this.router.navigateByUrl('/pages/coach/quiz/edit', { state: { id: this.quizData } });
  }
}
