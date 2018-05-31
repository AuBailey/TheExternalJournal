import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = { email: '', password: ''};
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public user: User,
    public toastCtrl: ToastController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    })
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.user.login(this.account).subscribe((resp) => {
        this.isLoading = false;
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.isLoading = false;
        // Unable to log in
        let message = (err.error.message) ? err.error.message : "An error occured.";
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }
}
