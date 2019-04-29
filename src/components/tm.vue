<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-space-between fill-height>
      <!-- ОТОПЛЕНИЕ -->
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title primary-title class="pt-1 pb-0">
            <div>
              <div>{{info}}</div>
            </div>
          </v-card-title>

          <v-flex class="pt-0 pb-1">
            <v-layout>
              <v-flex>
                <v-text-field
                  dense
                  type="number"
                  label="Нагр отопления, Гкал/ч "
                  hide-details
                  v-model="isx.qco"
                  v-on:input="calc('T1','qco')"
                  step="0.0000001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="8"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pb-1">
            <v-layout>
              <v-flex xs6 class="pb-1 pt-0">
                <v-select
                  dense
                  v-model="isx.tipLo"
                  label="Тип изм. линии"
                  :items="items_il"
                  :item-value="items_il.value"
                  @change="mmo"
                  :error="mlO"
                  id="mlo"
                  @mouseover="mo($event.target.id)"
                  @mouseout="mo()"
                ></v-select>
              </v-flex>

              <v-flex xs6 class="pb-1 pt-0">
                <v-select
                  dense
                  v-model="isx.filo"
                  :disabled="fo"
                  :items="items_fil"
                  label="Фильтр"
                  :item-value="items_fil.value"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pb-1">
            <v-layout>
              <v-flex xs6>
                <v-select
                  dense
                  class="pt-0 pb-1"
                  v-model="isx.sx_ot"
                  :items="items_sxot"
                  label="Схема присоединения"
                  :item-value="items_sxot.value"
                ></v-select>
              </v-flex>

              <v-flex xs6>
                <v-select
                  dense
                  class="pt-0 pb-1"
                  v-if="+isx.sx_ot"
                  v-model="isx.filp"
                  :items="items_fil"
                  label="Фильтр подпитки"
                  :item-value="items_fil.value"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="pt-0 pb-1"></v-flex>
              <v-flex xs3 class="pt-0">
                <span class="red--text">
                  <strong>Подача Т1</strong>
                </span>
              </v-flex>

              <v-flex xs3 class="pt-0">
                <span class="blue--text">
                  <strong>Обратка Т2</strong>
                </span>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Tемп график, °C
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <!-- <v-text-field
                  outline
                  type="number"
                  hide-details
                  v-model="isx.t1"
                  v-on:input="calc('T1','')"
                ></v-text-field>-->
                <input
                  class="qwe"
                  type="number"
                  placeholder="T1"
                  v-model="isx.t1"
                  v-on:input="proj('')"
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.t2"
                  v-on:input="calc('T2','')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Давление, мвст
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  outline
                  type="number"
                  hide-details
                  v-model="isx.p1"
                  v-on:input="calc('T1','')"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.p2"
                  v-on:input="calc('T2','')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Расход, м³/ч
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  v-model="rescalc.gdr1.Gv"
                  hide-details
                  v-on:input="peRash('t1')"
                  step="0.001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field v-model="rescalc.gdr2.Gv" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Ду прибора
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.di1"
                  v-on:change="calc('t1','peres')"
                  hide-details
                  :items="optionso"
                  :item-value="optionso.value"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field v-model="duImT2" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Скорость, м/с
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field hide-details v-model="rescalc.gdr1.V" :error="speed1" readonly></v-text-field>
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field v-model="rescalc.gdr2.V" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>ИМ отопление
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.tipIMo"
                  hide-details
                  :items="items_im"
                  :item-value="items_im.value"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field v-model="tipImT2" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Ду тр-дов Т1/Т2
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.dut1"
                  hide-details
                  :items="diptr.duu1"
                  :item-value="diptr.duu1.value"
                  v-on:change="calc('T1','peres')"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field v-model="this.dutrT2" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1" v-if="+isx.sx_ot">
            <v-layout>
              <v-flex xs4 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  v-model="rescalc.gdr9.Gv"
                  label="Gv94"
                  v-on:input="peRash('t9')"
                  step="0.001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >></v-text-field>
              </v-flex>

              <v-flex xs4 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.di9"
                  :items="optionso"
                  :item-value="optionso.value"
                  v-on:change="calc('T9','peres')"
                ></v-select>
              </v-flex>
              <v-flex xs4 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.dut9"
                  v-on:change="calc('T9','peres')"
                  :items="optionso"
                  :item-value="optionso.value"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- ГВС -->

      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title primary-title class="pt-1 pb-0">
            <div>
              <div>{{infg}}</div>
            </div>
          </v-card-title>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs4>
                <v-text-field
                  dense
                  type="number"
                  v-model="isx.qmax"
                  v-on:input="calc('T3','qmax')"
                  hide-details
                  label="Qmax"
                  placeholder
                  step="0.001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-text-field
                  type="number"
                  v-model="isx.qgvssr"
                  hide-details
                  v-on:input="calc('T4','qgvssr')"
                  label="Qсред"
                  step="0.001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="isx.kch"
                  hide-details
                  v-on:input="cre"
                  label="Кчн"
                  step="0.1"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pb-1">
            <v-layout>
              <v-flex xs6 class="pb-1 pt-0">
                <v-select
                  dense
                  v-model="isx.tipLg"
                  :items="items_il"
                  label="Тип изм. линии"
                  :item-value="items_il.value"
                  @change="mmo"
                  :error="mlG"
                ></v-select>
              </v-flex>

              <v-flex xs6 class="pb-1 pt-0">
                <v-select
                  dense
                  v-model="isx.filg"
                  :disabled="fg"
                  :items="items_fil"
                  label="Фильтр"
                  :item-value="items_fil.value"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pb-1">
            <v-layout>
              <v-flex xs6>
                <v-select
                  dense
                  class="pt-0 pb-1"
                  v-model="isx.sx_otkr"
                  :items="items_gvs_sx"
                  label="Схема теплопотребления"
                  :item-value="items_gvs_sx.value"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field
                  v-model="isx.txvL"
                  v-on:input="calc('T3','txvL')"
                  label="Тхв лето, °C"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 class="pt-0 pb-1">
                <v-text-field
                  v-model="isx.txvZ"
                  v-on:input="calc('T3','txvZ')"
                  label="Тхв зима, °C"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="pt-0 pb-1"></v-flex>
              <v-flex xs3 class="pt-0">
                <span class="red--text">
                  <strong>Подача Т3</strong>
                </span>
              </v-flex>

              <v-flex xs3 class="pt-0">
                <span class="blue--text">
                  <strong>Обратка Т4</strong>
                </span>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Tемп график, °C
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.t3"
                  v-on:input="calc('T3','t3')"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.t4"
                  v-on:input="calc('T3','t4')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Давление, мвст
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.P3"
                  v-on:input="calc_o('T3','p3')"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  hide-details
                  v-model="isx.p4"
                  v-on:input="calc_o('T3','p4')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Расход, м³/ч
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  type="number"
                  v-model="rescalc.gdr3.Gv"
                  v-on:input="peRash('t3')"
                  hide-details
                  step="0.001"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                >></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field v-model="rescalc.gdr4.Gv" hide-details readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Ду прибора
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.di3"
                  v-on:change="calc('T3','peres')"
                  hide-details
                  :items="optionso"
                  :item-value="optionso.value"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.di4"
                  v-on:change="calc('T4','peres')"
                  :disabled="i4"
                  hide-details
                  :items="optionso"
                  :item-value="optionso.value"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Скорость, м/с
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  v-model="rescalc.gdr3.V"
                  readonly
                  hide-details
                  id="V3"
                  @mouseover="mg($event.target.id)"
                  @mouseout="mg()"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-text-field
                  v-model="rescalc.gdr4.V"
                  readonly
                  hide-details
                  id="V4"
                  @mouseover="mg($event.target.id)"
                  @mouseout="mg()"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>ИМ ГВС
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.tipIMg3"
                  :items="items_im"
                  :item-value="items_im.value"
                  hide-details
                  id="im3"
                  @mouseover="mg($event.target.id)"
                  @mouseout="mg()"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.tipIMg4"
                  :items="items_im"
                  :item-value="items_im.value"
                  hide-details
                  id="im4"
                  @mouseover="mg($event.target.id)"
                  @mouseout="mg()"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-0 pt-0 pb-1">
            <v-layout>
              <v-flex xs6 class="text">
                <br>Ду тр-дов Т3/Т4
              </v-flex>

              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.dut3"
                  :items="diptr.duu3"
                  :item-value="diptr.duu3.value"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mb-0 pt-0 pb-1">
                <v-select
                  dense
                  v-model="isx.dut4"
                  :items="diptr.duu4"
                  :item-value="diptr.duu4.value"
                  hide-details
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
      <!-- *************** -->
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
import clc from "@/utils/calcrash.js";

