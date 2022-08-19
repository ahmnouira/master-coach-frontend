import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-form-quiz',
  templateUrl: './list-form-quiz.component.html',
  styleUrls: ['./list-form-quiz.component.scss'],
})
export class ListFormQuizComponent implements OnInit {
  quizList: any = [];
  constructor(
    private router: Router,
    private coachService: CoachService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getQuizList();
  }

  getQuizList() {
    let coachId = this.tokenStorageService.getUser()._id;
    this.coachService.GetAllQuizList().subscribe(
      (data) => {
        this.quizList = data.filter((elem) => elem.coach_id == coachId);
      },
      (error) => {}
    );
  }
  goToQuiz(quiz) {
    this.router.navigateByUrl('/pages/coach/quiz/view', {
      state: { id: quiz },
    });
  }

  removeQuiz(quiz) {
    this.coachService.DeleteQuiz(quiz._id).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
