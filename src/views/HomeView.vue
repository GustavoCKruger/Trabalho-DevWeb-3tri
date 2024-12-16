<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

const popularMedia = ref([]);
const currentIndex = ref(0);
const intervalId = ref(null);

const apiKey = "b8eb98f5a250adbf9c2f1305cf5d8a75";
const baseUrl = "https://api.themoviedb.org/3";

const fetchPopularMedia = async () => {
    try {
        const [moviesResponse, tvResponse] = await Promise.all([
            axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`),
            axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language=pt-BR&page=1`),
        ]);
        popularMedia.value = [...moviesResponse.data.results.slice(0, 5), ...tvResponse.data.results.slice(0, 5)];
    } catch (error) {
        console.error("Erro ao buscar filmes e séries populares:", error);
    }
};

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % popularMedia.value.length;
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + popularMedia.value.length) % popularMedia.value.length;
};

const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
};

const startAutoPlay = () => {
    intervalId.value = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
    clearInterval(intervalId.value);
};

onMounted(() => {
    fetchPopularMedia();
    startAutoPlay();
});

onBeforeUnmount(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="home-container">
        <header>
            <h1>Bem-vindo</h1>
            <p>Explore os melhores filmes e séries e descubra seus favoritos!</p>
        </header>
        <div class="carousel-container">
            <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div v-for="media in popularMedia" :key="media.id" class="carousel-item">
                    <img :src="`https://image.tmdb.org/t/p/original${media.backdrop_path}`"
                        :alt="media.title || media.name" />
                    <div class="carousel-info">
                        <h2>{{ media.title || media.name }}</h2>
                        <p>Lançamento: {{ formatDate(media.release_date || media.first_air_date) }}</p>
                    </div>
                </div>
            </div>
            <div class="carousel-controls">
                <button @click="prevSlide">❮</button>
                <button @click="nextSlide">❯</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    text-align: center;
}

.home-container header {
    background-color: #ff6b6b;
    color: #fff;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.home-container header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.home-container header p {
    font-size: 1.2rem;
}

.carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    min-width: 100%;
    position: relative;
}

.carousel-item img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 1rem;
}

.carousel-info {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 80%;
}

.carousel-info h2 {
    font-size: 1.5rem;
    margin: 0;
}

.carousel-info p {
    font-size: 1rem;
    margin: 0.5rem 0 0;
}

.carousel-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.carousel-controls button {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.3s;
}

.carousel-controls button:hover {
    background: rgba(0, 0, 0, 0.8);
}
</style>
