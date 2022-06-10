import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment as env } from '../../environments/environment.prod';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  [x: string]: any;
  constructor(private http: HttpClient) {}
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games${env.SECRET_KEY}`, {
      params: params,
    });
  }
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}${env.SECRET_KEY}`);
    const gameTrailerRequest = this.http.get(
      `${env.BASE_URL}/games/${id}${env.SECRET_KEY}`
    );
    const gameScreenShortsRequests = this.http.get(
      `${env.BASE_URL}/games/${id}${env.SECRET_KEY}`
    );  return forkJoin({
      gameInfoRequest,
      gameScreenShortsRequests,
      gameTrailerRequest
    }).pipe(map((resp:any)=>{
      return{
        ...resp['gameInfoRequest'],
        screenshorts:resp['gameScreenShortsRequests']?.results,
        trailers:resp['gameTrailerRequest']?.results
      }
    }))
  }

}
