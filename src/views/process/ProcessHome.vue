<template>
  <v-card>
    <v-card-title>
      <ListHeader>
        <span slot="tittle">{{Messages.process}}</span>
        <v-btn slot="button" color="primary" outline @click="redirect()">
          <v-icon left v-if="!home">arrow_left</v-icon>
          {{home ? Messages.add : Messages.comeback}}
          <v-icon right v-if="home">add</v-icon>
        </v-btn>
      </ListHeader> 
    </v-card-title>
    <router-view @showMessage="showMessage"></router-view>
  </v-card>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import ListHeader from '@/components/ListHeader.vue';

@Component({
  components: {
    ListHeader: ListHeader
  }
})
export default class ProcessHome extends BaseController {
  home = true;

  redirect() {
    this.$router.push({
      path: this.home ? "/procesos/agregar" : "/procesos"
    });
  }

  @Watch("$route", { immediate: true, deep: true })
  WatchRouter(to: any, from: any) {
    this.home = this.$router.currentRoute.name == "process" ? true : false;
  }  
}
</script>
