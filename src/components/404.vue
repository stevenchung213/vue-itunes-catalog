<template>
  <div id="four04-container">
    <div class="four04-header">
      <h1 class="four04-text">404</h1>
      <h2 class="four04-text four04-sub">Page Not Found</h2>
    </div>
    <div class="four04-header">
      <h2 class="four04-text"><i>{{url}}</i></h2>
      <h3 class="four04-text four04-sub">is not a valid path</h3>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: '',
        timer: 3
      }
    },
    created() {
      setInterval(this.countDown, 1000);
    },
    mounted() {
      this.url = window.location.pathname;
    },
    method: {
      countDown() {
        console.log('test');
        if (this.timer === 0) {
          this.$router.push('/')
        }
        this.timer -= 1;
      }
    }
  }
</script>
<style scoped>
  #four04-container {
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }

  .four04-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5vh;
  }

  .four04-text {
    width: fit-content;
    text-align: center;
    margin: 0;
  }

  .four04-sub {
    margin-left: 20px;
    line-height: 25px;
  }

  .four04-body {

  }
</style>