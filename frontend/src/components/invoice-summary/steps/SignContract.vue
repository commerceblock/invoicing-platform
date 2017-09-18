<template>
  <div class="content">
    <div class="title">Please upload your contract below</div>
    <div class="description">By uploading the contract you are agreeing to the terms</div>
    <div class="upload-files">
        <div><i class="fa fa-file-text-o"></i></div>
        <label class="pure-button btn-file">
          Upload contract files
          <input class="form-control contract-files-input" type="file" multiple="multiple" ref="contractFiles" />
        </label>
        <!-- <button class="pure-button">Upload signed contract</button> -->
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

.contract-files-input {
  display: none;
}
@media (max-width: 650px), (max-height: 500px) {
  .content {
    padding: 1em 10px;
  }
}
</style>
