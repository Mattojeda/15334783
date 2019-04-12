<template>
  <div>
    <v-card>
      <v-card-title>
        <ListHeader>
          <span slot="tittle">{{Messages.actsManage}}</span>
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
          :items="actListGet()"
          item-key="id"
          v-if="mode == Crud.READ"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.cicle.name}}</td>
            <td>{{ props.item.name}}</td>
            <td>{{ props.item.date | filterDate}}</td>
            <td>{{ props.item.creationDate | filterDate}}</td>
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
                <v-btn slot="activator" flat icon color="accent" @click="selectAct(props.item)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>{{Messages.edit}}</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="primary" @click="deleteAct(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{Messages.delete}}</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <template v-if="mode != Crud.READ">
          <ActForm :act="act" @saved="saveAct" @showMessage="showMessage"/>
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
import Act from "@/models/Act";
import ActForm from "@/components/ActForm.vue";
import moment from "moment";

@Component({
  components: {
    ListHeader: ListHeader,
    ActForm: ActForm
  },
  filters: {
    filterDate(value: Date) {
      return moment(value)
        .locale("es")
        .format("LL");
    }
  }
})
export default class ActsManage extends BaseController {
  @Prop() actList!: Act[];
  act = new Act();

  Crud = Crud;
  mode = Crud.READ;
  loading = false;
  headers = [
    {
      text: Messages.cicle,
      sortable: true,
      value: "cicle"
    },
    {
      text: Messages.act,
      sortable: true,
      value: "name"
    },
    {
      text: Messages.actDate,
      sortable: true,
      value: "date"
    },
    {
      text: Messages.creationDate,
      sortable: true,
      value: "creationDate"
    },
    {
      text: Messages.status,
      sortable: true,
      value: "status"
    },
    {
      text: Messages.actions,
      sortable: false,
      value: "id"
    }
  ];

  actListGet() {
    return this.actList;
  }

  changeMode() {
    this.act = new Act();
    if (this.mode == Crud.READ) {
      this.mode = Crud.CREATE;
    } else {
      this.mode = Crud.READ;
    }
  }

  saveAct(act: Act) {
    if (this.mode == Crud.CREATE) {
      act.name = this.act.type.name
      this.actList.push(act);
    }
    this.changeMode();
  }

  selectAct(act: Act) {
    this.act = act;
    this.mode = Crud.UPDATE;
  }

  deleteAct(act: Act) {
    this.actList.splice(this.actList.indexOf(act), 1);
  }
}
</script>
