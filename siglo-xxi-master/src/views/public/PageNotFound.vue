<template>
  <v-container  grid-list-md>
    <v-layout align-center justify-center row fill-height>
      <v-flex class="text-xs-center">
        <div class="display-4 primary--text">
          <v-icon class="bigger" color="accent">block</v-icon>404
          <v-icon class="bigger" color="accent">block</v-icon>
        </div>
        <span class="display-1 primary--text">Pagina no encontrada
          <div class="text-xs-center">
            <v-btn fab large color="primary" @click="redirectHome()">
              <v-icon>home</v-icon>
            </v-btn>
          </div>
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";

@Component
export default class PageNotFound extends BaseController {
  redirectHome() {
    this.$router.push({ path: "/" });
  }
}
</script>

<style lang="stylus" scoped>
i.v-icon.bigger {
  font-size: 120px;
}
</style>
