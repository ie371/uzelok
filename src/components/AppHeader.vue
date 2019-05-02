<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-tile v-for="(item,i) in menuItems" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title v-text="'HOME'"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item,i) in menuItems" flat :key="i" :to="item.route">
          <v-icon left v-html="item.icon"></v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat @click.prevent="signout">
          <v-icon left>exit_to_app</v-icon>Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    menuItems() {
      return [
        {
          icon: "build",
          title: "start",
          route: "/home"
        },
        {
          icon: "build",
          title: "Проект",
          route: "/project"
        }
      ];
    }
  },
  methods: {
    signout() {
      //   this.$store.dispatch("SIGNOUT");
      this.$router.push("/home");
    }
  }
};
</script>