export default {
  components: {
    // Multiselect
  },
  data() {
    return {
      switch1: true,

      items_il: [
        { text: "Классическая", value: "kl" },
        { text: "Модифицированная", value: "ml" }
      ],
      items_fil: [
        { text: "без фильтра", value: 0 },
        { text: "фильтр", value: 1 }
      ],
      items_sxot: [
        { text: "зависимая", value: 0 },
        { text: "независимая", value: 1 }
      ],
      items_im: [{ text: "И6", value: 6 }, { text: "К5", value: 5 }],
      items_gvs_sx: [
        { text: "закрытая", value: 0 },
        { text: "открытая", value: 1 }
      ],
      optionso: [
        { text: "нет", value: 0 },
        { text: "15", value: 15 },
        { text: "25", value: 25 },
        { text: "32", value: 32 },
        { text: "40", value: 40 },
        { text: "50", value: 50 },
        { text: "65", value: 65 },
        { text: "80", value: 80 },
        { text: "100", value: 100 },
        { text: "150", value: 150 },
        { text: "200", value: 200 },
        { text: "300", value: 300 }
      ],

      info:
        "\u00A0\u00A0\u00A0\u00A0\u00A0Параметры ЦО\u00A0\u00A0\u00A0\u00A0\u00A0",
      ro: true,
      fo: false,
      infg:
        "\u00A0\u00A0\u00A0\u00A0\u00A0Параметры ГВС\u00A0\u00A0\u00A0\u00A0\u00A0",
      rg: true,
      fg: false,
      i4: true
      // speed: [

      //     // if(+this.rescalc.gdr1.V > 1.5 ){ return true; } else { return false; }

      //     // v => !!v || 'Name red',

      //     v => +this.rescalc.gdr1.V > 1.5  || 'V > 1.5'
      //   ],
    };
  },

  computed: {
    isx() {
      return this.$store.getters.getisxcalc;
    },
    rescalc() {
      return this.$store.getters.getrescalc;
    },

    // pltR() { return JSON.stringify(this.value) },
    php() {
      // let plll ={plt:this.value}
      // let ppp = JSON.stringify(Object.assign({},this.isx,this.rescalc,this.sb,plll));

      let ppp = JSON.stringify(
        Object.assign({}, this.isx, this.rescalc, this.sb)
      );
      return ppp;
    },

    reqo() {
      let empt = "";
      let c6 = "";
      if (this.rescalc.gdr1.du_im == "0" && this.rescalc.gdr3.du_im == "0") {
        empt = 1;
      } else {
        empt = 0;
      }
      if (this.check6.y1 || this.check6.y3 || this.check6.y4) {
        c6 = 1;
      } else {
        c6 = 0;
      }
      let f = empt + c6;
      if (f > 0) {
        return true;
      } else {
        return false;
      }
    },

    tipImT2() {
      if (this.isx.tipIMo == 6) {
        return "И6";
      } else {
        return "К5";
      }
    },
    duImT2() {
      if (this.isx.di1 === 0) {
        return "нет";
      } else {
        return this.isx.di2;
      }
    },
    dutrT2() {
      if (+this.isx.dut2 === 0) {
        return "";
      } else {
        return this.isx.dut2;
      }
    },
    otkr() {
      if (
        this.isx.qco &&
        this.isx.qmax &&
        (this.isx.qco !== "" && this.isx.qmax !== "") &&
        (this.isx.qco !== "0" && this.isx.qmax !== "0")
      ) {
        return false;
      } else {
        return true;
      }
    },
    // tupik(){if(this.isx.di4 === 0){ return this.$store.dispatch('tupik', 1); } else { return this.$store.dispatch('tupik', 0); }},
    mlO1() {
      if (this.isx.tipLo == "ml" && this.rescalc.gdr1.du_im) {
        if (this.rescalc.gdr1.du_im > 80 || this.rescalc.gdr1.du_im < 32) {
          return ["Ду ИМ: 32 - 80"];
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    mlG1() {
      if (
        this.isx.tipLg == "ml" &&
        (this.rescalc.gdr3.du_im !== 0 || this.rescalc.gdr4.du_im !== 0)
      ) {
        if (
          ((this.rescalc.gdr3.du_im > 80 || this.rescalc.gdr3.du_im < 32) &&
            this.rescalc.gdr3.du_im !== 0) ||
          ((this.rescalc.gdr4.du_im > 80 || this.rescalc.gdr4.du_im < 32) &&
            this.rescalc.gdr4.du_im !== 0)
        ) {
          return ["Ду ИМ: 32 - 80"];
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    mlO() {
      if (this.isx.tipLo == "ml" && this.rescalc.gdr1.du_im) {
        if (this.rescalc.gdr1.du_im > 80 || this.rescalc.gdr1.du_im < 32) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    mlG() {
      if (
        this.isx.tipLg == "ml" &&
        (this.rescalc.gdr3.du_im !== 0 || this.rescalc.gdr4.du_im !== 0)
      ) {
        if (
          ((this.rescalc.gdr3.du_im > 80 || this.rescalc.gdr3.du_im < 32) &&
            this.rescalc.gdr3.du_im !== 0) ||
          ((this.rescalc.gdr4.du_im > 80 || this.rescalc.gdr4.du_im < 32) &&
            this.rescalc.gdr4.du_im !== 0)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    // speed(){
    //     if(+this.rescalc.gdr1.V > 1.5 ){ return ['V  > 1.5']; } else { return []; }
    //     },
    speed1() {
      if (+this.rescalc.gdr1.V > 1.5) {
        return true;
      } else {
        return false;
      }
    },
    speed3() {
      if (+this.rescalc.gdr3.V > 1.5) {
        return true;
      } else {
        return false;
      }
    },
    speed4() {
      if (+this.rescalc.gdr4.V > 1.5) {
        return true;
      } else {
        return false;
      }
    },
    maxSpeed() {
      return "\u00A0\u00A0\u00A0\u00A0\u00A0Скорость потока в ИМ больше 1,5 м/с\u00A0\u00A0\u00A0\u00A0\u00A0";
    },
    // diapIM(){if(this.isx.tipIMo == 6){return 'Ду 25 - 80'}else{return 'Ду 15 - 300'}},
    diapIM() {
      return "\u00A0\u00A0\u00A0\u00A0\u00A0диап. Ду ИМ И6: 25 - 80\u00A0\u00A0\u00A0\u00A0\u00A0";
    },
    diapIMml() {
      return "\u00A0\u00A0\u00A0\u00A0\u00A0диап. Ду ИМ для модифиц. линий: 32 - 80\u00A0\u00A0\u00A0\u00A0\u00A0";
    },
    diptr() {
      let du = [15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 250, 300];
      let duu1 = [];
      let dd1 = [];
      let duu9 = [];
      let duu3 = [];
      let duu4 = [];
      let d1 = +this.isx.di1;
      let d9 = +this.isx.di9;
      let d3 = +this.isx.di3;
      let d4 = +this.isx.di4;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let duk1 = du.slice(A1, A1 + 4);
      let duk9 = du.slice(A9, A9 + 4);
      let duk3 = du.slice(A3, A3 + 4);
      let duk4 = du.slice(A4, A4 + 4);
      duk1.forEach(function(el) {
        let h = { text: el, value: el };
        duu1.push(h);
        dd1.push(el);
      });
      duk9.forEach(function(el) {
        let h = { text: el, value: el };
        duu9.push(h);
      });
      duk3.forEach(function(el) {
        let h = { text: el, value: el };
        duu3.push(h);
      });
      duk4.forEach(function(el) {
        let h = { text: el, value: el };
        duu4.push(h);
      });
      // console.log(d1,d9,d3,d4)
      return { duu1, duu9, duu3, duu4, dd1 };
    },
    check6() {
      let du = [25, 32, 40, 50, 65, 80];

      let d1 = +this.rescalc.gdr1.du_im;
      let d9 = +this.rescalc.gdr9.du_im;
      let d3 = +this.rescalc.gdr3.du_im;
      let d4 = +this.rescalc.gdr4.du_im;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let y1 = "";
      let y3 = "";
      let y4 = "";
      if (+this.isx.tipIMo == 6) {
        if (A1 >= 0 || !d1) {
          y1 = false;
        } else {
          y1 = true;
        }
      } else {
        y1 = false;
      }
      if (this.isx.tipIMg3 == 6) {
        if (A3 >= 0 || !d3) {
          y3 = false;
        } else {
          y3 = true;
        }
      } else {
        y3 = false;
      }
      if (this.isx.tipIMg4 == 6) {
        if (A4 >= 0 || !d4) {
          y4 = false;
        } else {
          y4 = true;
        }
      } else {
        y4 = false;
      }
      return { y1, y3, y4 };
    },
    imgsx() {
      let tipu = "";
      let z = "10";
      let z1 = "";
      let zz = "";
      let bf7 = 1;
      if (
        this.isx.qco &&
        this.isx.qmax &&
        (this.isx.qco !== "" && this.isx.qmax !== "") &&
        (this.isx.qco !== "0" && this.isx.qmax !== "0")
      ) {
        tipu = "og";
      } else if (this.isx.qco && this.isx.qco !== "" && this.isx.qco !== "0") {
        tipu = "o";
      } else if (
        this.isx.qmax &&
        this.isx.qmax !== "" &&
        this.isx.qmax !== "0"
      ) {
        tipu = "g";
      }
      let z2 = this.isx.sx_ot;
      let z3 = this.isx.sx_otkr;
      let z4 = this.isx.sx_gvs;
      // if(this.check6.y1 || this.check6.y3 || this.check6.y4 || this.mlO || this.mlG){ bf7=1; } else { bf7=0; }
      switch (tipu) {
        case "o":
          z1 = "1";
          z = z1 + z2;
          zz = "ОТ";
          if (this.check6.y1 || this.mlO) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        case "g":
          z1 = "2";
          z = z1 + z4;
          zz = "ГВС";
          if (this.check6.y3 || this.check6.y4 || this.mlG) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        case "og":
          z1 = "3";
          z = z1 + z2 + z3 + z4;
          zz = "ОТ + ГВС";
          if (
            this.check6.y1 ||
            this.check6.y3 ||
            this.check6.y4 ||
            this.mlO ||
            this.mlG
          ) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        default:
          zz = "";
          bf7 = 1;
          break;
      }
      let sx = "./build/img/" + z + ".svg";

      return { sx, zz, bf7 };
    }
  },

  methods: {
    // tupiksx(){ if(this.tupik){
    //    console.log('this.tupik')
    // this.$store.dispatch('tupik', 1)} else {this.$store.dispatch('tupik', 0)}

    // },
    customLabel(option) {
      return ` ${option.plt}`;
    },
    Qmax() {
      return "Qмакс = Qср * Kчн";
    },
    Qsr() {
      return "Qср = Qмакс / Kчн";
    },
    KCHN() {
      return "Kчн = Qмакс / Qср <br> Зависит от типа здания";
    },
    rasshir() {
      return "Данный параметр необходим для подбора датчиков температуры.<br> При Ду ИМ менее 50, датчики устанавливаются в расширение Ду65.";
    },
    mo(mess) {
      console.log(mess);
      if (mess) {
        switch (mess) {
          case "V1":
            if (this.speed1) {
              this.info = this.maxSpeed;
              this.ro = false;
            }
            break;
          case "im1":
            if (this.check6.y1) {
              this.info = this.diapIM;
              this.ro = false;
            }
            break;
          case "mlo":
            if (this.mlO) {
              this.info = this.diapIMml;
              this.ro = false;
            }
            break;
        }
      } else {
        this.info =
          "\u00A0\u00A0\u00A0\u00A0\u00A0Параметры ЦО\u00A0\u00A0\u00A0\u00A0\u00A0";
        this.ro = true;
      }
    },
    mmo() {
      if (this.isx.tipLo == "ml") {
        this.fo = true;
        this.$store.dispatch("filO", 0);
      } else {
        this.fo = false;
      }
    },
    mg(mess) {
      console.log(mess);
      if (mess) {
        switch (mess) {
          case "im3":
            if (this.check6.y3) {
              this.infg = this.diapIM;
              this.rg = false;
            }
            break;
          case "im4":
            if (this.check6.y4) {
              this.infg = this.diapIM;
              this.rg = false;
            }
            break;

          case "V3":
            if (this.speed3) {
              this.infg = this.maxSpeed;
              this.rg = false;
            }
            break;
          case "V4":
            if (this.speed4) {
              this.infg = this.maxSpeed;
              this.rg = false;
            }
            break;
          case "mlg":
            if (this.mlG) {
              this.infg = this.diapIMml;
              this.rg = false;
            }
            break;
        }
      } else {
        this.infg =
          "\u00A0\u00A0\u00A0\u00A0\u00A0Параметры ГВС\u00A0\u00A0\u00A0\u00A0\u00A0";
        this.rg = true;
      }
    },
    mmg() {
      if (this.isx.tipLg == "ml") {
        this.fg = true;
        this.$store.dispatch("filG", 0);
      } else {
        this.fg = false;
      }
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },

    calc(d, m) {
      // console.log("k==", d, "m==", m);
      let tipu = "";
      if (
        this.isx.qco &&
        this.isx.qmax &&
        (this.isx.qco !== "" && this.isx.qmax !== "") &&
        (this.isx.qco !== "0" && this.isx.qmax !== "0")
      ) {
        tipu = "og";
      } else if (this.isx.qco && this.isx.qco !== "" && this.isx.qco !== "0") {
        tipu = "o";
      } else if (
        this.isx.qmax &&
        this.isx.qmax !== "" &&
        this.isx.qmax !== "0"
      ) {
        tipu = "g";
      }
      this.$store.dispatch("tipuz", tipu);

      switch (m) {
        case "qco":
          this.$store.dispatch("actnum", this.isx.qco); //не более 10
          break;
        case "qmax":
          this.$store.dispatch("actqs", this.isx.qmax);
          break;
        case "qgvssr":
          this.$store.dispatch("actqm", this.isx.qgvssr);
          break;
      }
      if (this.otkr) {
        this.$store.dispatch("actdisotkr", 0);
      }

      this.$store.dispatch("tupik", 0);
      console.log(
        "this.isx.di1==",
        this.isx.di1,
        "this.isx.dut1==",
        this.isx.dut1
      );

      if (m === "peres") {
        let du = [15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 250, 300];
        let k1 = du.indexOf(+this.isx.di1);
        let k11 = du.indexOf(+this.isx.dut1);
        let k9 = du.indexOf(+this.isx.di9);
        let k99 = du.indexOf(+this.isx.dut9);
        let k3 = du.indexOf(+this.isx.di3);
        let k33 = du.indexOf(+this.isx.dut3);
        let k4 = du.indexOf(+this.isx.di4);
        let k44 = du.indexOf(+this.isx.dut4);

        if (+this.isx.di1 !== 0) {
          if (k1 > k11 || k11 - k1 > 3) {
            this.$store.dispatch({
              type: "truba",
              res: +this.isx.di1,
              t: "t1"
            });
          }
          if (k9 > k99 || k99 - k9 > 3) {
            this.$store.dispatch({
              type: "truba",
              res: +this.isx.di9,
              t: "t9"
            });
          }
        } else {
          let epty = { Gv: "", V: "", du_im: 0 };
          this.$store.dispatch({
            type: "actpeR",
            result: epty,
            d: "t1",
            emp: 1
          });
        }

        if (+this.isx.di3 !== 0) {
          if (k3 > k33 || k33 - k3 > 3) {
            this.$store.dispatch({
              type: "truba",
              res: +this.isx.di3,
              t: "t3"
            });
          }
          if (k4 > k44 || k44 - k4 > 3) {
            this.$store.dispatch({
              type: "truba",
              res: +this.isx.di4,
              t: "t4"
            });
          }
          this.i4 = false;
        } else {
          let epty = { Gv: "", V: "", du_im: 0 };
          this.$store.dispatch({
            type: "actpeR",
            result: epty,
            d: "t3",
            emp: 1
          });
          this.i4 = true;
        }
        if (+this.isx.di4 === 0) {
          let epty = { Gv: "", V: "", du_im: 0 };
          this.$store.dispatch({
            type: "actpeR",
            result: epty,
            d: "t4",
            emp: 1
          });
          this.$store.dispatch("tupik", 1);
        } else {
          this.$store.dispatch("tupik", 0);
        }

        // console.log('isx', this.isx)
        // function calc(isx, t, sk, R, d, peres)
        // let R = 0;
        // switch(d){
        //     case 't1':
        //     R = this.rescalc.gdr1.Gv;
        //     break;
        //     case 't3':
        //     R = this.rescalc.gdr3.Gv;
        //     if(R>0) {R4 = (this.rescalc.gdr3.Gv*0.4).toFixed(3);}
        //     this.i4=false
        //     break;
        //     case 't9':
        //     R = this.rescalc.gdr9.Gv;
        //     break;
        // }
        // var t = 'kp'
        // let result = clc( this.isx, t, 1.5, R, d, '')
        // console.log('result', result)
        // this.$store.dispatch({
        //     type:'actrescalc',
        //     result: result,
        //     t: t
        //     });
      }

      if (this.isx.qco > 0 || this.isx.qmax > 0) {
        var t = "project";
        let result = clc(this.isx, t, 1.5, "", "", m);
        this.$store.dispatch({
          type: "actrescalc",
          result: result,
          t: t
        });
        this.i4 = false;
      }

      if (
        !this.isx.qco ||
        this.isx.qco === "0" ||
        this.isx.qmax === "" ||
        this.isx.qmax === "0"
      ) {
        if (m !== "peres") {
          if (!this.isx.qco || this.isx.qco === "0") {
            let result = {
              OT: {},
              gdr1: { du_im: 0 },
              gdr2: { du_im: 0 },
              gdr9: { du_im: 0 }
            };
            var t = "project";
            this.$store.dispatch({
              type: "actrescalc",
              result: result,
              t: t
            });
          }
          if (!this.isx.qmax || this.isx.qmax === "0") {
            let result = {
              gdr3: { du_im: 0 },
              gdr4: { du_im: 0 },
              Ggvs: {}
            };
            var t = "project";
            this.$store.dispatch({
              type: "actrescalc",
              result: result,
              t: t
            });
            this.i4 = true;
          }
        }
      }
    },

    cre() {
      this.$store.dispatch("actkch", this.isx.kch);
      this.$store.dispatch("actqm", null);
      this.$store.dispatch("actqs", null);
    },

    peRash(d) {
      let R = 0;
      let R4 = 0;
      let t = "kp";
      switch (d) {
        case "t1":
          R = this.rescalc.gdr1.Gv;
          break;
        case "t3":
          R = this.rescalc.gdr3.Gv;
          if (R > 0) {
            R4 = (this.rescalc.gdr3.Gv * 0.4).toFixed(3);
          }
          this.i4 = false;
          break;
        case "t9":
          R = this.rescalc.gdr9.Gv;
          break;
      }
      if (R > 0) {
        console.log("RASH", R);
        let result = clc(this.isx, t, 1.5, R, d, "");

        this.$store.dispatch({
          type: "actpeR",
          result: result,
          d: d
        });
      } else if (R === "") {
        console.log("zero", R);
        let epty = { Gv: "", V: "", du_im: 0 };
        this.$store.dispatch({
          type: "actpeR",
          result: epty,
          d: d,
          emp: 1
        });
      }
      if (d === "t3" && R4 !== 0) {
        console.log("R4", R4);
        let result = clc(this.isx, t, 1.5, R4, d, "");
        this.$store.dispatch({
          type: "actpeR",
          result: result,
          d: "t4"
        });
      } else {
        let epty = { Gv: "", V: "", du_im: 0 };
        this.$store.dispatch({
          type: "actpeR",
          result: epty,
          d: "t4",
          emp: 1
        });
        this.i4 = true;
      }
    }
  }
};
</script>


<style scoped>
.qweg {
  border-radius: 0;
  box-shadow: none;
  border-color: #d4ded2;
}
.qwe {
  height: 25px !important;
  font-size: 0.8em !important;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.form-control:focus {
  border-color: #3c8dbc;
  box-shadow: none;
}

.form-control::placeholder {
  color: #868686 !important;
  opacity: 0.5 !important;
}
.v-text-field input {
  font-size: 0.8em;
  font-weight: bold;
}
/* .v-text-field input aria-label{
    font-size: 0.9em;
    font-weight: bold;
  } */
.v-select__selection {
  font-size: 0.8em;
  /* color: crimson;  */
  font-weight: bold;
}
.v-select__selection .err {
  color: crimson;
}

.text {
  font-size: 0.8em;
  /* align-end */
  /* font-weight: bold; */
}
span {
  font-size: 0.8em;
}
.styled-input {
  height: 40px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 20pt;
}
.v-text-field__slot {
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.input[type="number"] {
  -moz-appearance: textfield;
}
</style>