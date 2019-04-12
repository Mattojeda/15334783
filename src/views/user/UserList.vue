<template>
  <div>
    <div class="text-xs-center" v-if="usersSelected.length != 0">
      <v-btn color="primary" @click="deleteUsers()">
        {{Messages.disable}}
        <v-icon right>lock</v-icon>
      </v-btn>
      <v-btn color="accent" @click="deleteUsers()">
        {{Messages.activate}}
        <v-icon right>lock_open</v-icon>
      </v-btn>
      <v-btn color="warning" @click="deleteUsers()">
        {{Messages.block}}
        <v-icon right>block</v-icon>
      </v-btn>
    </div>
    <v-divider/>
    <v-text-field
      v-model="search"
      clear-icon="close"
      clearable
      :label="Messages.search"
      @click:clear="search = ''"
      hide-details
      v-if="usersSelected.length == 0"
      single-line
      full-width
    >
      <v-tooltip slot="append" bottom>
        <v-icon slot="activator" color="primary" @click="showFilterDialog">filter_list</v-icon>
        {{Messages.filter}}
      </v-tooltip>
    </v-text-field>
    <v-divider class="primary"/>
    <v-data-table
      v-model="usersSelected"
      :headers="headers"
      :items="userList"
      :search="search"
      :loading="loading"
      item-key="email"
      select-all
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="props.item.img">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ props.item.userName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </td>
        <td>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{props.item.email}}</v-list-tile-title>
              <v-list-tile-sub-title>{{props.item.cellphone}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </td>
        <td>{{ props.item.documentType.id +' '+ props.item.document }}</td>
        <td>{{ props.item.firstName +' '+props.item.secondName+' '+props.item.lastName+' '+props.item.secondLastName }}</td>
        <td>{{ props.item.phone }}</td>
        <td>
          <v-chip
            v-if="props.item.status == 'ACTIVE'"
            color="success"
            text-color="white"
          >{{Messages.active}}</v-chip>
          <v-chip
            v-if="props.item.status == 'BLOCK'"
            color="warning"
            text-color="white"
          >{{Messages.blocked}}</v-chip>
          <v-chip
            v-if="props.item.status == 'DISABLED'"
            color="error"
            text-color="white"
          >{{Messages.disabled}}</v-chip>
        </td>
        <td>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="accent" @click="selectUser(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>{{Messages.edit}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              slot="activator"
              flat
              icon
              color="primary"
              v-if="props.item.status != 'DISABLED'"
            >
              <v-icon>lock</v-icon>
            </v-btn>
            <span>{{Messages.disable}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="info" v-if="props.item.status != 'ACTIVE'">
              <v-icon>lock_open</v-icon>
            </v-btn>
            <span>{{Messages.activate}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="warning" v-if="props.item.status != 'BLOCK'">
              <v-icon>block</v-icon>
            </v-btn>
            <span>{{Messages.block}}</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="showFilter" max-width="800px">
      <UserForm :user="user" @saved="userSaved" @showMessage="showMessage" :mode="Crud.READ"/>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import UserService from "@/providers/services/UserService";
import Alert from "@/models/Alert";
import Data from "@/constants/Data";
import User from "@/models/User";
import UserForm from "@/components/UserForm.vue";
import Messages from "@/constants/Messages";
import Crud from "@/constants/Crud";
import Ubication from "@/models/Ubication";

@Component({
  components: {
    UserForm: UserForm
  }
})
export default class UserList extends BaseController {
  search = "";
  Crud = Crud;
  loading = true;
  showFilter = false;
  userList: any[] = [];
  usersSelected: any[] = [];
  user = new User();
  created() {
    this.user.ubications = [new Ubication()];
  }

  showFilterDialog() {
    this.showFilter = true;
    this.user = new User();
    this.user.ubications = [new Ubication()];
  }
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.userList = Data.userList;
    }, 500);
  }
  headers = [
    {
      text: Messages.userName,
      sortable: true,
      value: "userName"
    },
    {
      text: Messages.email,
      sortable: false,
      value: "email"
    },
    {
      text: Messages.document,
      sortable: true,
      value: "document"
    },
    {
      text: Messages.name,
      sortable: true,
      value: "name"
    },
    {
      text: Messages.phone,
      sortable: false,
      value: "phone"
    },
    {
      text: Messages.status,
      sortable: true,
      value: "status"
    },
    {
      text: Messages.actions,
      sortable: false
    }
  ];

  userSaved(userFilter: User) {}

  selectUser(user: any) {
    this.$router.push({ path: "/usuarios/" + user.userName });
  }

  deleteUsers() {
    this.usersSelected = [];
  }
}
</script>
