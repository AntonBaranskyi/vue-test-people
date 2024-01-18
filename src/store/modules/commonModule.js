export const commonModule = {
  state: () => ({
    addUserForm: false,
    detailsForm: false,

    currentUser: null,
  }),
  getters: {},
  mutations: {
    setUserAddForm(state, bool) {
      state.addUserForm = bool;
    },

    setDetailsForm(state, bool) {
      state.detailsForm = bool;
    },

    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    onToggleAddModal({ commit }, bool) {
      commit('setUserAddForm', bool);
    },

    onToggleDetailsForm({ commit }, { bool, user }) {
      commit('setDetailsForm', bool);
      commit('setCurrentUser', user);
    },

    
  },
  namespaced: true,
};
