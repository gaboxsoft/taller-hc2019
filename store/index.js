
export const state = () => ({
  token: 'NONE',
  pacienteId: 'NONE',
  notaUrgenciasId: 'NONE',
  evolucionId: 'NONE',
  socketNotasUrgencias: true,
  socketEvolucion: true,
  socketDatosGenerales: true,
  host: 'NONE',
  port: 0
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
  },
  getSocketDatosGenerales(state) {
    return state.socketDatosGenerales;
  },
  getServer(state) {
    return state.host+':'+state.port;
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
  setSocketDatosGenerales(state) {
    state.socketDatosGenerales = !state.socketDatosGenerales;
  },
  setSocketEvolucion(state) {
    state.socketEvolucion = !state.socketEvolucion;
  },
  setHost(state,payload) {
    state.host = payload;
  },
  setPort(state, payload) {
    state.port = payload;
  }
};


