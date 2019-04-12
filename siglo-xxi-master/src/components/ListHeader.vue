<template>
  <v-toolbar flat>
    <v-toolbar-title>
      <slot name="tittle"/>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="button"/>
  </v-toolbar>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";

@Component
export default class ListHeader extends BaseController {}
</script>

