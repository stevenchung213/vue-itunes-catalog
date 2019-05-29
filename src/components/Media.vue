<template>
  <md-card class="media-cards">
    <md-card-header>

      <md-card-header-text class="media-header">
        <div class="md-subhead artist">{{media.name}}</div>
        <div class="md-body-2 track">{{media.track}}</div>
        <br/>
        <div class="md-caption">{{media.genre}}</div>
        <a :href="media.url" target="_blank">Link</a>
      </md-card-header-text>

      <md-card-media id="media-card-image-container">
        <img id="media-card-image"
             :src="media.artwork" :alt="media.track">
        <div class="media-card-actions">
          <div class="action-buttons">
            <div v-if="media.hearted" @click="deleteMedia">
              <md-icon>delete_outline</md-icon>
            </div>
            <div v-else @click="heartMedia">
              <md-icon>favorite_outline</md-icon>
            </div>
          </div>
        </div>
      </md-card-media>

    </md-card-header>
  </md-card>
</template>

<script>
  export default {
    props: [
      'media',
      'kind',
      'home'
    ],
    data() {
      return {
        saved: this.home
      }
    },
    methods: {
      heartMedia(e) {
        if (e.target.style.color === 'red') {
          e.target.childNodes[0].data = 'favorite_outline';
          e.target.style.color = '';
          this.$emit('unsaveMedia', [this.kind, this.media]);
        } else {
          e.target.childNodes[0].data = 'favorite';
          e.target.style.color = 'red';
          this.$emit('saveMedia', [this.kind, this.media]);
        }
      },
      deleteMedia() {
        this.$emit('unsaveMedia', [this.kind, this.media])
      }
    }
  }
</script>

<style>
  .media-cards {
    height: 150px;
    width: 300px;
    margin-bottom: 5px;
  }

  .media-header {
    padding-right: 10px;
  }

  .artist {
    height: 20px;
    overflow: hidden;
  }

  .track {
    height: 48px;
    overflow: hidden;
  }

  #media-card-image-container {
    height: 100px;
    width: 100px;
    margin: 0;
  }

  .media-card-actions {
    width: 80px;
    display: flex;
    flex-direction: row;
    padding-top: 20px;
  }

  .action-buttons {
    cursor: pointer;
    margin-left: auto;
  }

</style>