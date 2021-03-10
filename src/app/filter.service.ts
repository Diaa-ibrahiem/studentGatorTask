import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filter: any;
  deploma: any = [];
  dataO$ = new BehaviorSubject([]);
  filterO$ = new BehaviorSubject({});
  constructor(public http: HttpClient) {
    console.log(this.filter);
    this.fitlers();
  }

  getdata() {
    this.http.get('assets/progs.json').subscribe((res: any) => {
      console.log(res);
      this.deploma = res[2].data;
      this.dataO$.next(this.deploma);
    });
  }

  getSubscribe() {
    return this.dataO$.asObservable();
  }

  fitlers() {
    this.filterO$.subscribe((data) => {
      console.log(data, 'daata');
      let deploma = this.deploma.filter((item) => {
        for (let key in data) {
          if (
            item[key].replace(/\s/g, '') === undefined ||
            item[key].replace(/\s/g, '') != data[key]
          ) {
            return false;
          } else {
            return true;
          }
        }
      });
      this.dataO$.next(deploma);
    });
  }
}
