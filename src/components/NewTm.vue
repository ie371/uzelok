<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped width="400px" permanent class="framecontent">
      <v-toolbar dense>
        Узлы учета
        <v-spacer></v-spacer>

        <v-btn dark small color="primary">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content v-for="(item, i) in 4" :key="i">
          <template v-slot:header>
            <div>Item</div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">Lorem nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <!-- <div class="framecontent"></div> -->
    <upl-form></upl-form>
  </div>
</template>
<script>
import uplForm from "@/components/uplForm.vue";
export default {
  components: {
    uplForm
  },
  data() {
    return {
      drawer: true,

      panel: [false, true, true]
    };
  },
  methods: {
    add_uu() {}
  }
};
</script>
<style scoped>
.framecontent {
  height: 100vh;
  overflow-y: hidden;
}
.inp {
  border: 1px;
  border-color: darkgray;
  border-radius: 3px;
  border-style: solid;
  width: 75px !important;
}
.inp::placeholder {
  color: #868686 !important;
  opacity: 0.5 !important;
  font-size: 0.9em;
}
.arch {
  font-size: 0.8em;
  font-style: italic;
  cursor: pointer;
  list-style-type: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>