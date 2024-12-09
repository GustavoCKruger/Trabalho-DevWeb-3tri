<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useFavoritesStore } from '@/stores/favorites.js';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre.js';
import { useRouter } from 'vue-router';

const genres = ref([]);
const movies = ref([]);
const isLoading = ref(false);
const genreStore = useGenreStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('movie');
    genres.value = genreStore.genres;
    isLoading.value = false;
});

const listMovies = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/movie', {
        params: {
            with_genres: genreId,
            language: 'pt-BR',
        },
    });
    movies.value = response.data.results;
    isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const openMovie = (movieId) => router.push({ name: 'MovieDetails', params: { movieId } });
</script>

<template>
    <h1>Filmes</h1>
    <ul class="genre-list">
        <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
            :class="{ active: genre.id === genreStore.currentGenreId }">
            {{ genre.name }}
        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
                @click="openMovie(movie.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ movie.title }}</p>
                <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
                <button @click="favoritesStore.toggleFavorite(movie)">
                    {{ favoritesStore.isFavorite(movie.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
}

.genre-item {
    background-color: rgb(220, 20, 60);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
}

.genre-item:hover {
    cursor: pointer;
    background-color: rgb(210, 10, 30);
    box-shadow: 0 0 0.5rem rgb(210, 10, 30);
}

.movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-left: 10%;
}

.movie-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.movie-details {
    padding: 0 0.5rem;
}

.movie-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.movie-genres {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;
}

.movie-genres span {
    background-color: rgb(210, 10, 30);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
}

.movie-genres span:hover {
    cursor: pointer;
    background-color: rgb(210, 10, 30);
    box-shadow: 0 0 0.5rem rgb(210, 10, 30);
}

.active {
    background-color: rgb(210, 10, 30);
    font-weight: bolder;
}

.movie-genres span.active {
    background-color: rgb(210, 10, 30);
    color: #000;
    font-weight: bolder;
}
</style>