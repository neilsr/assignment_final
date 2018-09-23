import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
//import { HttpHeaders } from '@angular/common/http';


export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  cards: string;
  file1: string
  file2: string
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  private cards: string = ''

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get' | 'patch', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    console.log(user)

    if (method === 'post') {
      //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
      base = this.http.post(`/api/${type}`, user, );
      //base = this.http.post('/api/test123', user, );
    }
    else if (method === 'patch') {
      base = this.http.patch(`/api/${type}`, user , { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload, file): Observable<any> {
    // console.log(user)
    //return this.request('post', 'register', user);
    return this.request('post', 'register', file);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public updateProfile(user): Observable<any> {
    console.log('user')
    console.log(user)
    console.log('user')
    return this.request('patch', 'profile', user);
  }

  public updateCards(cards): void {
    this.cards = cards
  }

  //public logout(user): void {
  public logout(): void {

    // alert('sdfsdf')
    //console.log(this.getUserDetails())
    let user = this.getUserDetails()

    // console.log(user.cards)

    user.cards = this.cards.toString()

    console.log(user.cards)

    //this.http.post(`/api/udpateCards`, this.cards);
    this.request('patch', 'profile', user).subscribe(() => {

      //this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });

    if (1) {
      this.token = '';
      window.localStorage.removeItem('mean-token');
      this.router.navigateByUrl('/');
    }

  }
}
