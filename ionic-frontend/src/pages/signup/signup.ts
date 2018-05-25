import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { PasswordMatchValidation } from '../../validators';
import { MainPage } from '../';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: { username: string, email: string, password: string, passwordConfirm: string } = 
  {username: '', email: '', password: '', passwordConfirm: '' };
  signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public user: User,
    public toastCtrl: ToastController) {

    this.signupForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: PasswordMatchValidation.MatchPassword
    })
  }
  

  doSignup() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.user.signup(this.account).subscribe((resp) => {
        this.isLoading = false;
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.isLoading = false;
        // Unable to sign up
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

}
