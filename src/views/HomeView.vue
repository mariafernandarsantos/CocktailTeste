<template>
  <div>
    <h1 class="title-text">Drinks</h1>
    <input class="search-bar" v-model="search" placeholder="Buscar drink..." />  
    <div class="alphabet">
      <button v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')" :key="letter" @click="fetchDrinksByLetter(letter)">
        {{ letter }}
      </button>
    </div>
    <div class="categories">
      <button v-for="category in categories" :key="category" @click="fetchDrinksByCategory(category)">
        {{ category }}
      </button>
    </div>
    <div class="drinks">
      <div class="drinks-text" v-for="drink in drinks" :key="drink.idDrink" @click="$router.push(`/drink/${drink.idDrink}`)">
        <img :src="drink.strDrinkThumb" :alt="drink.strDrink" />
        <h3>{{ drink.strDrink }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      search: '',
      drinks: [],
      categories: []
    };
  },
  methods: {
    async fetchDrinksByLetter(letter) {
      const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      this.drinks = data.drinks || [];
    },
    async fetchCategories() {
      const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      this.categories = data.drinks.map(d => d.strCategory);
    },
    async fetchDrinksByCategory(category) {
      const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      this.drinks = data.drinks || [];
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>