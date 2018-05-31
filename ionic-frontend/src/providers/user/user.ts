import 'rxjs/add/operator/share';
import { HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 */
@Injectable()
export class User {
  _jwt: string;
  _user: any;

  constructor(public api: Api, private storage: Storage) { }

  /**
   * Checks if user is logged in.
   * If true, it sets the proper data and resolves, else rejects.
   */
  isLoggedIn() {
    return new Promise((resolve, reject) => {
      if (this._jwt && this._user) {
        resolve(true);
      } else {
        this.storage.get('data').then((val) => {
          if (val) {
            this._jwt = val.jwt;
            this._user = val.user;
            resolve(true);
          } else {
            reject(false);
          }
        });
      }
    })
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('/auth/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('/auth/register', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success) {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._jwt = null;
    this._user = null;
    this.storage.remove('data');
  }

  /**
   * Deletes the user , and calls logout. 
   */
  delete(){
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this._jwt
      })
    };
    let seq = this.api.delete('/user', httpOptions);

    seq.subscribe((res: any) => {
      if (res.success) {
        this.logout();
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Changes the user password
   */
  changePassword(accountInfo: any){
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this._jwt
      })
    };

    let passwordInfo = {
      currentPassword: accountInfo.oldPassword,
      newPassword : accountInfo.password
    }
    let seq = this.api.post('/auth/changePassword', passwordInfo, httpOptions).share();

    seq.subscribe((res: any) => {
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(response) {
    this._jwt = response.data.jwt;
    this._user = response.data.user;
    this.storage.set('data', response.data);
  }
}
