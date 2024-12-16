<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useFavoritesStore } from '@/stores/favoritesFilmes.js';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre.js';
import { useRouter } from 'vue-router';

const genres = ref([]);
const tvs = ref([]);
const isLoading = ref(false);
const genreStore = useGenreStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
    genres.value = genreStore.genres;
    isLoading.value = false;
});

const listTvs = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR',
        },
    });
    tvs.value = response.data.results;
    isLoading.value = false;
};

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('pt-BR') : 'Data não disponível');
const openTv = (tvId) => router.push({ name: 'TvDetails', params: { tvId } });
</script>

<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
        <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTvs(genre.id)" class="genre-item"
            :class="{ active: genre.id === genreStore.currentGenreId }">
            {{ genre.name }}
        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
        <div v-for="tv in tvs" :key="tv.id" class="movie-card">
            <img :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : '/path/to/placeholder.jpg'"
                :alt="tv.name" @click="openTv(tv.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ tv.original_name }}</p>
                <p class="movie-release-date">{{ formatDate(tv.first_air_date) }}</p>
                <button @click="favoritesStore.toggleFavorite(tv)">
                    {{ favoritesStore.isFavorite(tv.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Gêneros */
.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    list-style: none;
    margin-bottom: 2.5rem;
    padding: 0;
}

.genre-item {
    background-color: #ff6b6b;
    border-radius: 1rem;
    padding: 0.75rem 1.5rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

.genre-item:hover {
    cursor: pointer;
    background-color: #ff4757;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
}

.genre-item.active {
    background-color: #ff4757;
    font-weight: 700;
    box-shadow: 0 0.5rem 1rem rgba(255, 71, 87, 0.4);
}

/* Filmes */
.movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 2rem;
    padding: 0 1rem;
}

.movie-card {
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.movie-card img {
    width: 100%;
    height: auto;
    border-bottom: 0.2rem solid #ff6b6b;
}

.movie-details {
    padding: 1rem;
    text-align: center;
}

.movie-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #2f3542;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.movie-release-date {
    font-size: 1rem;
    color: #57606f;
    margin-bottom: 1rem;
}

button {
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
}

button:hover {
    background-color: #ff4757;
    box-shadow: 0 0.5rem 1rem rgba(255, 71, 87, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
    .genre-list {
        gap: 1rem;
    }

    .movie-card {
        width: 100%;
    }
}
</style>