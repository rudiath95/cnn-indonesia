<template>
  <div>
    <div
      :class="'cursor-pointer h-14 font-weight-700 text-neutral-900 px-1 text-xl hover:text-red-800 pt-4 pb-2'"
      :title="news.judul"
      @click="goToDetail(news.link)"
    >
      {{ trimStr(news.judul, 80) }}
    </div>
    <img :src="news.poster" class="w-full d-block">
  </div>
</template>

<script>
import { trimText } from '@/utils/trimText';

export default {
  props: {
    news: {
      type: Object,
      default: () => {}
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
