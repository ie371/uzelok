<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="name"
    select-all
    class="elevation-1"
    :rows-per-page-items="[10]"
  >
    <template v-slot:items="props">
      <td>
        <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
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
        { text: "Расход", sortable: false, value: "name" },
        { text: "Ду ИМ", sortable: false, value: "calories" },
        { text: "Скорость", sortable: false, value: "fat" },
        { text: "Гидр.сопротивление", sortable: false, value: "carbs" },
        { text: "Ду трубы", sortable: false, value: "protein" },
        { text: "IХЗ", sortable: false, value: "iron" }
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
      uzels: state => state.RasHods.uzels
    }),
    isx() {
      return this.$store.getters.getuzels;
    }
  },
  watch: {
    uzels() {
      console.log("ddddddddddddd");
    },
    isx() {
      console.log("ddddddddddddd");
    }
  },
  methods: {}
};
</script>
