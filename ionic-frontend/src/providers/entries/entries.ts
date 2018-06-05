import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Entry } from '../../models/entry';
import { Api } from '../api/api';
import { User } from '../user/user';

@Injectable()
export class Entries {

  constructor(public api: Api, private user: User) { }

  getAll(journalId: number) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    return this.api.get('/entry/all/' + journalId, {}, httpOptions);
  }

  add(journalId:number, entry: Entry) {
    // SET HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    let body = {
      'journalId': journalId,
      'entryName': entry.name,
      'entryContent': entry.content,
      'entryLat': entry.lat,
      'entryLong': entry.lng
    }
    return this.api.post('/entry', body, httpOptions);
  }

  edit(entry: Entry) {
     // SET HEADERS
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.user._jwt
      })
    };
    let body = {
      'entryId': entry.id,
      'entryName': entry.name,
      'entryContent': entry.content,
      'entryLat': entry.lat,
      'entryLong': entry.lng,
      'isShared': entry.isShared
    }
    return this.api.put('/entry', body, httpOptions);
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
    return this.api.delete('/entry', httpOptions);
  }

}
