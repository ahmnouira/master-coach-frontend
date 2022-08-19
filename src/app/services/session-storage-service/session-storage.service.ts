import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
 
 
 protected getItem<T = string>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key)) as T;
  }

  protected setItem<T>(key: string, value: string | T) {
    if (typeof value === 'string') return sessionStorage.setItem(key, value);
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  protected clearAll() {
    return sessionStorage.clear();
  }

  protected clearItem(key: string) {
    return sessionStorage.removeItem(key);
  }
}
