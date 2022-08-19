import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  protected getItem<T = string>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  protected setItem<T>(key: string, value: string | T) {
    if (typeof value === 'string') return localStorage.setItem(key, value);
    return localStorage.setItem(key, JSON.stringify(value));
  }

  protected clearAll() {
    return localStorage.clear();
  }

  protected clearItem(key: string) {
    return localStorage.removeItem(key);
  }
}
