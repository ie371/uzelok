<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="line"
    item-key="id"
    select-all
    class="elevation-1"
    :rows-per-page-items="[8]"
  >
    <template v-slot:items="props">
      <td>
        <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
      </td>
      <td class="text-xs-center">{{ props.item.obozn }}</td>
      <td class="text-xs-center">{{ props.item.Gv }}</td>
      <td class="text-xs-center">{{ props.item.duim }}</td>
      <td class="text-xs-center">{{ props.item.v }}</td>
      <td class="text-xs-center">{{ props.item.gres }}</td>
      <td class="text-xs-center">{{ props.item.dutr }}</td>
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
        { text: "Тр-д", sortable: false, value: "obozn" },
        { text: "Расход", sortable: false, value: "Gv" },
        { text: "Ду ИМ", sortable: false, value: "duim" },
        { text: "Скорость", sortable: false, value: "v" },
        { text: "Гидр.сопротивление", sortable: false, value: "gres" },
        { text: "Ду трубы", sortable: false, value: "dutr" }
      ],
      desserts: [
        {
          name: "Т1",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Т2",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Т11",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Т21",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Т3",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Т4",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Т33",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Т44",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        }
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
        for (let _ss in el.GIDR) {
          let xy = {};
          if (_ss != "Ggvs") {
            xy.id = _ss;
            xy.obozn = el.GIDR[_ss].obozn;
            xy.Gv = el.GIDR[_ss].Gv;
            xy.duim = el.GIDR[_ss].diams[0];
            xy.v = el.GIDR[_ss].gdr.V;
            xy.gres = el.GIDR[_ss].gdr.Puu;
            xy.dutr = el.GIDR[_ss].diams[2];
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
