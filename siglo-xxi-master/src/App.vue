<template>
  <v-app :dark="darkTheme">
    <app-bar v-if="user" @closeSession="closeSession" :user="user"/>
    <v-content>
      <v-container fluid>
        <router-view @showMessage="showAlert" @login="login"></router-view>
      </v-container>
    </v-content>
    <app-dial @changeTheme="changeTheme"/>
    <v-snackbar
      v-for="(item,index) in Alerts"
      v-model="item.show"
      :timeout="item.timeout"
      top
      :key="index"
      :color="item.color"
    >
      {{ item.text }}
      <v-btn flat @click="item.show = false">{{Messages.close}}</v-btn>
    </v-snackbar>
    <v-footer class="pa-3" v-if="user">
      <div>&copy; {{Messages.footerContent}}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/layout/NavBar.vue";
import Dial from "@/components/layout/Dial.vue";
import BaseController from "@/providers/BaseController";
import Alert from "@/models/Alert";
import Config from "@/constants/Config";
import User from "@/models/User";
import Vuetify from "vuetify";
import SessionManage from "@/providers/SessionManage";
import { Contrast } from "@/plugins/Design";

@Component({
  components: {
    "app-bar": NavBar,
    "app-dial": Dial
  }
})
export default class App extends BaseController {
  Alerts: Alert[] = [];
  darkTheme = false;
  user?: User;
  showAlert(alerts: Alert[]) {
    this.Alerts = [];
    for (let item of alerts) {
      item.show = true;
      if (!item.timeout) item.timeout = Config.AlertTimeout;
    }
    this.Alerts = alerts;
  }

  created() {
    this.init();
    let textChanges: any = this.$vuetify.lang.locales.en;
    textChanges.noDataText = this.Messages.resultsNotFound;
    textChanges.dataIterator.noResultsText = this.Messages.resultsNotFound;
    textChanges.dataTable.rowsPerPageText = this.Messages.resultsByPage;
  }
  init() {
    this.refresh();
    this.user = SessionManage.get() || undefined;
    document.addEventListener("click", this.refresh);
  }
  timeout?: any;
  refresh() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.closeSession();
    }, Config.sesionCloseLimit);
  }

  login(user: User) {
    user.password = "";
    SessionManage.create(user);
    this.init();
    this.$router.push({ path: "/home" });
  }

  closeSession() {
    SessionManage.delete();
    this.user = undefined;
    this.$router.push({
      path: "/"
    });
    document.removeEventListener("click", this.refresh);
  }

  updated() {}

  changeTheme(contrast: Contrast) {
    this.darkTheme = contrast.dark;
    this.$vuetify.theme = contrast.theme;
  }
}
</script>

<style lang="stylus">
.theme--light.application, .theme--light.v-toolbar {
  background: var(--v-lightGrey-base);
}

.theme--light.v-sheet {
  border-color: var(--v-white-base);
}

.theme--light.v-sheet, .theme--light.v-list, .theme--light.v-table, .theme--light.v-datatable .v-datatable__actions, .theme--light.v-navigation-drawer, .theme--light.v-tabs__bar {
  background-color: var(--v-white-base);
}

.application.theme--dark .theme--dark {
  &.primary {
    background-color: #000 !important;
  }
}
</style>
