import { Injectable } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';
import { IYoutubeVideo, IYoutubeResponse } from '../youtube/youtube.model';
import { FavoritesService } from '../favorites/favorites.service';
import { BaseStoreService, IBaseStore } from '../../../../shared/services/base-strore.service';
import { tap } from 'rxjs/operators';

export enum SearchPageActions {
  init = 'init',
  getVideo = 'getVideo',
  changeFavorites = 'changeFavorites'
}

export interface IStateSearchPage extends IBaseStore {
  action: SearchPageActions;
  payload?: {
    favorites?: string[];
    videos?: IYoutubeVideo[];
    canNext?: boolean;
    canPrev?: boolean;
  }
}

@Injectable()
export class SearchPageService extends BaseStoreService<IStateSearchPage> {

  constructor(private youtubeService: YoutubeService, private favoritesService: FavoritesService) {
    super();
    this.state = {
      action: SearchPageActions.init,
      payload: {
        videos: [],
        favorites: this.favoritesService.get(),
      }
    };
  }

  getVideoByView() {
    return this.youtubeService.getByView().pipe(tap(res => {
      this.videoAction(res);
    }));
  }

  getVideoByText(text: string) {
    return this.youtubeService.getByText(text).pipe(tap(res => {
      this.videoAction(res);
    }));
  }

  getVideoNextPage() {
    return this.youtubeService.getNext().pipe(tap(res => {
      this.videoAction(res);
    }));
  }

  getVideoPrevPage() {
    return this.youtubeService.getPrev().pipe(tap(res => {
      this.videoAction(res);
    }));
  }

  toggleFavorites(id: string) {
    this.favoritesService.toggle(id);
    this._assignState = {
      action: SearchPageActions.changeFavorites,
      payload: {
        favorites: this.favoritesService.get()
      }
    }
  }

  removeFavorites(id: string) {
    this.favoritesService.remove(id);
  }

  getFavoritesVideo() {
    let favoritesIds = this.favoritesService.get();
    return this.youtubeService.getByIds(favoritesIds).pipe(tap(res => {
      this.videoAction(res);
    }));
  }

  private videoAction(res: IYoutubeResponse) {
    let videos: IYoutubeVideo[] = res.items;
    this.state = {
      action: SearchPageActions.getVideo,
      payload: {
        videos: videos,
        favorites: this.favoritesService.get(),
        canNext: !!res.nextPageToken,
        canPrev: !!res.prevPageToken
      }
    }
  }


}

