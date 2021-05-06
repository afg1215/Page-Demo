import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getData() {
    //取得api資料
    return this.http.get('https://run.mocky.io/v3/dcb8d376-1dd1-48f7-91cc-3acef554aee9'); 
  }
}
