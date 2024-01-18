<template>
  <div class="filters">
    <div class="container filters__container">
      <h3>Filters</h3>

      <div class="filters__input">
        <input
          type="search"
          placeholder="Write name to find"
          class="input input-search"
          @input="onSearchQueryChange"
          v-model="searchQuery"
        />
      </div>

      <div class="filters__select">
        <v-select
          v-model="selectedValue"
          @update:modelValue="onSortQueryChange"
          :options="[
            { label: 'Name [A-Z]', code: 'name-asc' },
            { label: 'Name [Z-A]', code: 'name-desc' },
          ]"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      searchQuery: '',
      selectedValue: 'Choose select option',
    };
  },

  methods: {
    ...mapActions({
      onChangeSearchQuery: 'users/onChangeSearchQuery',
      onChangeSortQuery: 'users/onChangeSortQuery',
    }),
    onSearchQueryChange() {
      this.onChangeSearchQuery(this.searchQuery);
    },

    onSortQueryChange() {
      console.log('HELLO');
      this.onChangeSortQuery(this.selectedValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/input.scss';

.filters {
  margin-bottom: 40px;
  &__container {
    display: flex;
    align-items: center;

    gap: 25px;
  }

  &__select {
    width: 250px;
  }
}
</style>
