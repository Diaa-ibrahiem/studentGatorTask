import { FilterService } from './../../filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  form: FormGroup;
  cities: string[]=[] ;
  filteredOptions: Observable<string[]>;

  constructor(private fb: FormBuilder,public http: HttpClient,private _filterService:FilterService) {
    this.getdata()
  }

/**ngOnit */
  ngOnInit() {
    this.creatForm()
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  creatForm() {
    this.form = this.fb.group({
      city: this.fb.control(null, Validators.required),
      Name: this.fb.control(null, Validators.required),
    });
  }

  public get city ():FormControl{
    return this.form.get('city') as FormControl;
  }
  onsubmit() {
    console.log(this.form.value);
    this._filterService.filterO$.next(this.form.value) ;
  }

  getdata() {
    this.http.get('assets/progs.json').subscribe((res: any) => {
      console.log(res);
      
      let s =[]
      res[2].data.forEach(element => {
        s.push(element?.city)
      });
      let unique = new Set(s);
      let array =[]
      unique.forEach(d=>{
       array.push(d)
      })
      this.cities =array;
      console.log(this.cities)
    });
  }

}
