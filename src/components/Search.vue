<template>
  <div>
    <div class="search-container">
      <form id="search-input-container"
            @submit.prevent="searchMedia"
            @keyup.enter.native="searchMedia">
        <md-field>
          <label>
            search media
          </label>
          <md-input required name="query"/>
        </md-field>
        <div id="search-button">
          <md-button class="md-icon-button md-accent"
                     type="submit">
            <md-icon class="md-size-2x">search</md-icon>
          </md-button>
        </div>
      </form>
    </div>
    <md-progress-bar v-if="loading" md-mode="query"></md-progress-bar>
    <media-tabs v-if="searchResults != null" :home="false" :kinds="kinds" :searchResults="searchResults"
                @saveMedia="saveMedia" @unsaveMedia="unsaveMedia"/>
  </div>
</template>

<script>
  import MediaTabs from '@/components/MediaTabs';

  export default {
    name: 'Search',
    data() {
      return {
        searchResults: null,
        kinds: null,
        loading: false,
      }
    },
    methods: {
      searchMedia(e) {
        e.preventDefault();
        const query = e.target.elements.query.value.split(' ').join('+');
        const api = `http://localhost:3000/api/v1/itunes/search`;
        const url = `${api}/${query}`;
        this.loading = true;
        fetch(url, { method: 'POST' })
          .then(resp => resp.json())
          .then(result => {
            this.kinds = Object.keys(result);
            this.searchResults = result;
            this.loading = false;
          })
          .catch(err => console.log(err));
      },
      saveMedia(media) {
        this.$emit('saveMedia', media);
      },
      unsaveMedia(media) {
        this.$emit('unsaveMedia', media);
      }
    },
    components: {
      MediaTabs
    }
  }
</script>

<style>
  @media screen and (max-width: 600px) {
    .search-container {
      height: 58px;
      position: sticky;
      top: 56px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
    }
  }

  @media screen and (max-width: 959px) and (min-width: 600px) {
    .search-container {
      height: 58px;
      position: sticky;
      top: 48px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
    }
  }

  @media screen and (min-width: 960px) {
    .search-container {
      height: 58px;
      position: sticky;
      top: 64px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
    }
  }

  #search-input-container {
    display: flex;
    flex-direction: row;
    width: 50vw;
    margin: auto;
    height: 54px;
  }

  #search-button {
    margin-top: 16px;
  }
</style>