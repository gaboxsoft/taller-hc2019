//import Vuex from 'vuex'

export const state = () => ({
  usuarioVacio: { nombres: '', paterno: '', materno: '', email: '', password: '' },
  usuarioLogin: { nombres: '', paterno: '', materno: '', email: '', password: '' },
  token: '12344556',
  HOSTPORT: process.env.HOSTPORT
});
export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setUsuarioLogin(state, payload) {
    state.usuarioLogin = payload;
  }
};


