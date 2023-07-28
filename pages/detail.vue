<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="gap-4 d-flex">
      <div class="parent pt-20 w-twoth mx-auto">
        <div v-for="(news, index) in newsDetail" :key="index">
          <h1>
            <div class="d-flex justify-between items-center">
              <x-base-input
                v-if="isEdit"
                class="w-oneth h-24 title"
                type="text"
                :value="news.judul"
              />
              <div v-else class="text-4xl">
                {{ news.judul }}
              </div>
              <div
                class="edit bg-blue-500 text-neutral-50 p-4 hover:text-blue-900 cursor-pointer"
                @click="toggleEdit"
              >
                <div v-if="isEdit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"
                    />
                  </svg>
                  <span>Save</span>
                </div>
                <div v-else>
                  <svg
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                    />
                  </svg>
                  <span>Edit</span>
                </div>
              </div>
            </div>
          </h1>
          <div v-if="isEdit" class="d-flex">
            <img :src="news.poster" class="w-half d-block">
            <x-base-input
              class="w-full d-block ml-5"
              type="file"
              label="Upload New Image"
            />
          </div>
          <img v-else :src="news.poster" class="w-full d-block">

          <rich-text v-if="isEdit" v-model="news.body" class="mt-4" />
          <div
            v-else
            class="py-5"
            style="white-space: pre-line"
            v-html="news.body"
          />
        </div>
      </div>
      <div class="w-112 h-full bg-neutral-200 pt-20 pb-5 px-5">
        <h2>TERPOPULER</h2>
        <hr>
        <div v-for="(item, index) in news" :key="index">
          <x-base-news :news="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, route, $config }) {
    const detailNewsUrl =
      $config.apiUrl + `/detail/?url=${decodeURI(route.query.url)}`;
    const newsUrl = $config.apiUrl + '/nasional';
    try {
      // The correct way to call multiple requests more efficiently.
      const response = await Promise.all([
        $axios.$get(detailNewsUrl),
        $axios.$get(newsUrl)
      ]);

      return {
        newsDetail: response[0].data,
        news: response[1].data.slice(0, 10)
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
      return {
        newsDetail: {}
      };
    }
  },
  data () {
    return {
      isEdit: false
    };
  },
  methods: {
    toggleEdit () {
      this.isEdit = !this.isEdit;
    }
  }
};
</script>
