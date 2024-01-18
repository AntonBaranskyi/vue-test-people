<template>
  <div class="modal" v-if="isOpen" @click="onHandleCloseAll">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'my-modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions({
      onToggleAddModal: 'common/onToggleAddModal',
      onToggleDetailsForm: 'common/onToggleDetailsForm',
    }),

    onHandleCloseAll() {
      this.onToggleAddModal(false);
      this.onToggleDetailsForm({ bool: false, user: null });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  position: fixed;

  background: rgba(0, 0, 0, 0.5);

  display: flex;

  &__content {
    margin: auto;

    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
