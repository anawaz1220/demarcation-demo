import Axios from "axios";
import * as turf from "@turf/turf";

function getHeight(dim) {
  if (dim == null) {
    return 0;
  } else {
    return (Number(dim.split("x")[0]) + Number(dim.split("x")[1])) / 5;
  }
}

function getColor(dim) {
  var pdfColors = {
    "25x50": "#7171ff",
    "30x50": "#739bff",
    "30x60": "#6edda5",
    "35x65": "#ff6666",
    "40x50": "#00bfff",
    "40x60": "#00bfff",
    
    null: "#ffcd52"
  };
  return pdfColors[dim];
}

export default {
  state: {
    plots: [],
    plots1: [],
    blockList: [],
    plotList: [],
    plotInfo: {},
    summary: {
      plots: {},
      blocks: {},
      dimensions: {},
      categories: {}
    },
    statusList: [],
    plots3D: []
  },
  
  getters: {
    
    getPlots: state => state.plots,
    getDeals: state => state.plots1,
    getBlockList: state => state.blockList,
    getPlotList: state => state.plotList,
    getPlotInfo: state => state.plotInfo,
    getSummary: state => state.summary,
    getStatusList: state => state.statusList,
    get3DPlots: state => state.plots3D
  },
  mutations: {
    setPlots: (state, payload) => {
      try {
        // console.log("payload:", payload);
        payload.forEach(plot => {
          plot.st_asgeojson = JSON.parse(plot.st_asgeojson);
        });
      } finally {
        state.plots = payload;
        // console.log("plots formatted:", state.plots);
      }
    },

    setDeals: (state, payload) => {
      try {
        // console.log("payload:", payload);
        payload.forEach(plot1 => {
          plot1.st_asgeojson = JSON.parse(plot1.st_asgeojson);
        });
      } finally {
        state.plots1 = payload;
        // console.log("plots formatted:", state.plots);
      }
    },


    setBlockList: (state, payload) => (state.blockList = payload),
    setPlotList: (state, payload) => (state.plotList = payload),
    setPlotInfo: (state, payload) => (state.plotInfo = payload),
    setSummary: (state, payload) => (state.summary = payload),
    setStatusList: (state, payload) => (state.statusList = payload),
    set3DPlots: (state, payload) => {
      // console.log("---payload", payload);
      var data = {
        type: "FeatureCollection",
        features: payload.map(plot => {
          var object_id = plot.object_id;
          var plot_id = plot.plot_id;
          var dimensions = plot.dimensions;
          var st_asgeojson = plot.st_asgeojson;
          var new_id = plot.new_id;
          var new_plot = {
            type: "Feature",
            properties: {
              level: 1,
              base_height: 0,
              object_id: object_id,
              plot_id: plot_id,
              dimensions: dimensions,
              height: getHeight(dimensions),
              color: getColor(dimensions)
            },
            geometry: {
              coordinates: st_asgeojson.coordinates[0],
              type: "Polygon"
            },
            id: new_id
          };
          // { object_id, plot_id, dimensions, st_asgeojson, new_id };
          // console.log(new_plot);
          return new_plot;
        })
      };
      state.plots3D = data;
    }
  },
  actions: {
    fetchPlots(context, payload) {
      context.commit("setSelectedPlot", [], { root: true });
      context.commit("setSnackbar", false, { root: true });
      context.commit("setLoading", true, { root: true });
      var baseUrl = `${payload.url}/plotfilter?`;
      var params = ``;
      if (payload.params.block != "" && payload.params.block != undefined) {
        params += `block=${payload.params.block}&`;
      }
      if (payload.params.status != "" && payload.params.status != undefined) {
        params += `status=${payload.params.status}&`;
      }
      if (payload.params.type != "" && payload.params.type != undefined) {
        params += `type=${payload.params.type}&`;
      }
      if (
        payload.params.dimensions != "" &&
        payload.params.dimensions != undefined
      ) {
        params += `dimensions=${payload.params.dimensions}&`;
      }
      Axios.post(baseUrl + params)
        .then(Response => {
          context.commit("setPlots", Response.data);
          // console.log(Response.data)
          context.commit("set3DPlots", Response.data);
          var polygons = [];
          Response.data.forEach(polygon => {
            var geojson = JSON.parse(polygon.st_asgeojson);
            var ring = geojson.coordinates[0][0];
            var poly = turf.polygon([ring]);
            polygons.push(poly);
          });
          var centroid = turf.centroid({
            type: "FeatureCollection",
            features: polygons
          });
          setTimeout(() => {
            context.commit(
              "setCenter",
              [
                centroid.geometry.coordinates[1],
                centroid.geometry.coordinates[0]
              ],
              { root: true }
            );
            context.commit("setZoom", 16, { root: true });
            context.commit("setLoading", false, { root: true });
          }, 1000);
        })
        .catch(e => {
          context.commit("setLoading", false, { root: true });
          context.commit("setSnackbarText", `No Results Found! ${e}`, {
            root: true
          });
          context.commit("setSnackbar", true, { root: true });
        });
    },

    fetchBlockList(context, payload) {
      Axios.get(`${payload.url}/blocklist`)
        .then(Response => {
          context.commit("setBlockList", Response.data.sort());
        })
        .catch();
    },

    fetchPlotList(context, payload) {
      context.commit("setSnackbar", false, { root: true });
      context.commit("setLoading", true, { root: true });
      context.commit("setSelectedPlot", [], { root: true });
      Axios.post(`${payload.url}/searchplot?block_name=${payload.block}`)
        .then(Response => {
          context.commit("setPlotList", Response.data.plots);
          setTimeout(() => {
            context.commit("setLoading", false, { root: true });
          }, 3000);
        })
        .catch(e => {
          context.commit("setLoading", false, { root: true });
          context.commit("setSnackbarText", `No Results Found! ${e}`, {
            root: true
          });
          context.commit("setSnackbar", true, { root: true });
        });
    },

    markerpoint(context, payload){
      context.commit("setSelectedPlot", [], { root: true });
      var lat= `${payload.lat}`
      var lon= `${payload.lon}`
      context.commit(
          "setSelectedPlot", [lat, lon], { root: true }
        );
    },
   


    fetchPlotInfo(context, payload) {
      
      context.commit("setSnackbar", false, { root: true });
      context.commit("setLoading", true, { root: true });
      context.commit("setPlotInfo", {});
      // context.commit("setPlotInfo", `${payload.info}`);
      // this.setPlotInfo = payload.info;
      // this.state.plotInfo = payload.info;
      // 
      // Axios.get(`${payload.url}/plotdetail/${payload.id}`)
      //   .then(Response => {
      //     var geojson = JSON.parse(Response.data.st_asgeojson);
      //     var ring = geojson.coordinates[0][0];
      //     var poly = turf.polygon([ring]);
      //     var centroid = turf.centroid(poly);
      //     context.commit(
      //       "setCenter",
      //       [
      //         centroid.geometry.coordinates[1],
      //         centroid.geometry.coordinates[0]
      //       ],
      //       { root: true }
      //     );
          context.commit("setPlotInfo", payload.info);
          
      //     context.commit("setDeals", Response.data);
          
      //     // context.commit(
      //     //   "setSelectedPlot",
      //     //   [
      //     //     centroid.geometry.coordinates[1],
      //     //     centroid.geometry.coordinates[0]
      //     //   ],
      //     //   { root: true }
      //     // );
      //     setTimeout(() => {
      //       context.commit("setZoom", 18, { root: true });
      //       context.commit("setPlotInfoSkeleton", false, { root: true });
      //       context.commit("setLoading", false, { root: true });
      //     }, 1000);
      //   })
      //   .catch(e => {
      //     context.commit("setLoading", false, { root: true });
      //     context.commit("setInfoDialog", false, { root: true });
      //     context.commit("setSnackbarText", `No Information Found ${e}`, {
      //       root: true
      //     });
      //     context.commit("setSnackbar", true, { root: true });
      //   });
    },

    fetchSummary(context, payload) {
      Axios.get(`${payload.url}/plotsummary`).then(Response => {
        context.commit("setSummary", Response.data);
      });
    },

    fetchStatusList(context, payload) {
      Axios.get(`${payload.url}/statuslist`).then(Response => {
        context.commit("setStatusList", Response.data);
      });
    }
  }
  
};

