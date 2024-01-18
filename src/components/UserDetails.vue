<template>
  <div class="user-details">
    <div class="user-details__photo">
      <img
        v-if="currentUser.avatar"
        :src="currentUser.avatar"
        alt="user_photo"
        class="user-details__photo-item"
      />
      <img
        v-else
        src="../assets/images/default.png"
        alt="user_photo"
        class="user-details__photo-item"
      />
    </div>

    <div class="user-details__info">
      <p
        class="user-details__name"
        v-if="currentUser.first_name || currentUser.last_name"
      >
        {{ currentUser.first_name + ' ' + currentUser.last_name }}
      </p>

      <p class="user-details__name" v-else>
        {{ currentUser.fullName }}
      </p>

      <a href="#" class="user-details__email">{{ currentUser.email }}</a>
    </div>
    <form @submit.prevent="onHandleUpdateUser">
      <div class="user-details__more">
        <h5 class="add-user__label">Phone number</h5>
        <input
          type="number"
          class="input"
          placeholder="Write your phone number"
          v-model="currentUser.phoneNumber"
          @blur="validatePhoneNumber"
        />
        <p v-if="touched.phoneNumber && errors.phoneNumber" class="text-danger">
          {{ errors.phoneNumber }}
        </p>
      </div>

      <div class="user-details__more">
        <h5 class="add-user__label">Adress</h5>
        <input
          type="text"
          class="input"
          placeholder="Write your adress"
          v-model="currentUser.adress"
          @blur="validateAdress"
        />

        <p v-if="touched.adress && errors.adress" class="text-danger">
          {{ errors.adress }}
        </p>
      </div>

      <div class="user-details__btn-wrapper">
        <button
          class="btn user-details__btn exit"
          @click="onToggleDetailsForm({ bool: false, user: null })"
        >
          Exit
        </button>
        <button
          class="btn user-details__btn"
          type="submit"
          :disabled="hasErrors"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      touched: {
        adress: '',
        phoneNumber: '',
      },

      errors: {
        adress: '',
        phoneNumber: '',
      },
    };
  },

  methods: {
    ...mapActions({
      onUpdateUser: 'users/onUpdateUser',
      onToggleDetailsForm: 'common/onToggleDetailsForm',
    }),

    onHandleUpdateUser() {
      this.$nextTick(() => {
        const objToSend = {
          adress: this.adress,
          phoneNumber: this.phoneNumber,
          ...this.currentUser,
        };

        this.onUpdateUser({ id: this.currentUser.id, data: objToSend });

        this.onToggleDetailsForm({ bool: false, user: null });
      });
    },
    validatePhoneNumber() {
      this.touched.phoneNumber = true;

      if (this.phoneNumber) {
        const phonePattern =
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

        this.errors.phoneNumber = phonePattern.test(this.phoneNumber)
          ? ''
          : 'Invalid phone number';
      }
    },

    validateAdress() {
      this.touched.adress = true;
      this.errors.adress =
        this.adress && this.adress.length >= 5
          ? ''
          : 'Adress should be more than 5 letters.';
    },
  },

  watch: {
    'currentUser.adress'(newVal) {
      this.adress = newVal;
    },
    'currentUser.phoneNumber'(newVal) {
      this.phoneNumber = newVal;
    },
  },

  computed: {
    ...mapState('common', {
      currentUser: (state) => state.currentUser,
    }),

    hasErrors() {
      return !!(this.errors.phoneNumber || this.errors.adress);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-details {
  padding-block: 25px;

  padding-inline: 20px;

  width: 500px;

  &__photo {
    display: flex;
    justify-content: center;
    &-item {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: contain;

      border: 2px solid rgba(0, 0, 0, 0.1);

      margin-bottom: 10px;
    }
  }

  &__name {
    text-align: center;
  }

  &__email {
    text-decoration: none;
    font-size: 16px;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;

    margin-bottom: 40px;
  }

  &__more {
    display: flex;
    flex-direction: column;

    gap: 10px;

    margin-bottom: 15px;
  }

  &__btn-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    height: 40px;

    width: 80px;
  }
}

.text-danger {
  color: #ff0000;
  font-size: 14px;

  font-weight: 300;

  margin-top: 2px;
}

.exit {
  background-color: red !important;
  color: white;
}

@import '../styles/input.scss';
@import '../styles/button.scss';
</style>
