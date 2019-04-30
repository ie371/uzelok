<template>
  <div>
    <v-dialog v-model="showForm" persistent width="500px">
      <v-card>
        <v-card-title class="white--text grey darken-2 font-weight-bold">Редактирование узла учета</v-card-title>
        <v-container fluid grid-list-xl>
          <v-flex xs12 class>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  class="inputPrice"
                  v-model="sps.name"
                  label="Название узла учета"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  class="inputPrice"
                  v-model="sps.q"
                  label="Нагрузка отопления, Гкал/ч"
                  type="number"
                  hide-details
                  valid
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="8"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mt-3 mb-0 pb-0">
            <v-layout>
              <v-flex xs3>
                <span class="red--text">Подача</span>
              </v-flex>

              <v-flex xs3>
                <span class="blue--text">Обратка</span>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 text-xs-center>
            <v-layout>
              <v-flex xs3>
                <v-text-field
                  class="inputPrice"
                  v-model="sps.t1"
                  type="number"
                  hide-details
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  class="inputPrice"
                  v-model="sps.t2"
                  type="number"
                  hide-details
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="5"
                ></v-text-field>
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
                <v-text-field
                  class="inputPrice"
                  v-model="sps.p1"
                  type="number"
                  hide-details
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="3"
                ></v-text-field>
              </v-flex>

              <v-flex xs3 c>
                <v-text-field
                  class="inputPrice"
                  v-model="sps.p2"
                  type="number"
                  hide-details
                  step="0.1"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="3"
                ></v-text-field>
              </v-flex>

              <v-flex xs4 class="text" text-xs-start>
                <br>
                <span class="lbl">Давление, мвст</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-container>
        <v-card-actions>
          <v-checkbox class="shrink ml-3"></v-checkbox>

          <v-spacer></v-spacer>
          <v-btn flat @click="closeForm">отмена</v-btn>
          <v-btn v-if="tp==1" flat @click="remove_uu" color="error">удалить</v-btn>
          <v-btn v-if="tp==0" flat @click="add_uu" color="primary">сохранить</v-btn>
          <v-btn v-if="tp==1" flat @click="closeForm" color="primary">сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gidr from "../utils/gidr.js";
export default {
  props: ["ssps", "tpf"],
  data() {
    return {
      sps: this.ssps,
      tp: this.tpf
    };
  },

  computed: {
    ...mapState({
      showForm: state => state.isxx.showVentForm
    })
  },
  watch: {},
  methods: {
    closeForm() {
      this.$store.dispatch("change_showVentForm");
    },
    add_uu() {
      this.$store.dispatch("ADD_UU", this.sps);
      const result = gidr(this.sps, "");
      var GID = JSON.stringify(result);
      this.$store.dispatch("ADD_GIDR_UU", GID);
      this.closeForm();
    },
    remove_uu() {
      this.$store.dispatch("REMOVE_UU", this.sps.id);
      this.closeForm();
    }
  }
};
</script>
<style scoped>
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
.inputPrice >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice >>> input::-webkit-outer-spin-button,
.inputPrice >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
