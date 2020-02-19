import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { YoutubeService } from './service/youtube/youtube.service';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { FavoritesService } from './service/favorites/favorites.service';
import { SearchPageService } from './service/search-page/search-page.service';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchPageComponent,
    SearchPanelComponent
  ],
  exports: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule,
  ],
  providers: [
    YoutubeService,
    FavoritesService,
    SearchPageService
  ]
})
export class SearchPageModule { }
