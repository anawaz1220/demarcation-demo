<template>
  <!-- <p>{{ get3DPlots }}</p> -->
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";

export default {
  props: {
    api: Object,
    map: Object
  },
  computed: {
    ...mapGetters(["getZoom", "getCenter", "get3DPlots"])
  },
  methods: {
    //
  },
  mounted() {
    var plotsIn3D = this.get3DPlots;
    // console.log("plotsIn3D", plotsIn3D, [this.getCenter[1], this.getCenter[0]]);
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FtcnJubiIsImEiOiJjanhvOHBkcXQwNDNrM2ltb3Nmazd3M3AzIn0.mv0cZWobPPM4gcQzC1rw2Q";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.getCenter[1], this.getCenter[0]],
      // [-87.61741, 41.866684],
      zoom: this.getZoom,
      pitch: 40,
      bearing: 20,
      antialias: true
    });

    map.on("load", function() {
      // console.log("plotsIn3D", plotsIn3D);

      map.addSource("floorplan", {
        // GeoJSON Data source used in vector tiles, documented at
        // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
        type: "geojson",
        data: plotsIn3D
      });
      map.addLayer({
        id: "room-extrusion",
        type: "fill-extrusion",
        source: "floorplan",
        paint: {
          //   // See the Mapbox Style Specification for details on data expressions.
          //   // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
          "fill-extrusion-vertical-gradient": true,
          //   // Get the fill-extrusion-color from the source 'color' property.
          "fill-extrusion-color": ["get", "color"],

          //   // Get fill-extrusion-height from the source 'height' property.
          "fill-extrusion-height": ["get", "height"],

          //   // Get fill-extrusion-base from the source 'base_height' property.
          "fill-extrusion-base": ["get", "base_height"],

          //   // Make extrusions slightly opaque for see through indoor walls.
          "fill-extrusion-opacity": 0.5
        }
      });
    });
  }
};
</script>

<style>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
