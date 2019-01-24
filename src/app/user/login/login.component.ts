import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { loginData } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string = "";

  constructor(public authService: AuthService,
    public router: Router,
    private toastr: ToastrService,
    private ballLoader: NgxSpinnerService,
    private titleService: Title) { }

  ngOnInit() {
    this.ballLoader.show();
    setTimeout(() => { this.ballLoader.hide(); }, 2000);
    this.titleService.setTitle("Login");
  }

  public goToSignUp: any = () => {
    this.ballLoader.show();
    setTimeout(() => { this.ballLoader.hide(); }, 500);
    this.router.navigate(["/sign-up"]);
  }; // end goToSignUp

  public goToForgetPassword: any = () => {
    this.ballLoader.show();
    setTimeout(() => { this.ballLoader.hide(); }, 500);
    this.router.navigate(["/forget-password"]);
  }; // end goToSignUp

  public sendUsingKeypress: any = (event: any) => {
    if (event.keyCode === 13) {
      // 13 is keycode of enter.
      this.signinFunction();
    }
  }; // end sendMessageUsingKeypress

  public signinFunction: any = () => {
    this.ballLoader.show();
    setTimeout(() => { this.ballLoader.hide(); }, 2000);
    let data :loginData={
      email : this.email,
      password: this.password
    }
    this.authService.loginEmail(data.email, data.password).then(() => {
      this.toastr.success('Successfully Login');
      this.router.navigate(["/home"]);
    }, (err) => {
      if (err.message !== undefined) {
        this.toastr.error(err.message);
      }
      else {
        this.toastr.error(err);
      }
    });
  }; // end signinFunction

  public loginWithGoogle = () => {
    this.authService.loginWithGoogle().then(() => {
      this.toastr.success('Successfully Login');
      this.ballLoader.show();
      setTimeout(() => { this.router.navigate(["/home"]); this.ballLoader.hide(); }, 2000);
    }, (err) => {
      this.toastr.error(err.message);
      console.log(err);
    });
  }

  public loginWithFacebook = () => {
    this.authService.loginWithFacebook().then(() => {
      this.toastr.success('Successfully Login');
      this.ballLoader.show();
      setTimeout(() => { this.router.navigate(["/home"]); this.ballLoader.hide(); }, 2000);
    }, (err) => {
      this.toastr.error(err.message);
      console.log(err);
    });
  }

}
