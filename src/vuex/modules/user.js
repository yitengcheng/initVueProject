const state = {
    user: ''
};

// mutations
const mutations = {
    updateUser (state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
