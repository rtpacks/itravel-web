<template>
  <div class="wrapper">
    <div class="content">
      <div style="position: relative; left: -80px"> <RegisterForm /> </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import RegisterForm from './components/register-form.vue';

  document.title = 'Itravel 注册页';
</script>

<style lang="less" scoped>
  .wrapper {
    display: flex;
    height: 100vh;
    background: url('../../assets/images/bg8.jpg') fixed no-repeat;
    background-size: cover;

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
