<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>{{Messages.selectARole}}</v-toolbar-title>
    </v-toolbar>
    <v-list three-line>
      <v-list-tile v-for="(item, index) in roles" :key="index" avatar @click="selectedRole(item)">
        <v-list-tile-avatar>
          <v-icon>person</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span class="text--primary">{{ item.office.name }}</span>
            &mdash;
            {{ item.office.corporation.name }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="accent">crop_square</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import LoginService from "@/providers/services/LoginService";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Role from "@/models/Role";

@Component
export default class RoleSelection extends BaseController {
  @Prop() roles?: Role[];

  @Emit("selectedRole")
  selectedRole(item: Role) {}
}
</script>
