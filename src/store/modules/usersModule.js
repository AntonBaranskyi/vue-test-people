import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../../api/userApi';

export const usersModule = {
  state: () => ({
    users: [],
    usersLoading: false,
    deletingLoading: [],
    searchQuery: '',
    sortedField: '',
  }),
  getters: {
    searchedUsers(state) {
      if (state.searchQuery) {
        return state.users.filter((user) => {
          if (user.first_name && user.last_name) {
            const fullName = user.first_name + ' ' + user.last_name;
            return fullName
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase());
          } else {
            return user.fullName
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase());
          }
        });
      }
      return state.users;
    },

    searchedAndSortedUsers(state, getters) {
      const copyUser = [...getters.searchedUsers];

      if (state.sortedField) {
        copyUser.sort((a, b) => {
          switch (state.sortedField.code) {
            case 'name-asc':
              return a.first_name.localeCompare(b.first_name);
            case 'name-desc':
              return b.first_name.localeCompare(a.first_name);
            case 'email-asc':
              return a.email.localeCompare(b.email);
            case 'email-desc':
              return b.email.localeCompare(a.email);
          }
        });
      }

      return copyUser;
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = [...users];
    },
    setLoading(state, bool) {
      state.usersLoading = bool;
    },
    addDeletingLoading(state, id) {
      state.deletingLoading = [...state.deletingLoading, id];
    },

    setDeletingLoading(state, ids) {
      state.deletingLoading = ids;
    },

    clearDeletingLoading(state, ids) {
      state.deletingLoading = [...ids];
    },

    updateUser(state, { index, user }) {
      state.users.splice(index, 1, user);
    },

    setSearchQuery(state, query) {
      state.searchQuery = query;
    },

    setSortQuery(state, sortQuery) {
      state.sortedField = sortQuery;
    },
  },
  actions: {
    onGetUsers({ commit }) {
      commit('setLoading', true);

      getAllUsers()
        .then((answ) => {
          commit('setUsers', answ.data);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },

    onDeleteUser({ commit, state }, id) {
      commit('addDeletingLoading', id);

      deleteUser(id)
        .then(() => {
          const filteredUsers = state.users.filter((user) => user.id !== id);

          commit('setUsers', filteredUsers);
        })
        .finally(() => {
          const idsLeft = state.deletingLoading.filter((ids) => ids !== id);

          commit('setDeletingLoading', idsLeft);
        });
    },

    onCreateUser({ commit, state }, data) {
      createUser(data).then((resp) => {
        const newUserList = [resp, ...state.users];
        commit('setUsers', newUserList);
      });
    },

    onUpdateUser({ commit, state }, { id, data }) {
      updateUser({ id, data }).then((resp) => {
        const userIndex = state.users.findIndex((user) => user.id === id);

        if (userIndex !== -1) {
          const updatedUser = { ...state.users[userIndex], ...resp };
          commit('updateUser', { index: userIndex, user: updatedUser });
        }
      });
    },

    onChangeSearchQuery({ commit }, term) {
      commit('setSearchQuery', term);
    },

    onChangeSortQuery({ commit }, query) {
      commit('setSortQuery', query);
    },
  },
  namespaced: true,
};
