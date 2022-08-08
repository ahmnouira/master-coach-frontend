import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CoachService} from "../../../services/coach.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-add-form-quiz',
  templateUrl: './add-form-quiz.component.html',
  styleUrls: ['./add-form-quiz.component.scss']
})
export class AddFormQuizComponent implements OnInit {

  listQuestions: any = [];
  formName = '';
  formDescription = '';

  constructor(private router :Router, private coachService : CoachService, private tokenStoregeService : TokenStorageService) { }

  ngOnInit(): void {
  }

  addQuestion(){
    this.listQuestions.push({
      questionText : '',
      questionType: 'multiple',
      questionChoixMultiple: true,
      questionChoixUnique: false,
      questionResponses: []
    })
  }
  removeQuestion(index) {
    this.listQuestions.splice(index,1);
  }

  addResponse(indexQuestion){
    this.listQuestions[indexQuestion].questionResponses.push({
      responsePosition : this.listQuestions[indexQuestion].questionResponses.length,
      responseText: ''
    })
  }
  removeResponse(indexQuestion, indexREsp) {
    this.listQuestions[indexQuestion].questionResponses.splice(indexREsp,1);
  }

  questionChoixUniqueChanged(indexQuestion){
    this.listQuestions[indexQuestion].questionChoixMultiple = !this.listQuestions[indexQuestion].questionChoixUnique;
    this.listQuestions[indexQuestion].questionType = this.listQuestions[indexQuestion].questionChoixUnique? 'unique':'multiple';
  }

  questionChoixMultipleChanged(indexQuestion){
    this.listQuestions[indexQuestion].questionChoixUnique = !this.listQuestions[indexQuestion].questionChoixMultiple;
    this.listQuestions[indexQuestion].questionType = this.listQuestions[indexQuestion].questionChoixUnique? 'unique':'multiple';
  }

  saveForm(){
    let quizData = {
      coach_id: this.tokenStoregeService.getUser()._id,
      quizName: this.formName,
      quizDesc: this.formDescription,
      questions: [...this.listQuestions]
    }
    this.coachService.CreateQuiz(quizData).subscribe(
      data => {
        this.router.navigateByUrl('/pages/coach/quiz/list')
      },
      error => {
        console.log(error)
      }
    )

  }

}
