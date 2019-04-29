<template>
  <div>
    <v-dialog v-model="showCoForm" persistent width="500px">
      <!-- <v-card>
        <v-card-title class="white--text grey darken-2 py-4">Изменения документа</v-card-title>

        <v-container class="pa-3" fluid>
          <v-layout align-start column>
            <v-text-field label="Название узла учета" class="styled-input" list="uu_list"></v-text-field>
            <datalist id="uu_list">
              <option>Узел учёта отопления</option>
              <option>Узел учёта вентиляции</option>
            </datalist>
            <div class="input-alpha">
              <input
                type="number"
                placeholder="Qco"
                step="0.000001"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="8"
              >
              <label>нагрузка отопления, Гкал/ч</label>
            </div>
            <div class="input-alpha">
              <input
                type="number"
                placeholder="t1"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              >
              <label>температура подачи, °C</label>
            </div>
            <div class="input-alpha">
              <input
                type="number"
                placeholder="t2"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              >
              <label>температура обратки, °C</label>
            </div>
            <div class="input-alpha">
              <input
                type="number"
                placeholder="p1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="3"
              >
              <label>давление подачи, мвст</label>
            </div>
            <div class="input-alpha">
              <input
                type="number"
                placeholder="p2"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="3"
              >
              <label>давление обратки, мвст</label>
            </div>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-checkbox class="shrink ml-3"></v-checkbox>

          <v-spacer></v-spacer>

          <v-btn flat @click="closeForm" color="error">Cancel</v-btn>
          <v-btn flat color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>-->

      <v-card>
        <v-card-title class="white--text grey darken-2 py-4">Изменения документа</v-card-title>
        <v-container fluid grid-list-xl>
          <v-flex xs12 class>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  label="Название узла учета"
                  clearable
                  class="inputPrice"
                  list="uu_list"
                ></v-text-field>
                <datalist id="uu_list">
                  <option>Узел учёта отопления</option>
                  <option>Узел учёта вентиляции</option>
                </datalist>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  class="inputPrice"
                  label="Нагрузка отопления, Гкал/ч"
                  type="number"
                  hide-details
                  valid
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mt-3 mb-0 pb-0" text-xs-center>
            <v-layout>
              <v-flex xs3>
                <span class="red--text">Подача Т3</span>
              </v-flex>

              <v-flex xs3>
                <span class="blue--text">Обратка Т4</span>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 text-xs-center>
            <v-layout>
              <v-flex xs3>
                <v-text-field class="inputPrice" type="number" hide-details></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field class="inputPrice" type="number" hide-details></v-text-field>
              </v-flex>
              <v-flex xs4 align-center class="text">
                <br>
                <span class="lbl">Tемп график, °C</span>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 text-xs-center>
            <v-layout>
              <v-flex xs3>
                <v-text-field class="inputPrice" type="number" hide-details></v-text-field>
              </v-flex>

              <v-flex xs3 c>
                <v-text-field class="inputPrice" type="number" hide-details></v-text-field>
              </v-flex>

              <v-flex xs4 class="text">
                <br>
                <span class="lbl">Давление, мвст</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-container>
        <v-card-actions>
          <v-checkbox class="shrink ml-3"></v-checkbox>

          <v-spacer></v-spacer>

          <v-btn flat @click="closeForm" color="error">Cancel</v-btn>
          <v-btn flat color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: true,
      text: ""
    };
  },
  computed: {
    ...mapState({
      showCoForm: state => state.isxx.showCoForm
    })
  },
  watch: {},
  methods: {
    closeForm() {
      this.$store.dispatch("change_showCoForm");
    },
    appendIconCallback() {},
    prependIconCallback() {}
  }
};
</script>
<style scoped>
/*  */
.inputPrice >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice >>> input::-webkit-outer-spin-button,
.inputPrice >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.inputPrice {
  padding: 0;
  /* font-size: 0.9em; */
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
.input-alpha {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.7em;
  padding-left: 0.3em;
  /* width: 100%; */
}
.input-alpha label {
  /* position: absolute; */
  left: 17px;
  top: 7px;
  font-size: 12px;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
  transform-origin: 0% 0%;
  margin-left: 0.8em;
  color: #757575;
}
.input-alpha input {
  border: solid 1px darkgray;
  height: 24px;
  width: 85px;
  padding: 2px;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 0px #f00;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
  padding-left: 0.7em;
}
.input-alpha1 {
  border: solid 1px darkgray;
  height: 24px;
  width: 85px;
  padding: 2px;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 0px #f00;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
  padding-left: 0.7em;
}
.input-alpha input:focus {
  outline: 0;
  border: 1px solid rgb(10, 60, 117);
}
.input-alpha input:focus + label {
  color: rgb(10, 60, 117);
}
.input-alpha input::placeholder {
  color: #868686;
  opacity: 0.5;
  font-size: 0.9em;
  padding-left: 0.5em;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type="number"] {
  -moz-appearance: textfield;
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
