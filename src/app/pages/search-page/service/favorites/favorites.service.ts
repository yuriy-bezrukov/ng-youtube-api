import { Injectable } from '@angular/core';

const FAVORITES_LOCALSTORAGE_NAME = 'favorites-localstorage-name';

@Injectable()
export class FavoritesService {

  constructor() { }

  private set favorites(ids: string[]) {
    localStorage.setItem(FAVORITES_LOCALSTORAGE_NAME, JSON.stringify(ids));
  }

  private get favorites(): string[] {
    let data: string = localStorage.getItem(FAVORITES_LOCALSTORAGE_NAME);
    return data ? <string[]>JSON.parse(data) : [];
  }

  toggle(id: string) {
    if (this.get().includes(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }

  add(id: string) {
    if (!this.favorites.includes(id)) {
      this.favorites = [id, ...this.favorites];
    }
  }

  remove(id: string) {
    this.favorites = this.favorites.filter(favotite => favotite !== id);
  }

  get(): string[] {
    return this.favorites;
  }

  clear() {
    this.favorites = [];
  }

}


