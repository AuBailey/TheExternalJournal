import { Component } from '@angular/core';
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
    public navParams: NavParams,
    private user: User) {
  }

  useLocation(){

  }

  dontUseLocation(){
    
  }

  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  logout() {
    this.user.logout();
    this.navCtrl.setRoot('LoginPage');
  }

  deleteUser(){
    this.user.delete();
    this.navCtrl.setRoot('LoginPage')
  }
}
