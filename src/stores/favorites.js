import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({ favorites: [] }),
  actions: {
    toggleFavorite(drink) {
      const index = this.favorites.findIndex(d => d.idDrink === drink.idDrink);
      if (index === -1) this.favorites.push(drink);
      else this.favorites.splice(index, 1);
    },
  },
});
