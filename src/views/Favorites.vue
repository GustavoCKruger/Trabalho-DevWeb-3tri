<script setup>
import { useFavoritesStore } from '@/stores/favorites.js';
import { useRouter } from 'vue-router';

const favoritesStore = useFavoritesStore();
const router = useRouter();

const openMovie = (movieId) => router.push({ name: 'MovieDetails', params: { movieId } });
const openTv = (tvId) => router.push({ name: 'TvDetails', params: { tvId } });
</script>

<template>
    <h1>Favoritos</h1>
    <div class="movie-list">
        <div v-for="movie in favoritesStore.movies" :key="movie.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
                @click="openMovie(movie.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ movie.title }}</p>
                <p>{{ movie.release_date }}</p>
                <button @click="favoritesStore.toggleFavorite(movie)">Remover dos Favoritos</button>
            </div>
        </div>
        <!-- <div v-for="tv in favoritesStore.tvs" :key="tv.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.original_name"
                @click="openTv(tv.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ tv.original_name }}</p>
                <p>{{ tv.first_air_date }}</p>
                <button @click="favoritesStore.toggleFavorite(tv)">Remover dos Favoritos</button>
            </div>
        </div> -->
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
    background-color: #387250;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #4e9e5f;
    box-shadow: 0 0 0.5rem #387250;
}

.movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
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
    background-color: #748708;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
}

.movie-genres span:hover {
    cursor: pointer;
    background-color: #455a08;
    box-shadow: 0 0 0.5rem #748708;
}

.active {
    background-color: #67b086;
    font-weight: bolder;
}

.movie-genres span.active {
    background-color: #abc322;
    color: #000;
    font-weight: bolder;
}
</style>
