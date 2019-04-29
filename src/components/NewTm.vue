<template>
  <div>
    <v-layout align-start row fill-height>
      <v-navigation-drawer width="300px" clipped height="75vh" permanent>
        <v-toolbar dense>
          Узлы учета
          <v-spacer></v-spacer>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat small color="primary" v-on="on">Добавить УУ</v-btn>
            </template>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="item.click">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>

        <v-list two-line subheader>
          <v-list-tile v-for="uzel in uzels" :key="uzel.id" avatar @click="openUU(uzel)">
            <v-list-tile-content>
              <v-list-tile-title>{{ uzel.name }}</v-list-tile-title>
              <v-list-tile-sub-title
                class="sub"
              >{{ uzel.id}} , {{ uzel.q }} Гкал/ч, {{ uzel.t1 }}/{{ uzel.t2 }}°C, {{ uzel.p1 }}/{{ uzel.p2 }} мвст</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- <div class="framecontent">
        <v-flex>
          <span>здесь будут кнопки, чекбоксы и прочее, в зависмости от массива узлов</span>
        </v-flex>

        <v-btn flat @click>отмена</v-btn>
      </div>-->
      <div class="framecontent2">
        <v-flex>
          <uu-table></uu-table>
        </v-flex>
      </div>

      <co-form v-if="showCoForm" :ssps="eeee" :tpf="tpf"></co-form>
      <vent-form v-if="showVentForm" :ssps="eeee" :tpf="tpf"></vent-form>
      <gvs-form v-if="showGvsForm" :ssps="eeee" :tpf="tpf"></gvs-form>
    </v-layout>
  </div>
</template>
<script>
import CoForm from "@/components/CoForm.vue";
import VentForm from "@/components/VentForm.vue";
import GvsForm from "@/components/GvsForm.vue";
import UuTable from "@/components/UuTable.vue";
import { mapState } from "vuex";
export default {
  components: {
    CoForm,
    VentForm,
    GvsForm,
    UuTable
  },
  data() {
    return {
      eeee: {},
      tpf: "",
      items: [
        {
          icon: "view_list",
          title: "отопление",
          click: () => {
            this.$store.dispatch("change_showCoForm");
            class Usel {
              constructor() {
                this.name = "Узел учёта отопления";
                this.tipe = "showCoForm";
                (this.q = 0.25111),
                  (this.t1 = 95),
                  (this.t2 = 70),
                  (this.p1 = 65),
                  (this.p2 = 55),
                  (this.sx_pr = 0),
                  (this.fu = 0);
              }
            }
            this.eeee = new Usel();
            this.tpf = 0;
          }
        },
        {
          icon: "view_list",
          title: "вентиляция",
          click: () => {
            this.$store.dispatch("change_showVentForm");
            class Usel {
              constructor() {
                this.name = "Узел учёта вентиляции";
                this.tipe = "showVentForm";
                (this.q = 0.512346),
                  (this.t1 = 120),
                  (this.t2 = 70),
                  (this.p1 = 65),
                  (this.p2 = 55),
                  (this.sx_pr = 0),
                  (this.fu = 0);
              }
            }
            this.eeee = new Usel();
            this.tpf = 0;
          }
        },
        {
          icon: "chrome_reader_mode",
          title: "ГВС",
          click: () => {
            this.$store.dispatch("change_showGvsForm");
            class Usel {
              constructor() {
                this.name = "Узел учёта гвс";
                this.tipe = "showGvsForm";
                (this.q = 0.33333),
                  (this.t1 = 60),
                  (this.t2 = 50),
                  (this.p1 = 50),
                  (this.p2 = 40),
                  (this.sx_pr = 0),
                  (this.fu = 0);
              }
            }
            this.eeee = new Usel();
            this.tpf = 0;
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      showCoForm: state => state.isxx.showCoForm,
      showVentForm: state => state.isxx.showVentForm,
      showGvsForm: state => state.isxx.showGvsForm,
      uzels: state => state.RasHods.uzels
    })
  },

  methods: {
    openUU(uzel) {
      // this.eeee = this.uzels[uzel.id];
      const qqq = this.uzels[uzel.id];
      this.eeee = qqq;
      this.tpf = 1;
      this.$store.dispatch(`change_${uzel.tipe}`);
    }
  }
};
</script>
<style scoped>
.framecontent {
  width: 120px;
  height: 80vh;
  overflow-y: hidden;
  /* border: solid 1px darkgray; */
  padding: 0.8em;
}
.framecontent2 {
  width: 65%;
  height: 80vh;
  overflow-y: hidden;
  /* border: solid 1px darkgray; */
  /* padding: 0.8em; */
}
.sub {
  font-size: 0.8em;
  font-style: italic;
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