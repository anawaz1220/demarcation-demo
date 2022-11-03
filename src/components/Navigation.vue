<template>
  <nav>
    <!-- <v-app-bar
      color="white"
      app
      dense
      clipped-left
      clipped-right
      style="z-index:1101"
     
    > -->
     <!-- extended
      extension-height="5"
       -->
      <!-- <v-progress-linear
        slot="extension"
        color="green"
        :indeterminate="getLoading"
        :hidden="!getLoading"
      ></v-progress-linear> -->
      <!-- <v-app-bar-nav-icon
        @click="toggleLeftDrawer"
        :disabled="map.show3D"
      ></v-app-bar-nav-icon> -->

      <!-- Society Logo -->

      <!-- <v-toolbar-title class="hidden-md-and-down">
        <img
          height="35px"
          style="margin-top:5px; vertical-align: bottom;"
          src="http://airportgreengarden.com.pk/wp-content/uploads/2019/09/Logo-Latest-new.jpg"
          alt="Airport Green Garden"
          title="Airport Green Garden"
          /> -->


        <!-- Society Name -->

        <!-- <snap style= "font-size: 22px; color:green; margin-left: 30px;"> Airport Green Garden </snap>
      </v-toolbar-title> -->



      <!-- <v-spacer></v-spacer> -->

      <!-- <v-spacer></v-spacer>
      <v-select
        :items="getBlockList"
        v-model="block"
        label="Block"
        hide-details
        class="mx-2 selector"
        overflow
        dense
        outlined
        @change="fetchPlotList"
      ></v-select>
      <v-select
        :items="getPlotList"
        item-text="plot_id"
        item-value="new_id"
        v-model="plotID"
        label="Plot ID"
        hide-details
        class="mx-2 selector"
        overflow
        dense
        outlined
        @change="fetchPlotInfo"
      ></v-select>
      <v-btn
        :disabled="get3DPlots.length == 0"
        :color="map.show3D ? 'red' : 'green'"
        :text="!map.show3D"
        class="ma-2 white--text"
        @click="toggle3DMap"
      >
        <v-icon dark left v-if="!map.show3D">
          {{
            get3DPlots.length == 0
              ? `mdi-cube-outline mdi-spin`
              : map.show3D
              ? "mdi-close"
              : "mdi-cube-outline"
          }}</v-icon
        >3D Map
        <v-icon dark right v-if="map.show3D">{{
          map.show3D ? "mdi-close" : "mdi-cube-outline"
        }}</v-icon>
      </v-btn>
      <v-btn icon color="primary" @click="resetSelect">
        <v-icon>mdi-refresh</v-icon>
      </v-btn> -->
      <!-- <v-row> 
        <v-col cols="11"  align-content="end"></v-col>
        <v-col cols="1">
            <v-btn
                icon
                color="primary"
                :disabled="map.show3D"
                @click="toggleRightDrawer"
              >
              <v-icon>mdi-menu</v-icon>
            </v-btn> 
        </v-col>
      </v-row>
      
    </v-app-bar> -->


    <!-- Left Drawer -->
    <v-navigation-drawer
      app
      :value="getLeftDrawer"
      clipped
      style="z-index:1100"
    >
      <div class="pa-1">
        <v-layout   justify-space-between row wrap class="ma-2 pa-0">
          <v-flex xs12 class="mx-2">
            <v-row>
              <v-col  cols="10">
                   <p align-center style="font-size:20px;" class="ma-2"><b>Summary Menu</b></p>
              </v-col>
              <v-col cols="2">
                   <v-icon  color="error" dark @click="toggleLeftDrawer">  mdi-close-circle </v-icon>
              </v-col>
            </v-row>
          </v-flex>

          <v-flex xs12>
            <v-layout row align-center justify-space-between class="ma-0">
              <h3>32%</h3>
              <div>
                <v-chip color="green" text-color="white" class="mx-1"
                  >Sold</v-chip
                >
                <v-chip color="red" text-color="white" class="mx-1"
                  >Unsold</v-chip
                >
              </div>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="my-2">
            <v-progress-linear
              rounded
              height="10"
              background-color="error"
              color="success"
              :value=32
            ></v-progress-linear>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"></v-divider>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12 class="my-2">
            <h1>Dimension</h1>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around class="ma-0 pa-2">
          <v-flex
            xs6
            v-for="dimension in getSummary.dimensions"
            :key="dimension.dimension"
          >
            <v-layout row wrap justify-center align-center class="ma-2">
              <v-progress-circular
                :rotate="-90"
                :size="90"
                :width="7"
                :value="(dimension.sold / dimension.total) * 100"
                color="green"
                >{{
                  ((dimension.sold / dimension.total) * 100).toFixed(0)
                }}%</v-progress-circular
              >
              <p style="text-align:center;">
                {{
                  dimension.dimension == null
                    ? "No Dimensions"
                    : dimension.dimension
                }}
              </p>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"></v-divider>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12 class="my-2">
            <h1>Blocks</h1>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around class="ma-0 pa-2">
          <v-flex xs6 v-for="block in getSummary.blocks" :key="block.block">
            <v-layout row wrap justify-center align-center class="ma-2">
              <v-progress-circular
                :rotate="-90"
                :size="90"
                :width="7"
                :value="(block.sold / block.total) * 100"
                color="green"
                >{{
                  ((block.sold / block.total) * 100).toFixed(0)
                }}%</v-progress-circular
              >
              <p style="text-align:center;">{{ block.block }}</p>
            </v-layout>
          </v-flex>
        </v-layout>
        
        <v-divider class="my-2"></v-divider>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12 class="my-2">
            <h1>Category</h1>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around class="ma-0 pa-2">
          <v-flex
            xs6
            v-for="category in getSummary.categories"
            :key="category.category"
          >
            <v-layout row wrap justify-center align-center class="ma-2">
              <v-progress-circular
                :rotate="-90"
                :size="90"
                :width="7"
                :value="(category.sold / category.total) * 100"
                color="green"
                >{{
                  ((category.sold / category.total) * 100).toFixed(0)
                }}%</v-progress-circular
              >
              <p style="text-align:center;">{{ category.category }}</p>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-navigation-drawer>


    <!-- Right Drawer -->
    <v-navigation-drawer
      app
      right
      :value="getRightDrawer && !map.show3D"
      clipped
      style="z-index:1100"
    >
      <div class="pa-1">




