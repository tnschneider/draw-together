<template>
  <div class="container">
    <div id="board" class="board"></div>  
  </div>
</template>

<script>
import DrawingBoard from '@/models/DrawingBoard.js';

export default {
  name: 'Home',
  mounted() {
    new DrawingBoard("#board");
  }
}
</script>
<style>
  .container {
    display: flex; 
    flex: 1; 
    justify-content: center; 
    align-items: center;
  }
  .board {
    height: 700px;
    width: 1000px;
    position: relative;
  }
</style>
