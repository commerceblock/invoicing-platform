<template>
  <div class="content">
    <div class="title">copy about how you need to </div>
    <div class="description">In order to complete the transaction please upload the signed contract</div>
    <div class="upload-files">
        <div><i class="fa fa-file-text-o"></i></div>
        <button class="pure-button">Upload signed contract</button>
        <div>or drag the content here</div>
    </div>
  </div>
</template>


<script>


</script>

<style scoped lang="scss">
  .content {
    color: #141414;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    padding: 50px 10px;

    .title {
      color: #141414;
      font-family: "Open Sans";
      font-size: 16px;
      font-weight: 600;
    }

    .description {
      color: #141414;
      font-family: "Open Sans";
      font-size: 14px;
    }

    .upload-files {
      padding: 40px;
      border: 2px dotted #979797;

      .fa-file-text-o {
        font-size: 90px;
        color: #BFBFBF;
      }

      button {
        margin: 15px 0
      }
    }
  }

</style>
