<template>
  <div>
    <v-dialog v-model="showCoForm" persistent width="750px">
      <v-card>
        <v-card-title class="white--text grey darken-2 py-4">Изменения документа</v-card-title>

        <v-container grid-list-sm class="pa-3">
          <v-layout align-start justify-center column fill-height>
            <!-- <v-flex xs3> -->
            <label>
              <input class="inp" placeholder="Qco">
              нагрузка отопления, Гкал/ч
            </label>
            <label>
              <input class="inp" placeholder="Qco">
              нагрузка отопления, Гкал/ч
            </label>
            <label>
              <input class="inp" placeholder="Qco">
              нагрузка отопления, Гкал/ч
            </label>
            <!-- </v-flex> -->
          </v-layout>
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
      dialog: true
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
  margin-bottom: 0.7em;
  padding-left: 0.3em;
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
