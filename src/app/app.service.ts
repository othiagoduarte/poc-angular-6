import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(
        private http: HttpClient
    ) {

    }

    public getTeste(): Observable<any[]> {
        return this.http.get<any>('https://compromisso-api.herokuapp.com/api/compromisso/Proximos/');
    }
}
