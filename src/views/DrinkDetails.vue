<template>
    <div v-if="drink">
      <img :src="drink.strDrinkThumb" :alt="drink.strDrink" />
      <h1 class="drink-title">{{ drink.strDrink }}</h1>
      <ul>
        <li class="drink-ingridients" v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }}</li>
      </ul>
      <p class="drink-instructions">{{ drink.strInstructions }}</p>
      <button class="favorite-button" @click="toggleFavorite">{{ isFavorite ? 'Remover dos favoritos' : 'Favoritar' }}</button>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { useFavoritesStore } from '../stores/favorites';
  import { computed, ref } from 'vue';
  
  export default {
    setup() {
      const route = useRoute();
      const drink = ref(null);
      const store = useFavoritesStore();
  
      const fetchDrink = async () => {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
        drink.value = data.drinks[0];
      };
  
      fetchDrink();
  
      const ingredients = computed(() => {
        if (!drink.value) return [];
        return Array.from({ length: 15 }, (_, i) => drink.value[`strIngredient${i + 1}`]).filter(Boolean);
      });
  
      const isFavorite = computed(() => store.favorites.some(d => d.idDrink === drink.value?.idDrink));
      const toggleFavorite = () => store.toggleFavorite(drink.value);
  
      return { drink, ingredients, isFavorite, toggleFavorite };
    }
  };
  </script>