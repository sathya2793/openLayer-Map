import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { signupData } from './signup';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userName: any;
  public email: any;
  public passWord: string;
  public confirmPassword: string;
  public userPattern = "^[a-zA-Z]{4,}[a-zA-Z0-9\s@#_-\w]*$";
  public emailPattern = "^/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
  public passwordPattern = "^[A-Za-z_]{1,}.{7,30}$";
  public user = null;
  constructor(public authService: AuthService,
    public router: Router,
    private toastr: ToastrService,
    private titleService: Title,
    private ballLoader: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle("SignUp");
    }

  public goToSignIn: any = () => {
    this.ballLoader.show(); 
    setTimeout(() => { this.ballLoader.hide(); }, 500);
    this.router.navigate(['/']);
  } // end goToSignIn



  public signupFunction: any = () => {
    if(this.passWord === this.confirmPassword) {
    this.ballLoader.show(); 
    setTimeout(() => { this.ballLoader.hide(); }, 2000);
    let data:signupData = {
      displayName: this.userName,
      email: this.email,
      password: this.passWord
    }
    this.authService.registerUser(data)
    .then(() => {
        this.toastr.success("You have been successfully registered!,Verify You Email");
        this.goToSignIn();
    }, (err) => {
      this.toastr.error(err.message);
      console.log(err);
    }); // end condition
  } // end signupFunction
else{
  this.toastr.info("Password and Confirm Password is not matched")
}
  }
}
