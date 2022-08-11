import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from '../../../services/coach.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-edit-form-quiz',
  templateUrl: './edit-form-quiz.component.html',
  styleUrls: ['./edit-form-quiz.component.scss'],
})
export class EditFormQuizComponent implements OnInit {
  listQuestions: any = [];
  formName = '';
  formDescription = '';
  quizData: any = {};

  constructor(
    private router: Router,
    private coachService: CoachService,
    private tokenStoregeService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.quizData = history.state?.id ? history.state?.id : {};
    console.log(this.quizData);
  }

  addQuestion() {
    this.quizData.questions.push({
      questionText: '',
      questionType: 'multiple',
      questionChoixMultiple: true,
      questionChoixUnique: false,
      questionResponses: [],
    });
  }
  removeQuestion(index) {
    this.quizData.questions.splice(index, 1);
  }

  addResponse(indexQuestion) {
    this.quizData.questions[indexQuestion].questionResponses.push({
      responsePosition:
        this.quizData.questions[indexQuestion].questionResponses.length,
      responseText: '',
    });
  }
  removeResponse(indexQuestion, indexREsp) {
    this.quizData.questions[indexQuestion].questionResponses.splice(
      indexREsp,
      1
    );
  }

  questionChoixUniqueChanged(indexQuestion) {
    this.quizData.questions[indexQuestion].questionChoixMultiple =
      !this.quizData.questions[indexQuestion].questionChoixUnique;
    this.quizData.questions[indexQuestion].questionType = this.quizData
      .questions[indexQuestion].questionChoixUnique
      ? 'unique'
      : 'multiple';
  }

  questionChoixMultipleChanged(indexQuestion) {
    this.quizData.questions[indexQuestion].questionChoixUnique =
      !this.quizData.questions[indexQuestion].questionChoixMultiple;
    this.quizData.questions[indexQuestion].questionType = this.quizData
      .questions[indexQuestion].questionChoixUnique
      ? 'unique'
      : 'multiple';
  }

  saveForm() {
    this.coachService.UpdateQuiz(this.quizData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/pages/coach/quiz/list');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
