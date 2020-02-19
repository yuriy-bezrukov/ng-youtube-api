interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Standard {
  url: string;
  width: number;
  height: number;
}

interface Maxres {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
  defaultLanguage: string;
}

export interface IYoutubeVideo {
  kind: ItemKind;
  etag: string;
  id: IDVideo | string;
  snippet: Snippet;
}

export enum ItemKind {
  SearchResult = "youtube#searchResult",
  Video = 'youtube#video'
}

export interface IDVideo {
  kind: IDKind;
  videoId?: string;
  channelId?: string;
}

export enum IDKind {
  YoutubeChannel = "youtube#channel",
  YoutubeVideo = "youtube#video",
}


export interface IYoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: IYoutubeVideo[];
  error?: boolean;
}

export const MAX_RESULTS = 50;

export class VideoQuery {
  // protected part = 'snippet,contentDetails,statistics';
  protected part = 'snippet';
  protected maxResults = MAX_RESULTS;
  protected regionCode = 'US';
  protected order: 'viewCount';
  id: string;
  pageToken?: string;
  /** type sort */
  chart = 'mostPopular';
  /** search word */
  protected q: string;
  /** api user token */
  key?: string;

  get url() {
    return this.q ? 'search' : 'videos';
  }

  set searchByText(text: string) {
    this.q = text;
    this.order = 'viewCount';
    delete this.chart;
  }

  set ids(ids: string[]) {
    this.chart = undefined;
    this.id = ids.join(',');
  }
}

