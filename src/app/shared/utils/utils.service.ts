import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  phoneNumberRegExp ='(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})';
  websiteRegExp = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
  constructor() { }

  // Languages
  get currentLang() {
    return localStorage.getItem('language');
  }
  
  validateEntityId(control: AbstractControl) {
    return control.value ? control.value.id != null ? null : { unTaken: true } : { unTaken: false };
  }

  
  validateArrayofObjects(control: AbstractControl) {
    let valid = false;
    control.value.forEach(element => {
      element.id != null ? valid = true : valid = false;
    });
    return { unTaken: valid };
  }

  get timeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  isAuth(): boolean{
      return sessionStorage.getItem('token')!= undefined ? 
      sessionStorage.getItem('token') != null?
       sessionStorage.getItem('token')? true: false
        : false  
      : false 
  }


}
