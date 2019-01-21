
export const state = () => ({
  token: 'NONE',
  host: process.env.HOSTPORT,
  pacienteId: 'NONE',
  currentPaciente: {}
});


export const getters = () => ({
  getToken(state) {
    return state.token;
  },
  getHost(state) {
    return state.host;
  },
  getPaciente(state) {
    return state.host;
  }
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setPacienteId(state, payload) {
    state.pacienteId = payload;
  },
  setCurrentPaciente(state, payload) {
    //console.log('aquí en this.setCurrentPaciente payload=',payload )
    state.currentPaciente = payload;
    //console.log('aquí en this.setCurrentPaciente ahora currentPaciente=', state.currentPaciente)
  }
};


