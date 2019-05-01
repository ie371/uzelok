<template>
  <v-data-table
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
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      line: [],
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