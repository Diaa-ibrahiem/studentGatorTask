import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { EntitiesService } from './entities.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private entities: EntitiesService, private router: Router, private utils: UtilsService) {
   
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // if (!this.utils.isAuth()) {
            // this.router.navigate(['/pages', 'auth', 'login'])
            // return false
        // }
      
    // if (this.entities.allEntities?.find(entity => {

      
    //   entity.route.includes(next.params.route)}))
    // {
      
    // }
    // else
    //   {
    //     this.router.navigate(['/'])
    //     return false
    //   }
    return true;
  }

}
