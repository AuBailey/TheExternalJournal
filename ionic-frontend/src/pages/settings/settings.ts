import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers';
import { User } from '../../providers'


/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private user: User) {
  }

  logout() {
    this.user.logout();
    this.navCtrl.setRoot('LoginPage');
  }

  changePassword(){
    this.navCtrl.push('ChangePassword');
  }
}
