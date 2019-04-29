<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title primary-title class="pt-1 pb-0">
            <div>
              <div>Основное оборудование</div>
            </div>
          </v-card-title>

          <v-flex xs12 class="pt-0 pb-1">
            <v-select
              dense
              v-model="sb.tipSB"
              :items="items_sb"
              label="Системный блок"
              :item-value="items_sb.value"
            ></v-select>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-combobox
              dense
              v-model="val_plr"
              :items="items_plr"
              label="Выберите плату расширения"
              multiple
            ></v-combobox>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6>
                <v-text-field outline v-model="sb.lvru" label="от ВРУ до СБ"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-text-field outline v-model="sb.lsb" label="от СБ до ИМ"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-select
              dense
              name="region"
              v-on:change="nasp"
              v-model="isx.selReg"
              :items="regions"
              label="Республика, край, область :"
              :item-value="regions.value"
            ></v-select>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-select
              dense
              name="naspunkt"
              v-model="isx.indexnas"
              :items="isx.mess"
              label="Населенный пункт:"
              :item-value="isx.value"
            ></v-select>
          </v-flex>

          <v-divider class="mt-3"></v-divider>

          <v-flex xs12 class="mb-0 pt-0 pb-0">
            <input type="file" name="sitplan_uploads" accept="image/jpeg, image/png">
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      items_sb: [
        { text: "СБ-04 с блоком бесперебойного питания", value: 0 },
        { text: "СБ-04 с сетевым питанием", value: 1 }
      ],

      val_plr: [
        { text: "GSM-модем", value: "gsm" },
        { text: "USBA", value: "usba" }
      ],

      items_plr: [
        { text: "GSM-модем", value: "gsm" },
        { text: "USBA", value: "usba" },
        { text: "Ethernet ПРС-802", value: "prs802" },
        { text: "RS485E", value: "rs485" }
      ],
      regions: [
        { text: "Без климатологии", value: "0" },
        { text: "Алтайский край", value: "1" },
        { text: "Амурская область", value: "2" },
        { text: "Архангельская область", value: "3" },
        { text: "Астраханская область", value: "4" },
        { text: "Белгородская область", value: "5" },
        { text: "Брянская область", value: "6" },
        { text: "Владимирская область", value: "7" },
        { text: "Волгоградская область", value: "8" },
        { text: "Вологодская область", value: "9" },
        { text: "Воронежская область", value: "10" },
        { text: "Ивановская область", value: "11" },
        { text: "Иркутская область", value: "12" },
        { text: "Кабардино- Балкарская Республика", value: "13" },
        { text: "Калининградская область", value: "14" },
        { text: "Калужская область", value: "15" },
        { text: "Камчатская область", value: "16" },
        { text: "Карачаево-Черкесская Республика", value: "17" },
        { text: "Кемеровская область", value: "18" },
        { text: "Кировская область", value: "19" },
        { text: "Костромская область", value: "20" },
        { text: "Краснодарский край", value: "21" },
        { text: "Красноярский край", value: "22" },
        { text: "Курганская область", value: "23" },
        { text: "Курская область", value: "24" },
        { text: "Ленинградская область", value: "25" },
        { text: "Липецкая область", value: "26" },
        { text: "Магаданская область", value: "27" },
        { text: "Московская область", value: "28" },
        { text: "Мурманская область", value: "29" },
        { text: "Ненецкий АО  (Архангельская область)", value: "30" },
        { text: "Нижегородская область", value: "31" },
        { text: "Новгородская область", value: "32" },
        { text: "Новосибирская область", value: "33" },
        { text: "Омская область", value: "34" },
        { text: "Оренбургская область", value: "35" },
        { text: "Орловская область", value: "36" },
        { text: "Пензенская область", value: "37" },
        { text: "Пермская область", value: "38" },
        { text: "Приморский край", value: "39" },
        { text: "Псковская область", value: "40" },
        { text: "Республика Адыгея", value: "41" },
        { text: "Республика Алтай", value: "42" },
        { text: "Республика Башкортостан", value: "43" },
        { text: "Республика Бурятия", value: "44" },
        { text: "Республика Дагестан", value: "45" },
        { text: "Республика Калмыкия", value: "46" },
        { text: "Республика Карелия", value: "47" },
        { text: "Республика Коми", value: "48" },
        { text: "Республика Марий Эл", value: "49" },
        { text: "Республика Мордовия", value: "50" },
        { text: "Республика Саха (Якутия)", value: "51" },
        { text: "Республика Северная Осетия - Алания", value: "52" },
        { text: "Республика Татарстан", value: "53" },
        { text: "Республика Тыва", value: "54" },
        { text: "Республика Хакассия", value: "55" },
        { text: "Ростовская область", value: "56" },
        { text: "Рязанская область", value: "57" },
        { text: "Самарская область", value: "58" },
        { text: "Саратовская область", value: "59" },
        { text: "Сахалинская область", value: "60" },
        { text: "Свердловская область", value: "61" },
        { text: "Смоленская область", value: "62" },
        { text: "Ставропольский край", value: "63" },
        { text: "Тамбовская область", value: "64" },
        { text: "Тверская область", value: "65" },
        { text: "Томская область", value: "66" },
        { text: "Тульская область", value: "67" },
        { text: "Тюменская область", value: "68" },
        { text: "Удмуртская Республика", value: "69" },
        { text: "Ульяновская область", value: "70" },
        { text: "Хабаровский край", value: "71" },
        { text: "Челябинская область", value: "72" },
        { text: "Чеченская Республика", value: "73" },
        { text: "Читинская область", value: "74" },
        { text: "Чувашская Республика", value: "75" },
        { text: "Чукотский АО (Магаданская область)", value: "76" },
        { text: "Ярославская область", value: "77" },
        { text: "Республика Крым", value: "78" }
      ]
    };
  },
  computed: {
    isx() {
      return this.$store.getters.getisxcalc;
    },
    sb() {
      // console.log(this.$store.getters.getSbKp);
      return this.$store.getters.getSbKp;
    }
  },
  methods: {
    nasp() {
      if (this.isx.selReg != 0) {
        this.mess = [];
        let asd = [];
        // console.log(this.isx.selReg )
        axios
          .post("./pdf/project/regions.php", { sReg: this.isx.selReg })
          // console.log(response)
          .then(response => {
            response.data.forEach(item => {
              asd.push({ item });
            });
            this.$store.dispatch("actnas", asd);
          })

          .catch(function(error) {
            console.log(error);
          });
      } else {
        let asd = [];
        this.$store.dispatch("actnas", asd);
      }
    }
  }
};
</script>
<style>
/* .v-text-field input {
    font-size: 0.9em;
  }
   */
</style>