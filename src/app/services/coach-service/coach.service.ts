import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class CoachService extends BaseService {
  CreateTeam(team: any) {
    return this.post('/create_team', team);
  }

  GetTeams(coachId: any) {
    const params = new HttpParams().set('coach_id', coachId);
    return this.get('/get_teams', params);
  }

  GetTeam(coachId: any, teamId: any) {
    const params = new HttpParams()
      .set('coach_id', coachId)
      .set('team_id', teamId);
    return this.get('/get_team', params);
  }

  UpdateTeam(team: any) {
    return this.put('/update_team', team);
  }

  DeleteTeamMember(team: any) {
    return this.post('/delete_team_member', team);
  }

  CreateQuiz(quiz: any) {
    return this.post('/create_quiz', quiz);
  }

  UpdateQuiz(quiz: any) {
    return this.post('/update_quiz', quiz);
  }

  answerQuiz(quiz: any) {
    return this.post('/answer_quiz', quiz);
  }
  DeleteQuiz(quiz_id: any) {
    return this.post('/delete_quiz', { quiz_id });
  }

  GetQuiz() {}
  GetAllQuizList() {
    return this.get('/get_all_quiz');
  }

  addWorkingHours(coachId: any, workingHours) {
    return this.put('/add_working_hours/' + coachId, workingHours);
  }

  DeleteTeam(team: any) {
    return this.delete('/delete_team/' + team._id);
  }
}
