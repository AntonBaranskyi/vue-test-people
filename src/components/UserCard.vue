<template>
  <div class="card">
    <div class="card__photo">
      <img
        v-if="user.avatar"
        :src="user.avatar"
        alt="user_photo"
        class="card__photo-item"
      />
      <img
        v-else
        src="../assets/images/default.png"
        alt="user_photo"
        class="card__photo-item"
      />
    </div>

    <div @click="onHandleOpenUserDetails" style="cursor: pointer">
      <p class="card__name" v-if="user.first_name || user.last_name">
        {{ user.first_name + ' ' + user.last_name }}
      </p>

      <p class="card__name" v-else>
        {{ user.fullName }}
      </p>
    </div>
    <a href="#" class="card__email">{{ user.email }}</a>

    <div class="card__delete" @click="onDeleteUser(user.id)">
      <img src="../assets/icons/delete.png" alt="delete" class="icon-lg" />
    </div>

    <div class="loading" v-if="deletingLoading.includes(user.id)">
      <div class="loading-overlay">
        <img src="../assets/icons/spinner.svg" alt="spinner" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
    ...mapActions({
      onDeleteUser: 'users/onDeleteUser',
      onToggleDetailsForm: 'common/onToggleDetailsForm',
    }),

    onHandleOpenUserDetails() {
      this.onToggleDetailsForm({ bool: true, user: this.user });
    },
  },
  computed: {
    ...mapState('users', {
      deletingLoading: (state) => state.deletingLoading,
    }),
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;

  &__photo-item {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: contain;

    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  &__name {
    font-size: 24px;
    margin: 0;
  }

  &__email {
    text-decoration: none;
    font-size: 16px;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }

  &__delete {
    cursor: pointer;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
