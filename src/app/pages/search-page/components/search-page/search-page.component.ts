import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Tabs, Tab } from '../../search-page.model';
import { ITab } from 'src/app/shared/modules/tabs/tabs.model';
import { SearchPageService, SearchPageActions } from '../../service/search-page/search-page.service';
import { takeUntil } from 'rxjs/operators';
import { IYoutubeVideo, IDVideo } from '../../service/youtube/youtube.model';
import { YoutubeService } from '../../service/youtube/youtube.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {

  tabs = Tabs;
  private destroy = new EventEmitter();
  videos: IYoutubeVideo[] = [];
  favorites: string[] = [];
  canNext: boolean;
  canPrev: boolean;

  constructor(private searchPageService: SearchPageService, private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.searchPageService.state$.subscribe(state => {
      if (state.action === SearchPageActions.getVideo) {
        this.videos = state.payload.videos;
        this.canNext = state.payload.canNext;
        this.canPrev = state.payload.canPrev;
      }
      if ([SearchPageActions.changeFavorites, SearchPageActions.init].includes(state.action)) {
        this.favorites = state.payload.favorites;
      }
    })

    this.searchPageService.getVideoByView().subscribe();
  }

  ngOnDestroy() {
    this.destroy.emit();
  }

  nextVideo() {
    this.searchPageService.getVideoNextPage().subscribe();
  }

  prevVideo() {
    this.searchPageService.getVideoPrevPage().subscribe();
  }

  toggleFavorites(video: IYoutubeVideo) {
    let id = this.youtubeService.getIdByVideo(video);
    this.searchPageService.toggleFavorites(id);
  }

  onSearchByText(text: string) {
    this.searchPageService.getVideoByText(text).subscribe();
  }

  onTabSelect(tab: ITab<Tab>) {
    if (tab.id === Tab.favorites) {
      this.searchPageService.getFavoritesVideo().subscribe();
    }
    if (tab.id === Tab.all) {
      this.searchPageService.getVideoByView().subscribe();
    }

  }

  isFavorites(video: IYoutubeVideo) {
    return this.favorites.includes(this.youtubeService.getIdByVideo(video));
  }

}
