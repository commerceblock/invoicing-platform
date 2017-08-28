<template>
  <div class="content">
    <div class="description">In order to complete the transaction please upload the signed contract</div>
    <div class="input-group form-group">
      <div v-if=errorResponse class="alert alert-danger" role="alert">
        <p>{{ errorResponse }}</p>
      </div>
      <div class="upload-files col-md-2 col-md-offset-2">
        <div>
          <i class="fa fa-file-text-o"></i>
        </div>
        <label class="btn btn-success btn-file">
          Upload contract files <input class="form-control contract-files-input" type="file" multiple="multiple" ref="contractFiles" />
        </label>
        <div>or drag the content here</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'UploadContract',
  props: ['errorResponse'],
}
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
    margin-bottom: 20px;
  }

  .upload-files {
    padding: 40px;
    width: 400px;
    text-align: center;
    border: 2px dotted #979797;

    .fa-file-text-o {
      font-size: 90px;
      color: #BFBFBF;
    }

    .btn-file {
      margin: 10px 0;
    }

    button {
      margin: 15px 0
    }
  }

  .contract-files-input {
    display: none;
  }
}
</style>
