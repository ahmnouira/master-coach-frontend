import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service'

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getAllUser() {
    return this.get('/all_users')
  }

  getSingleUser(id :any): Observable<any> {
    return this.get('/get_user/' + id)
  }

  getSingleUserByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.get('/getUserByEmail', {params})
  }

  saveUser(user: any): Observable<any> {
    return this.post('/create_user', user)
  }

  updateUser(user: any, id: any): Observable<any> {
    return this.put('/update_user/' + id, user)
  }

  deleteUser(id) {
    return this.delete('/delete_user/' + id)
  }
}
