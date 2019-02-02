
export const state = () => ({
  token: 'NONE',
  pacienteId: 'NONE',
  notaUrgenciasId: 'NONE',
  socketNotasUrgencias: true
});


export const getters = () => ({
  getToken(state) {
    return state.token;
  },
  getNotaUrgenciasId(state) {
    return state.notaUrgenciasId;
  },
  getPacienteId(state) {
    return state.notaUrgenciasId;
  },
  getSocketNotasUrgencias(state) {
    return state.socketNotasUrgencias;
  }
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setNotaUrgenciasId(state, payload) {
    state.notaUrgenciasId = payload;
  },
  setPacienteId(state, payload) {
    state.pacienteId = payload;
  },
  setSocketNotasUrgencias(state) {
    console.log('En setSocketNotasUrgencias->antes ', state.socketNotasUrgencias);
    state.socketNotasUrgencias = !state.socketNotasUrgencias;
    console.log('En setSocketNotasUrgencias->despues ', state.socketNotasUrgencias);
  }
};


