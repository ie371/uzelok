<template>
  <div syyle="height:75vh;">
    <v-layout align-start row fill-height>
      <v-navigation-drawer height="75vh" permanent>
        <v-toolbar>
          <v-flex>
            <v-switch v-model="switch1"></v-switch>
          </v-flex>
          <v-spacer></v-spacer>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat small color="primary" v-on="on" :disabled="count>=4">Добавить УУ</v-btn>
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
              <v-list-tile-title>{{ uzel.nazv }}</v-list-tile-title>
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
      <!-- <div class="framecontent"> -->
      <v-flex xs2 v-if="switch1">
        <v-layout align-center justify-center column fill-height>
          <v-select class="inputPrice" :items="sx_pr" label="Схема теплоснабжения"></v-select>
          <v-select class="inputPrice" :items="sx_pr" label="Схема теплоснабжения"></v-select>
          <v-select class="inputPrice" :items="sx_pr" label="Схема теплоснабжения"></v-select>
          <v-select class="inputPrice" :items="sx_pr" label="Схема теплоснабжения"></v-select>
        </v-layout>
      </v-flex>
      <!-- </div> -->
      <!-- <div class="framecontent2"> -->
      <v-flex>
        <uu-table :swich="switch1"></uu-table>
        <!-- <ite-rator></ite-rator> -->
      </v-flex>
      <!-- </div> -->

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
import IteRator from "@/components/iterator.vue";
import { mapState } from "vuex";
export default {
  components: {
    CoForm,
    VentForm,
    GvsForm,
    UuTable,
    IteRator
  },
  data() {
    return {
      switch1: true,
      // count: 0,
      eeee: {},
      tpf: "",
      items: [
        {
          icon: "view_list",
          title: "отопление",
          click: () => {
            this.$store.dispatch("change_showCoForm");
            let _cou = this.counts.co;
            this.eeee = this.class_Usel_co(_cou);
            this.tpf = 0;
            this.$store.dispatch("change_numb_uu");
            // this.count++;
          }
        },
        {
          icon: "view_list",
          title: "вентиляция",
          click: () => {
            this.$store.dispatch("change_showVentForm");
            let _cou = this.counts.vent;
            this.eeee = this.class_Usel_vent(_cou);
            this.tpf = 0;
            this.$store.dispatch("change_numb_uu");
            // this.count++;
          }
        },
        {
          icon: "chrome_reader_mode",
          title: "ГВС",
          click: () => {
            this.$store.dispatch("change_showGvsForm");
            let _cou = this.counts.gvs;
            this.eeee = this.class_Usel_gvs(_cou);
            this.tpf = 0;
            this.$store.dispatch("change_numb_uu");
            // this.count++;
          }
        }
      ],
      sx_pr: ["Закрытая", "Открытая"]
    };
  },
  computed: {
    ...mapState({
      showCoForm: state => state.isxx.showCoForm,
      showVentForm: state => state.isxx.showVentForm,
      showGvsForm: state => state.isxx.showGvsForm,
      count: state => state.numb_uu,
      counts: state => state.RasHods.counts,
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
    },
    class_Usel_co(_cou) {
      class UselCo {
        constructor(_cou) {
          this.name = "uselCo_" + _cou;
          this.id = "uselCo_" + _cou;
          this.nazv = "Узел учёта отопления";
          this.tipe = "showCoForm";
          this.GIDR = {};
          this.q = 0.555;
          this.t1 = 95;
          this.t2 = 70;
          this.p1 = 65;
          this.p2 = 55;
          this.sx_pr = 0;
          this.fu = 0;
        }
      }
      let _aa = new UselCo(_cou);
      return _aa;
    },
    class_Usel_vent(_cou) {
      class UselVent {
        constructor(_cou) {
          // this.id = "uselVent_" + _cou;
          // this.name = "Узел учёта вентиляции";
          this.name = "uselVent_" + _cou;
          this.id = "uselVent_" + _cou;
          this.nazv = "Узел учёта вентиляции";
          this.tipe = "showVentForm";
          this.GIDR = {};
          this.q = 0.512346;
          this.t1 = 130;
          this.t2 = 70;
          this.p1 = 65;
          this.p2 = 55;
          this.sx_pr = 0;
          this.fu = 0;
        }
      }
      let _aa = new UselVent(_cou);
      return _aa;
    },
    class_Usel_gvs(_cou) {
      class UselGvs {
        constructor(_cou) {
          // this.id = "uselGvs_" + _cou;
          // this.name = "Узел учёта ГВС";
          this.name = "uselGvs_" + _cou;
          this.id = "uselGvs_" + _cou;
          this.nazv = "Узел учёта ГВС";
          this.tipe = "showGvsForm";
          this.GIDR = {};
          this.q = 0.514;
          this.qs = 0.23;
          this.Kchn = 2.2;
          this.t3 = 60;
          this.t4 = 50;
          this.p3 = 55;
          this.p4 = 45;
          this.sx_pr = 0;
          this.txvL = 15;
          this.txvZ = 5;
          this.t11 = "";
          this.koef = 1;
          this.Ktp = 0.25;
          this.Knp = 0.8;
          this.beta = 1.3;
          this.tu = 0;
        }
      }
      let _aa = new UselGvs(_cou);
      return _aa;
    }
  }
};
</script>
<style scoped>
.inputPrice {
  padding: 0;
  font-size: 0.9em;
  font-weight: bold;
}
.inputPrice >>> .v-label {
  font-size: 10pt;
  opacity: 0.5;
}
.lbl {
  font-size: 0.8em;
  opacity: 0.5;
}
.inputPrice >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice >>> input::-webkit-outer-spin-button,
.inputPrice >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.framecontent {
  width: 200px;
  height: 80vh;
  overflow-y: hidden;
  /* border: solid 1px darkgray; */
  padding: 0.8em;
}
.framecontent2 {
  /* width: 65%; */
  height: 80vh;
  /* overflow-y: hidden; */
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