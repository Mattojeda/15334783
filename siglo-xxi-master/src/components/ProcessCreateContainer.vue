<template>
  <div>
    <v-tabs dark color="primary" v-if="mode == 1" centered grow icons-and-text v-model="activeTab">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab v-for="(item, index) in steps" :href="'#'+index" :key="index">
        {{item}}
        <!-- <v-icon>person</v-icon> -->
      </v-tab>
      <v-tab-item value="0">
        <slot name="0"></slot>
      </v-tab-item>
      <v-tab-item value="1">
        <slot name="1"></slot>
      </v-tab-item>
    </v-tabs>
    <v-stepper v-else :value="activeTab">
      <v-stepper-header>
        <template v-for="(item, index) in steps">
          <v-stepper-step editable :key="index+'step'" :step="index">{{item}}</v-stepper-step>
          <v-divider :key="index+'div'"></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="0">
          <slot name="0"></slot>
        </v-stepper-content>
        <v-stepper-content step="1">
          <slot name="1"></slot>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";

@Component
export default class ProcessCreateContainer extends BaseController {
  @Prop() mode!: number;
  data = Data;
  loading = true;
  @Prop() activeTab: number = 1;

  steps = ["Información general", "Sujetos"];

  created() {}
}
</script>
