import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private token = '';

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private titleService: Title
  ) {
    this.getTokenFormRoute();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public get getToken() {
    return this.token;
  }

  private getTokenFormRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log('params', params.get('token'));
      //this.paramsObject = { ...params.keys, ...params };
      this.token = params.get('token');
    });
  }
}
