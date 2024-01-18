<template>
  <div class="container list">
    <div class="spinner" v-if="usersLoading">
      <img
        src="../assets/icons/spinner.svg"
        alt="spinner"
        class="spinner__item"
      />
    </div>
    <TransitionGroup name="list" v-else>
      <UserCard :user="user" :key="user._id" v-for="user in searchedAndSortedUsers" />
    </TransitionGroup>
  </div>
</template>

<script>
import UserCard from './UserCard.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    ...mapActions({
      onGetUsers: 'users/onGetUsers',
    }),
  },
  computed: {
    ...mapState('users', {
      users: (state) => state.users,
      usersLoading: (state) => state.usersLoading,
    }),
    ...mapGetters({
      searchedAndSortedUsers: 'users/searchedAndSortedUsers',
    }),
  },
  mounted() {
    this.onGetUsers();
  },

  components: { UserCard },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-bottom: 40px;
}

.spinner {
  display: flex;
  justify-content: center;

  &__item {
    height: 36px;
    width: 36px;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
