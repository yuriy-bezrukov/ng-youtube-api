import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IYoutubeResponse, VideoQuery, IYoutubeVideo, ItemKind, IDVideo } from './youtube.model';
import { tap } from 'rxjs/operators';


const API_URL = 'https://www.googleapis.com/youtube/v3/';

@Injectable()
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private get(query: VideoQuery): Observable<IYoutubeResponse> {
    let data = JSON.parse(JSON.stringify(query));
    (<VideoQuery>data).key = environment.youTubeKeyApi3;
    Object.keys(query).forEach(key => {
      if (query[key] === undefined) {
        delete query[key];
      }
    })

    return this.http.get<IYoutubeResponse>(API_URL + query.url, { params: data }).pipe(
      tap(res => {
        this.lastQuery = query;
        this.nextPageToken = res.nextPageToken;
        this.prevPageToken = res.prevPageToken;
      })
    );
  }

  private lastQuery: VideoQuery;
  private nextPageToken: string;
  private prevPageToken: string;

  getByText(text: string) {
    let query = new VideoQuery();
    query.searchByText = text;
    debugger
    return this.get(query);
  }

  getByView(pageToken?: string) {
    let query = new VideoQuery();
    query.pageToken = pageToken;
    return this.get(query);
  }

  getByIds(ids: string[]) {
    let query = new VideoQuery();
    query.ids = ids;
    return this.get(query);
  }

  getNext() {
    if (!this.nextPageToken) {
      return of(<IYoutubeResponse>{
        error: true,
        items: []
      });
    }
    debugger
    this.lastQuery.pageToken = this.nextPageToken;
    return this.get(this.lastQuery);
  }

  getPrev() {
    if (!this.prevPageToken) {
      return of(<IYoutubeResponse>{
        error: true,
        items: []
      });
    }
    this.lastQuery.pageToken = this.prevPageToken;
    return this.get(this.lastQuery);
  }

  getIdByVideo(video: IYoutubeVideo) {
    return video.kind === ItemKind.Video ? <string>video.id : (<IDVideo>video.id).videoId;
  }

}
