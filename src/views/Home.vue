<template>
  <div id="board" style="height: 100%; width: 100%;"></div>
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
