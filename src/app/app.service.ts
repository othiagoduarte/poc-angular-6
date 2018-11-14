import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(
        private http: HttpClient
    ) {

    }

    public getTeste(): Observable<any> {
        return this.http.get<any>('http://localhost:9000/api');
    }
}
