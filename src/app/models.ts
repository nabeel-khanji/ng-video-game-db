export interface Game {
  background_image: string;
  name: string;
  released: string;
  metacritic: number;
  genres: Array<Genres>;
  parent_platforms: Array<ParentPlatforms>;
  ratings: Array<Rating>;
  short_screenshots: Array<ScreenShort>;
}
export interface APIResponse<T> {
  results: Array<T>;
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
