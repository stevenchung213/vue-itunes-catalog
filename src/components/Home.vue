<template>
  <div id="home-container">
    <h1 id="no-media-msg" v-if="!localMedia">
      You have no saved media...
    </h1>
    <div v-else>
      <h1 id="my-saved-media">
        My Saved Media
      </h1>
      <media-tabs :home="true" :kinds="kinds" :myMedia="localMedia"
                  @unsaveMedia="unsaveMedia"/>
    </div>
  </div>
</template>
<script>
  import MediaTabs from "@/components/MediaTabs";

  export default {
    name: 'Home',
    props: [
      'localMedia',
      'kinds'
    ],
    methods: {
      unsaveMedia(media) {
        this.$emit('unsaveMedia', media);
      }
    },
    components: {
      MediaTabs
    }
  }
</script>
<style scoped>
  #home-container {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 600px) {
    #my-saved-media {
      height: 58px;
      position: sticky;
      top: 56px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
      text-align: center;
      margin: 0;
      padding-top: 26px;
      color: dimgrey;
    }
  }

  @media screen and (max-width: 959px) and (min-width: 600px) {
    #my-saved-media {
      height: 58px;
      position: sticky;
      top: 48px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
      text-align: center;
      margin: 0;
      padding-top: 26px;
      color: dimgrey;
    }
  }

  @media screen and (min-width: 960px) {
    #my-saved-media {
      height: 58px;
      position: sticky;
      top: 64px;
      background-color: rgba(255, 255, 255, 1);
      z-index: 10;
      text-align: center;
      margin: 0;
      padding-top: 26px;
      color: dimgrey;
    }
  }

  #no-media-msg {
    margin-top: 15vh;
    text-align: center;
    color: grey;
  }
</style>
