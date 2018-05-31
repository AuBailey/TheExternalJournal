import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Journal } from '../../models/journal';
import { Api } from '../api/api';
import { User } from '../user/user';

@Injectable()
export class Journals {

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

  add(journal: Journal) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    return this.api.post('/journal', {'journalName': journal.name}, httpOptions);
  }

  edit(journal: Journal) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    return this.api.put('/journal', {'journalId': journal.id, 'journalName': journal.name}, httpOptions);
  }

  delete(journal: Journal) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      }),
      body: {'journalId': journal.id}
    };
    return this.api.delete('/journal', httpOptions);
  }

}
