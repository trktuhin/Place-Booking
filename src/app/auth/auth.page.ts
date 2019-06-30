import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLogin=true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();

    this.loadingCtrl
      .create({ keyboardClose: true, message: "Loggin in.." })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
          this.router.navigateByUrl("/places/tabs/discover");
        }, 2000);
      });
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    console.log(email,password);
    if(this.isLogin){
      //call login service
    }
    if(!this.isLogin){
      //call to signup service
    }
  }
  onAuthModeChange(){
    this.isLogin=!this.isLogin;
  }
}
