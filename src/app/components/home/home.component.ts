import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games!: Array<Game>;
  public count!: number;
  public next!: string;
  public previous!: string;
  
  public gameSub!: Subscription;
  public routeSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
      
    });
  }
  searchGames( sort: string, search?: string) {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.count= gameList.count;
        this.next= gameList.next;
        this.previous= gameList.previous;
        
        console.log(gameList);
      });
  }
  gamePagination(link:string){
    console.log(link);
    
    this.gameSub = this.httpService
    .getGameList(link)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      this.count= gameList.count;
      this.next= gameList.next;
      this.previous= gameList.previous;
      
      console.log(gameList);
      
    });
  }
  openGameDetailsMethod(id: string): void {
    this.router.navigate(['details', id]);
  }
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
