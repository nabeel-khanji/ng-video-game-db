export interface Game {
  background_image: string;
  id: string;
  name: string;
  released: string;
  metacritic: number;
  genres: Array<Genres>;
  parent_platforms: Array<ParentPlatforms>;
  ratings: Array<Rating>;
  screenshots: Array<ScreenShort>;
  metacritic_url:string;
  website:string;
  description:string;
  publishers: Array<Publisher>;
  trailer:
     Array<TrailerResults>
  ;
}
export interface APIResponse<T> {
  results: Array<T>;
}

interface TrailerResults{
  data:{
    max:string,
    name:string
  }
}
interface Publisher{
  id: number,
name: string,
slug: string,
games_count: number,
image_background: string

}
interface Genres {
  name: string;
}
interface ParentPlatforms {
  platform: {
    name: string;
    slug:string;
  };
}
interface Rating {
  percent: number;
  id: number;
  title: string;
  count: number;
}
interface ScreenShort {
  id: number;
  image: string;
}
