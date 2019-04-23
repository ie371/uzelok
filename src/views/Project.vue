<template>
  <div>
    <!-- <v-layout  flex row justify-space-between>  -->
    <v-flex xs12>
      <form
        method="post"
        target="_blank"
        enctype="multipart/form-data"
        onkeypress="if(event.keyCode == 13) return false;"
      >
        <v-tabs slot="extension" v-model="model" left color slider-color="blue">
          <v-tab v-for="(zag, i) in zagData" :key="i" :href="`#tab${i}`">{{zag.name}}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="model">
          <v-tab-item id="tab0">
            <v-card flat>
              <v-card>
                <rekvi-zit></rekvi-zit>
              </v-card>
            </v-card>
          </v-tab-item>
          <v-tab-item id="tab1">
            <v-card flat>
              <v-card>
                <atm-tab></atm-tab>
              </v-card>
            </v-card>
          </v-tab-item>
          <v-tab-item id="tab2">
            <v-card flat>
              <v-card>
                <tm-tab></tm-tab>
              </v-card>
            </v-card>
          </v-tab-item>
          <v-tab-item id="tab3">
            <v-card flat>
              <v-card>
                <new-tm></new-tm>
              </v-card>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </form>
    </v-flex>
    <!-- </v-layout> -->
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

      model: "tab1"
    };
  },
  computed: {}
};
</script>
