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
  collection = { count: 60, data: [{}] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count,
  };
  public sort!: string;
  public games!: Array<Game>;
  public count!: number;
  public next!: string;
  public previous!: string;
  public page: number=1;

  public gameSub!: Subscription;
  public routeSub!: Subscription;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: this.page,
  };
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        id: i + 1,
        value: 'items number ' + (i + 1),
      });
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }
  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService
      .getGameList(sort, 1, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.count = gameList.count;
        this.next = gameList.next;
        this.previous = gameList.previous;
        this.page = gameList.page;

        console.log(gameList);
      });
  }
  gamePagination(page: number) {
    
    console.log(this.page);

    this.gameSub = this.httpService
      .getGameList('', this.page)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.count = gameList.count;
        this.next = gameList.next;
        this.previous = gameList.previous;

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
  onPageChange(event: number) {
    var page= 0;
    if (this.page == null) {
      this.page = 1;
    }
    if (page < this.page) {
      this.page++;
      page++;
    }
    if (page > this.page) {
      this.page--;
      page--;
    }
    console.log(this.page);
    console.log(page);
    
    
    console.log(event);
    this.config.currentPage = event;
    this.router.navigate(['page', event]);
    this.gamePagination(this.page);
  }
}
