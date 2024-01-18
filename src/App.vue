<script>
import Header from './components/Header.vue';
import SectionTitle from './components/SectionTitle.vue';
import UserList from './components/UserList.vue';
import AddUser from './components/AddUser.vue';
import { mapState } from 'vuex';
import UserDetails from './components/UserDetails.vue';

import Filters from './components/Filters.vue';

export default {
  computed: {
    ...mapState('common', {
      addUserForm: (state) => state.addUserForm,
      detailsForm: (state) => state.detailsForm,
    }),
  },

  components: {
    Header,
    SectionTitle,
    UserList,
    AddUser,
    UserDetails,
    Filters,
  },
};
</script>

<template>
  <Header />

  <SectionTitle />
  <Filters />

  <UserList />

  <my-modal :isOpen="addUserForm">
    <AddUser />
  </my-modal>

  <my-modal :isOpen="detailsForm">
    <UserDetails />
  </my-modal>
</template>

<style scoped></style>
