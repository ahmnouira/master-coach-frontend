import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  getItem<T = string>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key)) as T;
  }

  setItem<T>(key: string, value: string | T) {
    if (typeof value === 'string') return sessionStorage.setItem(key, value);
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  clearAll() {
    return sessionStorage.clear();
  }

  clearItem(key: string) {
    return sessionStorage.removeItem(key);
  }
}
