<template>
  <div class="vue-dev-overlay-tag">
    <p class="title">vue-dev-plugin</p>
    <p>Ctrl + Hover/Click</p>
  </div>
</template>

<script>
export default {
  name: 'OverlayTag',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .vue-dev-overlay-tag {
    position: fixed;
    z-index: 9999999999;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, .4);
    color: #444;
    border: 1px solid green;
    padding: 10px;
    font-size: 18px;
    pointer-events: none;
    line-height: 28px;
    border-radius: 5px 0px 0px 5px;
    opacity: 0.1;
    p {
      margin: 0;
    }
    .title {
      font-size: 12px;
      text-align: center;
    }
  }
</style>
