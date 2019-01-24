import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService,private toastr: ToastrService,) { }
  canActivate() {
      if ( this.authService.isLoggedIn() ) {
          return true; 
      }
      else{
      this.toastr.error('some error occured,Please Login again');
      this.router.navigate(['/']);
      return false;
      }
  }
}