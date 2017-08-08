<template>
  <div class="header">
    <div class="top">
      <div>
        <img class="commerce-block-white-bg" src="../../assets/white-logo.png" />
        <span class="commerce-block-green">
          <img src="../../assets/comany-name.svg" />
        </span>
      </div>
      <img class="icon-lock-green" src="../../assets/icon-lock-green.svg" />
    </div>
    <div class="invoice-data">
      <div class="invoice-id">Inovice #ID-000004</div>
      <div class="invoice-date">Date: 29/7/17</div>
    </div>
  </div>
</template>

<script>


</script>

<style scoped lang="scss">
  .header {
    border-radius: 3px 3px 0 0;
    background-color: #258C42;
    color: #ffffff;
    padding: 5px;

    .top {
      display: flex;
      justify-content: space-between;
    }

    .invoice-data {
      color: #FFFFFF;
      font-family: "Open Sans";
      text-align: center;
      margin: 10px;

      .invoice-id {
        font-size: 24px;
        font-weight: bold;
      }

      .invoice-date {
        color: #C4E0CC;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .icon-lock-green {
      /* height: 2.15%; */
      /* width: 1.6%; */
      /* opacity: 0.25; */
    }

    .commerce-block-green {
      margin-top: -5px;
    }

    .commerce-block-white-bg {
      /* height: 24px; */
      /* width: 32px; */
      /* opacity: 0.25; */
    }
  }

</style>
