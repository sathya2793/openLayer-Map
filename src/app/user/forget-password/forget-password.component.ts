import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { forgetPasswordData} from './forget-password';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

public email :any;
  constructor(public authService: AuthService,
    public router: Router,
    private toastr: ToastrService,
    private titleService: Title,
    private ballLoader: NgxSpinnerService) { }

  ngOnInit() {
    this.titleService.setTitle("Forget Password");
  }

  public sendResetLink :any = () => {
    this.ballLoader.show(); 
      setTimeout(() => { this.ballLoader.hide(); }, 2000);
    let data:forgetPasswordData = {
      email: this.email
    };
    this.authService.forgotPassword(data.email)
    .then(() => {
      this.toastr.success("Password reset email sent, check your inbox.");
      this.goToSignIn();
  }, (err) => {
    this.toastr.error(err.message);
    console.log(err);
  }); // end condition
}

  public goToSignIn: any = () => {
    this.ballLoader.show(); 
    setTimeout(() => { this.ballLoader.hide(); }, 500);
    this.router.navigate(['/']);
  } // end goToSignIn

}
