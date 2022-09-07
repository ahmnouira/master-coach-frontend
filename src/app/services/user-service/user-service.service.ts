import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

type GetUsersOptions = {
  q: string;
  category: string;
  competance: string;
  accreditation: string;
  who: 'coaches' | 'all';
};

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getUsers(options?: Partial<GetUsersOptions>) {
    const params = new HttpParams();
    let path = '/users';
    if (options) {
      if (options.who === 'coaches') {
        path += '/coaches';
      }
      for (const key in options) {
        if (options[key]) {
          params.set(key, options[key]);
        }
      }
    }
    return this.get(path, params);
  }

  getUser(id: string) {
    return this.get(`/users/${id}`);
  }

  changeUserState(id: any) {
    return this.put('/users/change_status/' + id);
  }

  getAllUser() {
    return this.get('/all_users');
  }

  getSingleUser(id: any): Observable<any> {
    return this.get('/get_user/' + id);
  }

  getSingleUserByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.get('/getUserByEmail', params);
  }

  saveUser(user: any): Observable<any> {
    return this.post('/create_user', user);
  }

  updateUser(user: any, id: any): Observable<any> {
    return this.put('/update_user/' + id, user);
  }

  deleteUser(id: any) {
    return this.delete('/delete_user/' + id);
  }

  /**
   * @description get coach services 
   * @param id user id: coach id
   * @returns Observable<any>
   */
  getUserServices(id: string): Observable<any> {
    return this.get(`/users/${id}/services`);
  }

  getUserProducts(id: string): Observable<any> {
    return this.get(`/users/${id}/products`);
  }
}
