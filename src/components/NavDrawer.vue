<template>
  <div class="page-container md-layout-row">
    <md-app>

      <md-app-toolbar class="md-accent header">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">iTunes Catalog</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0"/>
        <md-list>
          <md-divider/>
          <router-link to="/" exact>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">My Media</span>
            </md-list-item>
          </router-link>
          <router-link to="/search">
            <md-list-item>
              <md-icon>search</md-icon>
              <span class="md-list-item-text">Search</span>
            </md-list-item>
          </router-link>
          <md-divider/>
          <md-list-item @click="deleteAll">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Delete All</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content class="content-container">
        <div id="route-container">
          <router-view :localMedia="localMedia" :kinds="kinds"
                       @saveMedia="saveMedia" @unsaveMedia="unsaveMedia"/>
          <!--                       @deleteMedia="deleteMedia"-->
        </div>
      </md-app-content>

    </md-app>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuVisible: true,
        kinds: null,
        localMedia: null,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.menuVisible = document.documentElement.clientWidth >= 600;
      });
      if (localStorage.getItem('vue-itunes') !== null) {
        this.kinds = Object.keys(JSON.parse(localStorage.getItem("vue-itunes")));
        this.localMedia = JSON.parse(localStorage.getItem("vue-itunes"));
      }
    },
    methods: {
      saveMedia(media) {
        media[1].hearted = true;
        if (localStorage.getItem('vue-itunes') == null) {
          const newLocalData = {
            [media[0]]: [media[1]]
          };
          localStorage.setItem('vue-itunes', JSON.stringify(newLocalData));
          this.localMedia = newLocalData;
          this.kinds = [media[0]];
        } else {
          const localData = JSON.parse(localStorage.getItem('vue-itunes'));
          if (localData.hasOwnProperty(media[0])) {
            if (!JSON.stringify(localData[media[0]]).includes(media[1].url)) {
              localData[media[0]].push(media[1]);
            }
          } else {
            localData[media[0]] = [media[1]];
            this.kinds.push(media[0]);
          }
          localStorage.setItem('vue-itunes', JSON.stringify(localData));
          this.localMedia = localData;
        }
      },
      unsaveMedia(media) {
        const localData = { ...this.localMedia };
        if (localData[media[0]].length === 1) {
          delete localData[media[0]];
          if (this.kinds.length === 1) {
            this.kinds = null;
          } else {
            this.kinds.splice(this.kinds.indexOf(media[0]), 1);
          }
        } else {
          const filteredData = localData[media[0]].filter(item => item.url !== media[1].url);
          localData[media[0]] = filteredData;
        }
        if (Object.keys(localData).length === 0) {
          localStorage.removeItem('vue-itunes');
          this.localMedia = null;
        } else {
          localStorage.setItem('vue-itunes', JSON.stringify(localData));
          this.localMedia = localData;
        }
      },
      deleteAll() {
        localStorage.removeItem('vue-itunes');
        this.localMedia = null;
        this.kinds = null;
      },
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .md-app {
    border: 1px solid rgba(#000, .12);
    height: 100vh;
  }

  .header {
    position: sticky;
    z-index: 11;
  }

  .content-container {
    padding-top: 0;
  }

  .md-drawer {
    width: 180px;
    max-width: calc(100vw - 125px);
    border: 1px solid rgba(#000, .12);
  }
</style>