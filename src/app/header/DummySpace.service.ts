import { HttpService } from '../services/http-service';
import { WIT_API_URL, Space } from 'ngx-fabric8-wit';
import { Injectable, Component, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { MockHttp } from '../mock/mock-http';

@Injectable()
export class DummySpace {

  constructor(private http: HttpService,
    @Inject(WIT_API_URL) private baseApiUrl: string)
  {}

  getAllSpaces() {
    return this.http.get(this.baseApiUrl + 'spaces')
            .map(response => response.json().data);
  }
}
