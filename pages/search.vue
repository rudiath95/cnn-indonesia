<template>
  <div>
    <div class="h-112 pt-12 d-flex">
      <div v-if="news.length > 0" class="w-twoth h-full mx-auto bg-neutral-50">
        <div
          class="bg-neutral-50 position-absolute top-96 p-5 cursor-pointer font-weight-700 text-neutral-900 px-1 text-3xl hover:text-red-800 py-4"
          :title="news[0].judul"
          @click="goToDetail(news[0].link)"
        >
          {{ trimStr(news[0].judul, 60) }}
        </div>
        <div class="h-full overflow-hidden">
          <img :src="news[0].poster" class="w-full">
        </div>
      </div>
      <div v-esle class="mt-20 mx-auto text-4xl">
        Berita tidak ditemukan.
      </div>
    </div>

    <div class="grid-rows-2 grid-cols-2 gap-10 mx-auto d-grid pt-5 w-twoth">
      <div v-for="(item, index) in news" :key="index">
        <x-base-news :news="item" class="pb-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { trimText } from '@/utils/trimText';

export default {
  async asyncData ({ $axios, $config, route }) {
    const apiUrl = $config.apiUrl + '/search/?q=' + route.query.search;
    try {
      const response = await $axios.$get(apiUrl);
      return {
        news: response.data
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
      return {
        news: []
      };
    }
  },
  methods: {
    goToDetail (url) {
      window.location.href = `/detail?url=${url}`;
    },
    trimStr (str, length) {
      return trimText(str, length || 20);
    }
  }
};
</script>
