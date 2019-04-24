<template>
  <div>
    <v-dialog v-model="showUploadForm" persistent width="750px">
      <v-card>
        <v-card-title class="white--text grey darken-2 py-4 title">Изменения документа</v-card-title>

        <v-container grid-list-sm class="pa-3">
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Документ</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-subheader class="title font-weight-bold">fghj</v-subheader>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs4>
              <!-- <v-subheader>архивные файлы</v-subheader> -->
            </v-flex>
            <v-flex xs8>
              <li small>
                <span class="ml-3"></span>
              </li>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3></v-flex>
            <v-flex xs9>
              <!-- <v-subheader class="title font-weight-bold"></v-subheader> -->
              <v-textarea rows="1" auto-grow name="input-7-4" label="Оставьте комментарий"></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-checkbox class="shrink ml-3"></v-checkbox>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <input class="inp ml-3" placeholder="версия" v-on="on">
            </template>
            <span>Версия изделия</span>
          </v-tooltip>

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
      dialog: true
    };
  },
  computed: {
    ...mapState({
      showUploadForm: state => state.isxx.showUploadForm
    })
  },
  watch: {},
  methods: {
    closeForm() {
      this.$store.dispatch("change_showUploadForm");
    }
  }
};
</script>
<style scoped>
.inp {
  border: 1px;
  border-color: darkgray;
  border-radius: 3px;
  border-style: solid;
  width: 75px !important;
}
.inp::placeholder {
  color: #868686 !important;
  opacity: 0.5 !important;
  font-size: 0.9em;
}
.arch {
  font-size: 0.8em;
  font-style: italic;
  cursor: pointer;
  list-style-type: none;
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
