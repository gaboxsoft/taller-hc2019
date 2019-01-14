
export const state = () => ({
  token: '--NONE--',
  host: process.env.HOSTPORT
});


export const getters = () => ({
  getToken(state) {
    console.log('aquì en getter de token... ', state.token)
    return state.token;
  },
  getHost(state) {
    return state.host;
  }
});

export const mutations = {
  setToken(state, payload) {
    console.log('aquì en mutations.setToken token vale... ', state.token,' y payload es: ',payload);
    state.token = payload;
    console.log('aquì en mutations.setToken ahora token vale... ', state.token);

  }
};


