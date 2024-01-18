<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo">
        <img src="../assets/icons/logo.png" alt="logo" class="logo" />
        <h2 class="title">People Test Task</h2>
      </div>

      <div class="header__info">
        <img src="../assets/icons/clock.png" alt="clock" class="icon" />
        <p class="header__info-current">{{ currentTime }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  created() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 60000);
  },
  data() {
    return {
      currentTime: this.getCurrentTime(),
    };
  },

  methods: {
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    },
    updateDateTime() {
      this.currentTime = this.getCurrentTime();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: lightblue;

  margin-bottom: 40px;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 4px;

    padding-block: 16px;

    cursor: pointer;
  }

  &__info {
    display: flex;
    align-items: center;

    gap: 12px;
  }
}

.logo {
  height: 48px;
  width: 48px;
}


</style>
