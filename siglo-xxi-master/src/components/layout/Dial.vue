<template>
  <v-speed-dial v-model="show" bottom right direction="left" fixed>
    <v-btn slot="activator" v-model="show" fab color="accent">
      <v-icon large>accessibility_new</v-icon>
      <v-icon large>close</v-icon>
    </v-btn>
    <template v-for="(item, index) in contrasts">
      <v-tooltip top :key="index">
        <v-btn fab slot="activator" :class="item.class" medium @click="changeTheme(item)">
          <v-icon medium>{{item.icon}}</v-icon>
        </v-btn>
        <span>{{item.text}}</span>
      </v-tooltip>
    </template>
  </v-speed-dial>
</template>

<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import { Constrasts, Theme, Contrast } from "@/plugins/Design";

@Component
export default class Dial extends BaseController {
  show = false;

  contrasts = Constrasts;

  @Emit("changeTheme")
  changeTheme(contrast: Contrast) {}
}
</script>
