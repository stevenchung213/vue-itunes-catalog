<template>
  <div id="main-container">
    <Nav>
      <router-view/>
    </Nav>
  </div>
</template>

<script>
  import Nav from '@/components/NavDrawer';

  export default {
    name: 'Main',
    components: {
      Nav
    }
  };
</script>

<style>
  #main-container {
    height: 100vh;
    width: auto;
  }
</style>