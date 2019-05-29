<template>
    <md-tabs class="md-secondary" md-alignment="fixed" :md-active-tab="kinds[0]">
      <md-tab v-for="(kind, i) in kinds"
              :id="kind"
              :key="`tab-${i}`" :md-label="`${kind}s`">
        <div v-if="!home" class="search-results-container">
          <media v-for="(media, i) in searchResults[kind]"
                 :key="`media-${i}`" :media="media" :kind="kind"
                 @saveMedia="saveMedia" @unsaveMedia="unsaveMedia"/>
        </div>
        <div v-else class="my-media-container">
          <media v-for="(media, i) in myMedia[kind]"
                 :key="`media-${i}`" :media="media" :kind="kind"
                 @unsaveMedia="unsaveMedia"/>
        </div>
      </md-tab>
    </md-tabs>
</template>

<script>
  import Media from '@/components/Media';

  export default {
    props: [
      'kinds',
      'searchResults',
      'home',
      'myMedia'
    ],
    components: {
      Media
    },
    methods: {
      saveMedia(media) {
        this.$emit('saveMedia', media)
      },
      unsaveMedia(media) {
        this.$emit('unsaveMedia', media)

      },
    }
  }
</script>

<style>
  @media screen and (max-width: 600px) {
    .md-tabs-navigation {
      position: sticky !important;
      top: 114px !important;
      z-index: 10;
      border-bottom: 1px solid lightgrey;
      padding-bottom: 10px;
    }
  }

  @media screen and (max-width: 959px) and (min-width: 600px) {
    .md-tabs-navigation {
      position: sticky !important;
      top: 106px !important;
      z-index: 10;
      border-bottom: 1px solid lightgrey;
      padding-bottom: 10px;
    }
  }

  @media screen and (min-width: 960px) {
    .md-tabs-navigation {
      position: sticky !important;
      top: 122px !important;
      z-index: 10;
      border-bottom: 1px solid lightgrey;
      padding-bottom: 10px;
    }
  }

  .search-results-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .my-media-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>