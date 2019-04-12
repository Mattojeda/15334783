<template>
  <div>
    <v-card>
      <v-card-title>
        <ListHeader>
          <span slot="tittle">{{Messages.factsManage}}</span>
          <v-btn slot="button" color="primary" outline @click="changeMode()">
            <v-icon left v-if="mode != Crud.READ">arrow_left</v-icon>
            {{mode == Crud.READ ? Messages.add : Messages.comeback}}
            <v-icon right v-if="mode == Crud.READ">add</v-icon>
          </v-btn>
        </ListHeader>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="factsListGet()"
          item-key="id"
          v-if="mode == Crud.READ"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.ubication.city.departament.name}}</td>
            <td>{{ props.item.ubication.city.name}}</td>
            <td>
              {{ props.item.ubication.address.part1+ ' ' +
              props.item.ubication.address.part2 + ' ' +
              props.item.ubication.address.part3+ ' # ' +
              props.item.ubication.address.part4+' ' +
              props.item.ubication.address.part5+ ' - ' +
              props.item.ubication.address.part6+' ' +
              props.item.ubication.address.part7}}
            </td>
            <td>{{ props.item.date | filterDate}}</td>
            <td>{{ props.item.longitude}}</td>
            <td>{{ props.item.latitude}}</td>
            <td>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="primary" @click="deleteFact(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{Messages.delete}}</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <template v-if="mode != Crud.READ">
          <FactForm @saved="createFact" @showMessage="showMessage"/>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Crud from "@/constants/Crud";
import Messages from "@/constants/Messages";
import BaseController from "@/providers/BaseController";
import ListHeader from "@/components/ListHeader.vue";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Config from "@/constants/Config";
import Fact from "@/models/Fact";
import FactForm from "@/components/FactForm.vue";
import moment from "moment";

@Component({
  components: {
    ListHeader: ListHeader,
    FactForm: FactForm
  },
  filters: {
    filterDate(value: Date) {
      return moment(value)
        .locale("es")
        .format("LL");
    }
  }
})
export default class FactsManage extends BaseController {
  @Prop() factsList!: Fact[];

  Crud = Crud;
  mode = Crud.READ;
  loading = false;
  headers = [
    {
      text: Messages.departament,
      sortable: true,
      value: "ubication.city.departament.name"
    },
    {
      text: Messages.city,
      sortable: true,
      value: "ubication.city.name"
    },
    {
      text: Messages.address,
      sortable: false,
      value: "ubication"
    },
    {
      text: Messages.date,
      sortable: true,
      value: "date"
    },
    {
      text: Messages.longitude,
      sortable: true,
      value: "longitude"
    },
    {
      text: Messages.latitude,
      sortable: true,
      value: "latitude"
    },
    {
      text: Messages.actions,
      sortable: false,
      value: "id"
    }
  ];

  factsListGet() {
    return this.factsList;
  }

  changeMode() {
    if (this.mode == Crud.READ) {
      this.mode = Crud.CREATE;
    } else {
      this.mode = Crud.READ;
    }
  }

  createFact(fact: Fact) {
    this.factsList.push(fact);
    this.changeMode()
  }

  deleteFact(fact: Fact) {
    this.factsList.splice(this.factsList.indexOf(fact), 1);
  }
}
</script>
