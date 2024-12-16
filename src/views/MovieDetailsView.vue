<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();

const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>

    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
                :alt="movieStore.currentMovie.title" />

            <div class="details">
                <h1>Filme: {{ movieStore.currentMovie.title }}</h1>
                <p>{{ movieStore.currentMovie.tagline }}</p>
                <p>{{ movieStore.currentMovie.overview }}</p>
                <p>Orçamento: ${{ movieStore.currentMovie.budget }}</p>
                <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
            </div>
        </div>
    </div>

    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>

</template>

<style scoped>

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f4f6f8;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    width: 100%;
}

.content img {
    width: 18rem;
    border-radius: 0.8rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
}

.details h1 {
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
}

.details p {
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.5;
    margin-bottom: 0.8rem;
}

.companies {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-top: 2rem;
}

.companies img {
    width: 6rem;
    height: auto;
    object-fit: contain;
    border-radius: 0.5rem;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.companies img:hover {
    transform: scale(1.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.companies p {
    font-size: 1rem;
    font-weight: bold;
    color: #34495e;
    text-align: center;
}

@media (max-width: 768px) {
    .content {
        flex-direction: column;
        align-items: center;
    }

    .content img {
        width: 90%;
    }

    .details {
        text-align: center;
    }
}
</style>