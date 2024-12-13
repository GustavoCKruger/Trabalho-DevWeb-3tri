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
/* Título */
h1 {
    text-align: center;
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}

/* Lista de Filmes Favoritos */
.movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1.5rem;
    padding: 0 2rem;
    justify-items: center;
}

/* Cartão de Filme */
.movie-card {
    background-color: #f8f9fa;
    border-radius: 0.8rem;
    overflow: hidden;
    width: 14rem;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

/* Imagem do Filme */
.movie-card img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
}

/* Detalhes do Filme */
.movie-details {
    padding: 1rem;
    text-align: center;
}

.movie-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.movie-details p {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 1rem;
}

/* Botão */
button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
    background-color: #c0392b;
    box-shadow: 0 0.3rem 0.6rem rgba(231, 76, 60, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
    .movie-list {
        gap: 1rem;
    }

    .movie-card {
        width: 90%;
    }
}
</style>
