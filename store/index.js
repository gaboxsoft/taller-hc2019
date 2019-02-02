
export const state = () => ({
  token: 'NONE',
  pacienteId: 'NONE',
  notaUrgenciasId: 'NONE',
  evolucionId: 'NONE',
  socketNotasUrgencias: true,
  socketEvolucion: true
});


export const getters = () => ({
  getToken(state) {
    return state.token;
  },
  getNotaUrgenciasId(state) {
    return state.notaUrgenciasId;
  },
  getEvolucionId(state) {
    return state.evolucionId;
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
  setEvolucionId(state, payload) {
    state.evolucionId = payload;
  },
  setPacienteId(state, payload) {
    state.pacienteId = payload;
  },
  setSocketNotasUrgencias(state) {
    state.socketNotasUrgencias = !state.socketNotasUrgencias;
  },
  setSocketEvolucion(state) {
    console.log('En setSocketNotasUrgencias->antes ', state.socketEvolucion);
    state.socketEvolucion = !state.socketEvolucion;
    console.log('En setSocketNotasUrgencias->despues ', state.socketEvolucion);
  }
};


