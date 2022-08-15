import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private token = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private titleService: Title
  ) {
    // this.getTokenFormRoute();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public navigate(paths: string [], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(paths, extras)
  }

  public get getToken(): string {
    this.getTokenFormRoute()
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
