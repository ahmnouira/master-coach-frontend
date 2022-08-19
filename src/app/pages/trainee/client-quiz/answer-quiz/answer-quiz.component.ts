import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss'],
})
export class AnswerQuizComponent implements OnInit {
  quizObject: any = {};
  quizData: any = {};
  coachData: any = {};
  clientAnswers: any = [];
  viewOnly = false;

  constructor(
    private router: Router,
    private coachService: CoachService,
    private location: Location,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.quizObject = history.state?.id ? history.state?.id : {};
    this.quizData = this.quizObject?.quizData;
    this.viewOnly = this.quizData?.status == 'Clos';
    this.coachData = this.quizObject?.coachData[0];
    let answers = this.quizData?.client_answers.filter(
      (elem) => elem.client_id == this.tokenStorageService.getUser()._id
    );
    if (answers == 0) {
      this.quizData.questions.forEach((question) => {
        let answerObject = {
          question: question.questionText,
          questionType: question.questionType,
          selectedAnswers: [],
          selectedAnswer: {},
        };
        question.questionResponses.forEach((resp) => {
          let response = { ...resp };
          response.selected = false;
          answerObject.selectedAnswers.push(response);
        });
        this.clientAnswers.push(answerObject);
      });
    } else this.clientAnswers = answers[0].answers;
  }
  back() {
    this.location.back();
  }

  saveQuizAnswers() {
    const client_answers = {
      quiz_id: this.quizData._id,
      client_id: this.tokenStorageService.getUser()._id,
      answers: this.clientAnswers,
    };
    this.coachService.answerQuiz(client_answers).subscribe(
      (data) => {
        this.router.navigateByUrl('/pages/client/docs');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
