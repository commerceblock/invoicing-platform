<template>
  <div class="content">
    <!-- <p>Copy about the origin of this document</p> -->
    <img src="/static/assets/file-commerceblock.svg" />
    <h2>{{ fileName }}</h2>
    <a :href="fileUrl" class="pure-button" target="_blank">Download Invoice</a>
    <div class="backup-invoice">
      <!-- <a href="#">Backup Invoice</a> -->
    </div>
  </div>
</template>


<script>
export default {
  name: 'DownloadContract',
  props: ['fileName', 'fileUrl'],
  computed: {
  },
}
</script>

<style scoped lang="scss">
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 50px;

  button {
    margin: 10px 0;
  }

  .backup-invoice {
    color: #258C42;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;
    text-align: center;

    a:link, a:visited, a:hover, a:active {
      color: #258C42;
    }
  }
}
@media (max-width: 650px), (max-height: 500px) {
  .content {
    padding: 1em 0;
  }
}
</style>
