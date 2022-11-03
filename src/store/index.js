import Vue from "vue";
import Vuex from "vuex";
import Plots from "./plots";
import MapObject from "./map";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    darkTheme: true,
    leftDrawer: false,
    rightDrawer: false,
    infoDialog: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "red",
    plotInfoSkeleton: false,
    layerstatus:false,
    utilitystatus:true,
    WS_status:false,
    EL_status:false,
    DR_status:false,
    plottatus:true,
  },
  getters: {
    getLoading: state => state.loading,
    getTheme: state => state.darkTheme,
    getLeftDrawer: state => state.leftDrawer,
    getRightDrawer: state => state.rightDrawer,
    getInfoDialog: state => state.infoDialog,
    getSnackbar: state => state.snackbar,
    getSnackbarText: state => state.snackbarText,
    getSnackbarColor: state => state.snackbarColor,
    getPlotInfoSkeleton: state => state.plotInfoSkeleton,
    getLayerVisibility: state =>state.layerstatus,
    getUtilityVisibility: state =>state.utilitystatus,
    getWS_Visibility: state =>state.WS_status,
    getEL_Visibility: state =>state.EL_status,
    getDR_Visibility: state =>state.DR_status,
    getPlotVisibility: state =>state.plottatus,
  },
  mutations: {
    setLoading: (state, payload) => (state.loading = payload),
    setTheme: (state, payload) => (state.darkTheme = payload),
    setLeftDrawer: (state, payload) => (state.leftDrawer = payload),
    setRightDrawer: (state, payload) => (state.rightDrawer = payload),
    setInfoDialog: (state, payload) => (state.infoDialog = payload),
    setSnackbar: (state, payload) => (state.snackbar = payload),
    setSnackbarText: (state, payload) => (state.snackbarText = payload),
    setSnackbarColor: (state, payload) => (state.snackbarColor = payload),
    setPlotInfoSkeleton: (state, payload) => (state.plotInfoSkeleton = payload),
    setLayerVisibility:(state,payload)=>(state.layerstatus=payload),
    setUtilityVisibility:(state,payload)=>(state.utilitystatus=payload),
    setWS_Visibility:(state,payload)=>(state.WS_status=payload),
    setEL_Visibility:(state,payload)=>(state.EL_status=payload),
    setDR_Visibility:(state,payload)=>(state.DR_status=payload),
    setPlotVisibility:(state,payload)=>(state.plottatus=payload),
  },
  actions: {},
  modules: {
    plots: Plots,
    map: MapObject
  }
});
