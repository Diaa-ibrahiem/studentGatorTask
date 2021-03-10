import { FilterService } from './../../filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  images: string;
  deploma: Array<any>;

  constructor(public http: HttpClient,private _filter:FilterService) {
    this.images = 'assets/Images/Cours Florent.png';
  }

  ngOnInit(): void {
    this._filter.getdata()
    this.getdata();
    
  }
  getdata() {
    this._filter.getSubscribe().subscribe(data =>{ 
      this.deploma = data
    })
  }
}
