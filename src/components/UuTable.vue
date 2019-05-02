<template>
  <div>
    <v-data-table
      v-if="swich"
      v-model="selected"
      :headers="headers"
      :items="line"
      item-key="id"
      class="elevation-1"
      :rows-per-page-items="[12]"
      expand
      hide-actions
    >
      <template v-slot:items="props">
        <tr v-if="!props.item.l">
          <td colspan="7" class="text-xs-start" style="font-weight: bold;">{{ props.item.obozn }}</td>
        </tr>
        <tr v-if="props.item.l">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td class="text-xs-center">{{ props.item.obozn }}</td>
          <td class="text-xs-center">{{ props.item.Gv }}</td>
          <td class="text-xs-center">{{ props.item.duim }}</td>
          <td class="text-xs-center">{{ props.item.v }}</td>
          <td class="text-xs-center">{{ props.item.gres }}</td>
          <td class="text-xs-center">{{ props.item.dutr }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-container v-if="!swich" fluid grid-list-md>
      <v-data-iterator
        :items="iter"
        :rows-per-page-items="rowsPerPageItems"
        row
        hide-actions
        content-tag="v-layout"
      >
        <template v-slot:item="props">
          <v-flex xs3>
            <v-card>
              <v-card-title>
                <h4>{{ props.item.nazv }}</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>тр-д:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.obozn1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.obozn2 }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>расход, м3/ч:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.Gv1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.Gv2 }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>ду ИМ:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.duim1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.duim2 }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>скорость, м/с:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.v1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.v2}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>гидр.сопр., мвст:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.gres1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.gres2 }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>ду тр-да:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.dutr1 }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.dutr2 }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>

                <v-switch></v-switch>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["swich"],
  data() {
    return {
      // swich: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      line: [],
      iter: [],
      selected: [],
      headers: [
        { text: "", sortable: false, value: "" },
        { text: "Тр-д", sortable: false, value: "obozn" },
        { text: "Расход", sortable: false, value: "Gv" },
        { text: "Ду ИМ", sortable: false, value: "duim" },
        { text: "Скорость", sortable: false, value: "v" },
        { text: "Гидр.сопротивление", sortable: false, value: "gres" },
        { text: "Ду трубы", sortable: false, value: "dutr" }
      ]
    };
  },
  computed: {
    ...mapState({
      uzels: state => state.RasHods.uzel_s
    })
  },
  watch: {
    uzels(val) {
      let er = [];
      val.forEach(function(el) {
        let _aa = { obozn: el.nazv, id: el.id, l: false };
        er.push(_aa);
        for (let _ss in el.GIDR) {
          let xy = {};
          let str = el.GIDR[_ss];
          if (_ss != "Ggvs") {
            xy.l = true;
            xy.id = _ss;
            xy.obozn = str.obozn;
            xy.Gv = str.Gv;
            xy.duim = str.diams[0];
            xy.v = str.gdr.V;
            xy.gres = str.gdr.Puu;
            xy.dutr = str.diams[2];
            er.push(xy);
          }
        }
      });
      this.line = er;

      let itr = [];
      val.forEach(function(el) {
        console.log("el", el);

        let xy = {};
        xy.nazv = el.nazv;
        xy.id = el.id;
        let _cou = 1;
        for (let _cc in el.GIDR) {
          let obozn = "obozn" + _cou;
          let Gv = "Gv" + _cou;
          let duim = "duim" + _cou;
          let v = "v" + _cou;
          let gres = "gres" + _cou;
          let dutr = "dutr" + _cou;
          let str = el.GIDR[_cc];
          if (_cc != "Ggvs") {
            xy[obozn] = str.obozn;
            xy[Gv] = str.Gv;
            xy[duim] = str.diams[0];
            xy[v] = str.gdr.V;
            xy[gres] = str.gdr.Puu;
            xy[dutr] = str.diams[2];
            _cou++;
          }
        }
        itr.push(xy);
      });
      this.iter = itr;
    }
  },
  methods: {}
};
</script>
<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 35px;
}
</style>