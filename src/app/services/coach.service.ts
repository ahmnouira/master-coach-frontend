import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUri = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    })
  };

  constructor(private httpClient: HttpClient) { }

  CreateTeam(team : any){
    return this.httpClient.post<any>(this.baseUri + '/create_team', JSON.stringify(team), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  GetTeams(coachId){
    const params = new HttpParams()
      .set('coach_id', coachId);
    return this.httpClient.get<any>(this.baseUri + '/get_teams',{params})
      .pipe(
        catchError(this.handleError)
      )
  }
  GetTeam(coachId, teamId){
    const params = new HttpParams()
      .set('coach_id', coachId)
      .set('team_id', teamId);
    return this.httpClient.get<any>(this.baseUri + '/get_team',{params})
      .pipe(
        catchError(this.handleError)
      )
  }
  UpdateTeam(team : any){
    return this.httpClient.put<any>(this.baseUri + '/update_team', JSON.stringify(team), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  DeleteTeamMember(team : any){
    return this.httpClient.post<any>(this.baseUri + '/delete_team_member', JSON.stringify(team), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  CreateQuiz(quiz : any){
    return this.httpClient.post<any>(this.baseUri + '/create_quiz', JSON.stringify(quiz), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  UpdateQuiz(quiz : any){
    return this.httpClient.post<any>(this.baseUri + '/update_quiz', JSON.stringify(quiz), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  answerQuiz(quiz : any){
    return this.httpClient.post<any>(this.baseUri + '/answer_quiz', JSON.stringify(quiz), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  DeleteQuiz(quizId: any){
    return this.httpClient.post<any>(this.baseUri + '/delete_quiz', JSON.stringify({quiz_id: quizId}), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )}
  GetQuiz(){}
  GetAllQuizList(){
    return this.httpClient.get<any>(this.baseUri + '/get_all_quiz')
      .pipe(
        catchError(this.handleError)
      )
  }

  addWorkingHours(coachId: any, workingHours){
    return this.httpClient.put<any>(this.baseUri + '/add_working_hours/'+coachId, JSON.stringify(workingHours), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  DeleteTeam(team : any){
    return this.httpClient.delete<any>(this.baseUri + '/delete_team/'+ team._id,  this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
