<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex sm6 md3 v-for="(item, index) in stats" :key="index">
        <v-card
          class="mx-auto text-xs-center"
          max-width="600"
          :color=" item.selected ? 'primary': ''"
          :dark=" item.selected"
        >
          <v-card-text>
            <v-progress-circular
              :rotate="90"
              :size="100"
              :width="15"
              :value="item.value"
              :color="item.color"
            >{{item.value}}</v-progress-circular>
          </v-card-text>
          <v-card-text>
            <div class="display-1 font-weight-thin">{{item.text}}</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn v-if="item.selected" block color="primary" @click="hideTable()">{{Messages.hide}}</v-btn>
            <v-btn v-else block flat @click="showTable(item)">{{item.button}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-expand-transition>
        <v-flex sm12 v-if="table">
          <v-divider class="primary"/>
          <v-data-table
            :headers="headers"
            :items="userList"
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
                    <v-list-tile-title>{{props.item.email}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{props.item.cellphone}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </td>
              <td>{{ props.item.documentType.id +' '+ props.item.document }}</td>
              <td>{{ props.item.name +' '+props.item.secondName+' '+props.item.lastName+' '+props.item.secondLastName }}</td>
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
                <v-btn flat icon color="accent" @click="selectUser(props.item)">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn flat icon color="primary" v-if="props.item.status != 'DISABLED'">
                  <v-icon>lock</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-expand-transition>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Messages from "@/constants/Messages";

@Component
export default class Home extends BaseController {
  stats = [
    {
      value: 30,
      color: "info",
      text: "Procesos por vencer",
      button: "Ver procesos",
      selected: false
    },
    {
      value: 80,
      color: "warning",
      text: "Procesos Vencidos",
      button: "Ver procesos",
      selected: false
    },
    {
      value: 10,
      color: "accent",
      text: "Cierres por revisar",
      button: "Ver cierres",
      selected: false
    },
    {
      value: 54,
      color: "secondary",
      text: "Libro diario",
      button: "Ver libro diario",
      selected: false
    }
  ];

  value = [423, 446, 675, 510, 590, 610, 760];

  headers = [
    {
      text: Messages.email,
      sortable: true,
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
      sortable: false,
      value: "status"
    },
    {
      text: Messages.actions,
      sortable: false
    }
  ];
  userList = Data.userList;

  table = false;

  showTable(item: any) {
    this.hideTable();
    item.selected = true;
    setTimeout(() => {
      this.table = true;
    }, 500);
  }

  hideTable() {
    for (let item2 of this.stats) {
      this.table = false;
      item2.selected = false;
    }
  }
}
</script>