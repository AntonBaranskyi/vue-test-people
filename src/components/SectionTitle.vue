<template>
  <div class="container container-mb">
    <div class="section-title">
      <h5 class="section-title__title">List of users</h5>
      <img
        src="../assets/icons/add_user.png"
        alt="addUser"
        class="icon-lg section-title_add"
        @click="onToggleAddModal(true)"
      />
    </div>
    <hr />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      onToggleAddModal: 'common/onToggleAddModal',
    }),
  },
};
</script>

<style lang="scss" scoped>
.section-title {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  &__title {
    text-transform: uppercase;

    font-size: 36px;
  }

  &_add {
    cursor: pointer;
  }
}
</style>
