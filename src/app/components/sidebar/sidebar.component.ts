import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  form:FormGroup;
  cities: string[] ;
  fileds: string[] ;
  programs: string[] ;
  schools: string[] ;
  Languages: string[] ;
  sortType: string[] ;
  constructor(private fb:FormBuilder) { 
    this.cities= ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    this.fileds= ['Winter', 'Spring', 'Summer', 'Autumn'];
    this.programs= ['Bachelor', 'Master', 'MBA', 'BHD'];
    this.schools= ['Winter', 'Spring', 'Summer', 'Autumn'];
    this.Languages= ['All', 'English', 'French'];
    this.sortType= ['Price: low to high', 'Price: high to low'];
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm () {
    this.form = this.fb.group({
      cities:this.fb.control(null, Validators.required),
      program:this.fb.control(null),
      fileds:this.fb.control(null),
      schools:this.fb.control(null),
      language:this.fb.control(null),
      sort:this.fb.control(null)
    })
    this.form.patchValue({})
  }
  submit(){
    console.log(this.form.value)
  }

}
