<template>
  <div>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="model" left color slider-color="blue">
        <v-tab v-for="(zag, i) in zagData" :key="i" :href="`#tab${i}`">{{zag.name}}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">
        <v-tab-item value="tab0">
          <v-card flat>
            <v-card>
              <rekvi-zit></rekvi-zit>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab1">
          <v-card flat>
            <v-card>
              <atm-tab></atm-tab>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab2">
          <tm-tab></tm-tab>
        </v-tab-item>
        <v-tab-item value="tab3">
          <new-tm></new-tm>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </div>
</template>

<script>
import RekviZit from "@/components/rekvizit.vue";
import AtmTab from "@/components/atm.vue";
import TmTab from "@/components/tm.vue";
import NewTm from "@/components/NewTm.vue";

export default {
  components: {
    RekviZit,
    AtmTab,
    TmTab,
    NewTm
  },
  data() {
    return {
      zagData: [
        { name: "Реквизиты" },
        { name: "АТМ" },
        { name: "ТМ" },
        { name: "newТМ" }
      ],

      model: "tab3"
    };
  },
  computed: {}
};
</script>
<style scoped>
</style>