<!-- Adding Utility switch -->
        <v-flex xs12 class="mx-2">
            <v-row>
              <v-col  cols="2">
                  <v-icon  color="error" dark @click="toggleRightDrawer">  mdi-close-circle </v-icon>
                   
              </v-col>
              <v-col cols="8">
                   <p align-center style="font-size:20px;" class="ma-2"><b>Filter Menu</b></p>
              </v-col>
              <v-col cols="2">
                <!-- <v-btn icon color="primary" @click="resetSelect"> -->
                  <v-icon color="primary" @click="resetSelect">mdi-refresh</v-icon>
                <!-- </v-btn> -->
              </v-col>
            </v-row>
          </v-flex>

        <!-- <v-layout row wrap class="mx-1 pa-0">
          <v-switch v-model="Khasraswitchstatus" label='Khasra Map' @change='toggleLayers'></v-switch>
        </v-layout> -->
        <v-layout row wrap class="mx-1 pa-0">
          <v-switch v-model="Plotswitchstatus" label='Plot Map' @change='togglePlot'></v-switch>
        </v-layout>
        <v-layout row wrap class="mx-1 pa-0">
          <v-switch v-model="Utilityswitchstatus" label='Moza Boundaries' @change='toggleUtility'></v-switch>
        </v-layout>
        <!-- <v-layout row wrap class="mx-1 pa-0">
          <v-switch v-model="WS_switchstatus" label='Water Supply Network' @change='toggle_WS'></v-switch>
        </v-layout>
        <v-layout row wrap class="mx-1 pa-0">
          <v-switch v-model="EL_switchstatus" label='Electrification Network' @change='toggle_EL'></v-switch>
        </v-layout>
        <v-layout row wrap class="mx-1 pa-0">
        <v-switch v-model="DR_switchstatus" label='Drainage Network' @change='toggle_DR'></v-switch>
        </v-layout> -->





        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12>
            <h1>Maps</h1>
          </v-flex>
          <v-radio-group v-model="map.base.val">
            <v-radio color="blue" label="Street Map" value="osm"></v-radio>
            <v-radio
              color="green"
              label="Satellite Map"
              value="satellite"
            ></v-radio>
            <v-radio
              color="red"
              label="Hide Basemap"
              value="nobasemap"
            ></v-radio>
          </v-radio-group>
        </v-layout>

        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12>
            <h1>Status</h1>
          </v-flex>
          <v-radio-group v-model="select.status" @change="filterStatus">
            <v-radio color="blue" label="All" value="all"></v-radio>
            <v-radio color="green" label="Sold" value="sold"></v-radio>
            <v-radio color="red" label="Unsold" value="unsold"></v-radio>
          </v-radio-group>
        </v-layout>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12>
            <h1>Sector</h1>
          </v-flex>
          <v-radio-group v-model="select.block" @change="filterStatus">
            <v-radio color="blue" label="All" value="all"></v-radio>
            <v-radio color="green" label="Sector A" value="A"></v-radio>
            <v-radio color="green" label="Sector B" value="B"></v-radio>
            <v-radio color="green" label="Sector C" value="C"></v-radio>
            <v-radio color="green" label="Sector D" value="D"></v-radio>
            <v-radio color="green" label="Sector E" value="E"></v-radio>
          </v-radio-group>
        </v-layout>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12>
            <h1>Type</h1>
          </v-flex>
          <v-radio-group v-model="select.type" @change="filterStatus">
            <v-radio color="blue" label="All" value="all"></v-radio>
            <v-radio
              color="green"
              label="Apartment"
              value="Apartment"
            ></v-radio>
            <v-radio
              color="green"
              label="Commercial"
              value="Commercial"
            ></v-radio>
            <v-radio
              color="green"
              label="Residential"
              value="Residential"
            ></v-radio>
          </v-radio-group>
        </v-layout>
        <v-layout row wrap class="ma-0 pa-2">
          <v-flex xs12>
            <h1>Dimensions</h1>
          </v-flex>
          <v-radio-group v-model="select.dimensions" @change="filterStatus">
            <v-layout row wrap class="ma-0">
              <v-flex xs6 class="my-2">
                <v-radio color="blue" label="All" value="all"></v-radio>
              </v-flex>
              
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="25X30" value="30x50"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="30X30" value="25x50"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="25X50" value="30x60"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="35X70" value="35x65"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="40x45" value="40x50"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="50x90" value="40x60"></v-radio>
              </v-flex>
              <!-- <v-flex xs6 class="my-2">
                <v-radio color="green" label="50x50" value="50x50"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="50x60" value="50x60"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="50x70" value="50x70"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="50x90" value="50x90"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="80x110" value="80x110"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio color="green" label="90x110" value="90x110"></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio
                  color="green"
                  label="110x100"
                  value="110x100"
                ></v-radio>
              </v-flex>
              <v-flex xs6 class="my-2">
                <v-radio
                  color="green"
                  label="143x190"
                  value="143x190"
                ></v-radio>
              </v-flex> -->
            </v-layout>
          </v-radio-group>
        </v-layout>
      </div>
    </v-navigation-drawer>
    <!--  -->
    <!-- <v-dialog :value="getInfoDialog" width="300" style="z-index:1100">
      <v-card v-if="getPlotInfoSkeleton">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article, actions"
        ></v-skeleton-loader>
      </v-card>
      <v-card v-else>
        <v-card-text class="pa-4">
          <h2>Plot ID: {{ getPlotInfo.plot_id }}</h2>
          <v-divider class="my-2"></v-divider>
          <v-simple-table class="tableItem">
            <tbody>
              <tr>
                <td>
                  <h3>Block</h3>
                </td>
                <td>
                  <h3>{{ getPlotInfo.block_name }}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Status</h3>
                </td>
                <td>
                  <h3>{{ getPlotInfo.status }}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Type</h3>
                </td>
                <td>
                  <h3>{{ getPlotInfo.type }}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Dimensions</h3>
                </td>
                <td>
                  <h3>{{ getPlotInfo.dimensions }}</h3>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="toggleInfoDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- <v-snackbar
      :color="getSnackbarColor"
      :value="getSnackbar"
      :timeout="10000"
      style="z-index:1100"
    >
      {{ getSnackbarText }}
      <v-btn color="white" icon @click="closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar> -->
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    api: Object,
    map: Object
  },
  data() {
    return {
      block: "",
      plotID: "",
      select: {
        block: "all",
        status: "all",
        type: "all",
        dimensions: "all"
      },

      // To link utility switch with utilities layer
      Khasraswitchstatus:false,
       Plotswitchstatus:true,
        Utilityswitchstatus:true,
        WS_switchstatus: false,
        EL_switchstatus: false,
        DR_switchstatus: false,
    };
  },
  computed: {
    ...mapGetters([
      "getLoading",
      "getTheme",
      "getLeftDrawer",
      "getRightDrawer",
      "getInfoDialog",
      "getMap",
      "getZoom",
      "getPlotCenter",
      "getSnackbar",
      "getSnackbarText",
      "getSnackbarColor",
      "getPlotInfoSkeleton",
      "getSummary",
      "getBlockList",
      "getPlotList",
      "getPlotInfo",
      "get3DPlots",
      "getLayerVisibility",
      "getUtilityVisibility",
      "getWS_Visibility",
      "getEL_Visibility",
      "getDR_Visibility",
      "getPlotVisibility",
    ])
  },
  methods: {
    toggleLayers(){
      this.$store.commit("setLayerVisibility", !this.getLayerVisibility);
      },
      toggleUtility(){
      this.$store.commit("setUtilityVisibility", !this.getUtilityVisibility);
      },
      toggle_WS(){
      this.$store.commit("setWS_Visibility", !this.getWS_Visibility);
      },
      toggle_EL(){
      this.$store.commit("setEL_Visibility", !this.getEL_Visibility);
      },
      toggle_DR(){
      this.$store.commit("setDR_Visibility", !this.getDR_Visibility);
      },
      togglePlot(){
      this.$store.commit("setPlotVisibility", !this.getPlotVisibility);
      },
    toggle3DMap() {
      this.map.show3D = !this.map.show3D;
    },
    toggleLeftDrawer() {
      this.$store.commit("setLeftDrawer", !this.getLeftDrawer);
    },
    toggleRightDrawer() {
      this.$store.commit("setRightDrawer", !this.getRightDrawer);
    },
    toggleTheme() {
      this.$store.commit("setTheme", !this.getTheme);
    },
    toggleInfoDialog() {
      this.$store.commit("setInfoDialog", !this.getInfoDialog);
    },
    closeSnackbar() {
      this.$store.commit("setSnackbar", false);
    },
    resetSelect() {
      
      this.block = "";
      this.plotID = "";
      this.select.block = "all";
      this.select.status = "all";
      this.select.type = "all";
      this.select.dimensions = "all";
      this.fetchPlotList();
    },
    fetchPlotList() {
      if (this.block != "") {
        this.$store.dispatch("fetchPlotList", {
          url: this.api.url,
          block: this.block
        });
      }
      this.$store.dispatch("fetchPlots", {
        url: this.api.url,
        params: {
          block: this.block,
          status: this.api.filter.status,
          type: this.api.filter.type,
          dimensions: this.api.filter.dimensions
        }
      });
    },
    fetchPlotInfo() {
      // this.$store.commit("setPlotInfoSkeleton", true);
      this.$store.dispatch("fetchPlotInfo", {
        url: this.api.url,
        id: this.plotID
      });
      // this.$store.commit("setInfoDialog", !this.getInfoDialog);
    },


    filterStatus() {
      this.$store.dispatch("fetchPlots", {
        url: this.api.url,
        params: {
          block: this.select.block == "all" ? "" : this.select.block,
          status: this.select.status == "all" ? "" : this.select.status,
          type: this.select.type == "all" ? "" : this.select.type,
          dimensions:
            this.select.dimensions == "all" ? "" : this.select.dimensions
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("fetchSummary", { url: this.api.url });
  }
};
</script>

<style>
.selector {
  width: 20px;
}
.tableItem {
  text-transform: capitalize;
}
</style>
