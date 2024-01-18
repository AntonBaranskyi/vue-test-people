<template>
  <div class="add-user">
    <h3 class="add-user__title">Add new user</h3>

    <form @submit.prevent="handleSubmitForm">
      <div class="add-user__inputs">
        <div class="add-user__input">
          <h5 class="add-user__label">Full name</h5>
          <input
            type="text"
            placeholder="Write your name"
            class="add-user__input-item input"
            v-model="fullName"
            @blur="validateFullName"
          />

          <p v-if="touched.fullName && errors.fullName" class="text-danger">
            {{ errors.fullName }}
          </p>
        </div>

        <div class="add-user__input">
          <h5 class="add-user__label">Email</h5>

          <input
            type="email"
            placeholder="Write your Email"
            class="add-user__input-item input"
            v-model="email"
            @blur="validateEmail"
          />
          <p v-if="touched.email && errors.email" class="text-danger">
            {{ errors.email }}
          </p>
        </div>
      </div>
      <div class="add-user__btn-wrapper">
        <button
          class="btn add-user__btn"
          type="submit"
          :disabled="hasErrors || !email || !fullName"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      fullName: '',
      email: '',

      touched: {
        fullName: false,
        email: false,
        password: false,
      },

      errors: {
        fullName: '',
        email: '',
      },
    };
  },
  methods: {
    ...mapActions({
      onCreateUser: 'users/onCreateUser',
    }),

    ...mapActions({
      onToggleAddModal: 'common/onToggleAddModal',
    }),

    validateFullName() {
      this.touched.fullName = true;
      this.errors.fullName =
        this.fullName && this.fullName.length >= 3
          ? ''
          : 'Full name is required.';
    },

    validateEmail() {
      this.touched.email = true;
      if (this.email) {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.errors.email = emailPattern.test(this.email)
          ? ''
          : 'Invalid email format.';
      } else {
        this.errors.email = 'Email is required.';
      }
    },

    handleSubmitForm() {
      this.onCreateUser({ email: this.email, fullName: this.fullName });

      this.onResetForm();
      this.onToggleAddModal(false);
    },

    onResetForm() {
      this.fullName = '';
      this.email = '';
    },
  },

  computed: {
    hasErrors() {
      return !!(this.errors.email || this.errors.fullName);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-user {
  padding: 25px;

  width: 500px;

  &__btn {
    height: 40px;

    width: 80px;
  }

  &__title {
    margin-bottom: 25px;

    text-align: center;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-bottom: 10px;
  }

  &__label {
    font-size: 16px;
    margin-bottom: 2px;
  }

  &__btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__input-item {
    width: 100%;
  }
}

@import '../styles/input.scss';
@import '../styles/button.scss';

.text-danger {
  color: #ff0000;
  font-size: 14px;

  font-weight: 300;

  margin-top: 2px;
}
</style>
