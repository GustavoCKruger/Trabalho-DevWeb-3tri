import { defineStore } from 'pinia'

export const useTvFavoritesStore = defineStore('tvFavorites', {
  state: () => ({
    shows: [],
  }),
  actions: {
    toggleFavorite(show) {
      const exists = this.shows.find((s) => s.id === show.id)
      if (exists) {
        this.shows = this.shows.filter((s) => s.id !== show.id)
      } else {
        this.shows.push(show)
      }
    },
    isFavorite(showId) {
      return this.shows.some((show) => show.id === showId)
    },
  },
})
