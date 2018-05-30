import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Entry } from '../../models/entry';
import { Api } from '../api/api';
import { User } from '../user/user';

@Injectable()
export class Entries {

  constructor(public api: Api, private user: User) { }

  getAll() {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    return this.api.get('/journal/all', {}, httpOptions);
  }

  add(entry: Entry) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    return this.api.post('/entry', {'entryName': entry.name}, httpOptions);
  }

  delete(entry: Entry) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      }),
      body: {'entryId': entry.id}
    };
    return this.api.delete('/journal', httpOptions);
  }

}
