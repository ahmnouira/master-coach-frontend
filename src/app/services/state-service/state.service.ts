import { Injectable } from '@angular/core';
import { StateModel } from './StateModel';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state: StateModel = new StateModel();
  constructor() {}

  public set(key: string, value: string) {
    this.state[key] = value;
  }
  get(key: string): string {
    return this.state[key];
  }
  remove(key: string) {
    this.state[key] = null;
  }
  clear() {
    this.state = new StateModel();
  }
}
