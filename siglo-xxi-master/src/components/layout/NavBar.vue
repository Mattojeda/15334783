<template>
  <nav app>
    <v-toolbar app>
      <v-toolbar-side-icon color="primary--text" @click="drawer = ! drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline">
        <span class="font-weight-light primary--text">{{Messages.appName}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left offset-y>
        <v-list-tile avatar slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{user.firstName+ ' '+ user.lastName}}</v-list-tile-title>
            <v-list-tile-sub-title>
              <span class="text--primary">{{user.role.name}}</span> &mdash; {{user.role.office.name}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <img :src="user.img" :alt="user.firstName">
          </v-list-tile-avatar>
        </v-list-tile>
        <v-list>
          <v-list-tile @click="selectRoleModal = true">
            <v-list-tile-title>{{Messages.changeRole}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>autorenew</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="closeSession">
            <v-list-tile-title>{{Messages.closeSession}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>power</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer">
      <v-img :src="require('@/assets/logo.png')" contain></v-img>
      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, index) in MenuItems">
          <v-list-tile :key="index" v-if="item.childs.length == 0" @click="redirect(item.path)">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile>
          <v-list-group :prepend-icon="item.icon" :key="index" v-if="item.childs.length != 0">
            <v-list-tile slot="activator">
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
            </v-list-tile>
            <template v-for="(itemChild, indexChild) in item.childs">
              <v-list-tile
                :key="indexChild"
                v-if="itemChild.childs.length == 0"
                @click="redirect(itemChild.path)"
              >
                <v-list-tile-title>{{itemChild.name}}</v-list-tile-title>
                <v-list-tile-action>
                  <v-icon>{{itemChild.icon}}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-group
                :prepend-icon="itemChild.icon"
                :key="indexChild"
                v-if="itemChild.childs.length != 0"
                no-action
                sub-group
              >
                <v-list-tile slot="activator">
                  <v-list-tile-title>{{itemChild.name}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                  v-for="(itemChild2, indexChild2) in itemChild.childs"
                  :key="indexChild2"
                  @click="redirect(itemChild2.path)"
                >
                  <v-list-tile-title>{{itemChild2.name}}</v-list-tile-title>
                  <v-list-tile-action>
                    <v-icon>{{itemChild2.icon}}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="selectRoleModal" max-width="500" persistent>
      <RoleSelection @selectedRole="selectedRole" :roles="user.roles"></RoleSelection>
    </v-dialog>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import { MenuItems } from "@/constants/Menu";
import BaseController from "@/providers/BaseController";
import RoleSelection from "@/components/RoleSelection.vue";
import User from "@/models/User";
import Role from "@/models/Role";

@Component({
  components: {
    RoleSelection: RoleSelection
  }
})
export default class NavBar extends BaseController {
  @Prop() user!: User;
  drawer = false;
  MenuItems = MenuItems;
  selectRoleModal = false;

  redirect(path: string) {
    this.drawer = false;
    this.$router.push({ path: path });
  }

  @Emit("closeSession")
  closeSession() {}

  selectedRole(role: Role) {
    this.user.role = role;
    this.selectRoleModal = false;
  }
}
</script>
