export default {
  state: {
    map: {},
    mapUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    zoom: 13,
    center: [33.590013, 72.965555],
    labels: false,
    selectedPlot: []
  },
  getters: {
    getMap: state => state.map,
    getMapUrl: state => state.mapUrl,
    getZoom: state => state.zoom,
    getCenter: state => state.center,
    getLabels: state => state.labels,
    getSelectedPlot: state => state.selectedPlot
  },
  mutations: {
    setMap: (state, payload) => (state.map = payload),
    setZoom: (state, payload) => (state.zoom = payload),
    setCenter: (state, payload) => (state.center = payload),
    setLabels: (state, payload) => (state.labels = payload),
    setSelectedPlot: (state, payload) => (state.selectedPlot = payload)
  },
  actions: {
    //
  }
};