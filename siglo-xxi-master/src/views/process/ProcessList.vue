<template>
  <div>
    <v-divider/>
    <v-text-field
      v-model="search"
      clear-icon="close"
      clearable
      :label="Messages.search"
      @click:clear="search = ''"
      hide-details
      single-line
      full-width
      append-icon="filter_list"
    ></v-text-field>
    <v-divider class="primary"/>
    <v-data-table
      :headers="headers"
      :items="processList"
      :search="search"
      :loading="loading"
      item-key="id"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id}}</td>
        <td>{{ props.item.processType.name}}</td>
        <td>{{ props.item.subProcessClass.processClass.name}}</td>
        <td>{{ props.item.office.name}}</td>
        <td>{{ props.item.judge.document}}</td>
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
        </td>
        <td>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="accent" @click="selectProcess(props.item)">
              <v-icon>search</v-icon>
            </v-btn>
            <span>{{Messages.edit}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              slot="activator"
              flat
              icon
              color="secondary"
              @click="inspectSubjects(props.item)"
            >
              <v-icon>people</v-icon>
            </v-btn>
            <span>{{Messages.fellows}}</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-if="seeSubjects" v-model="seeSubjects" width="800">
      <v-card>
        <v-card-title primary-title>
          <v-toolbar-title>{{Messages.fellows}}</v-toolbar-title>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-list three-line>
            <v-list-tile v-for="(item, index) in processSelected.subjectList" :key="index" avatar>
              <v-list-tile-avatar>
                <v-icon>person</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.firstName+ ' ' + item.secondName+ ' ' + item.lastName+ ' ' + item.secondLastName }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{ item.type.name }}</span>
                  &mdash;
                  {{ item.documentType.id ? item.documentType.id : '' +' '}}{{item.document}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn
            color="primary"
            outline
            :loading="loading"
            :disabled="loading"
            @click="seeSubjects = false;processSelected = undefined"
          >
            <v-icon left>close</v-icon>
            {{Messages.close}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Alert from "@/models/Alert";
import Data from "@/constants/Data";
import Messages from "@/constants/Messages";
import Crud from "@/constants/Crud";
import Ubication from "@/models/Ubication";
import moment from "moment";
import Process from "@/models/Process";

@Component({
  filters: {
    filterDate(value: Date) {
      return moment(value)
        .locale("es")
        .format("LL");
    }
  }
})
export default class ProcessList extends BaseController {
  search = "";
  loading = true;
  processList: Process[] = [];
  seeSubjects = false;
  processSelected?: Process;
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.processList = Data.processList;
    }, 500);
  }
  headers = [
    {
      text: Messages.processSingle,
      sortable: true,
      value: "id"
    },
    {
      text: Messages.processType,
      sortable: false,
      value: "processType.name"
    },
    {
      text: Messages.processClass,
      sortable: true,
      value: "subProcessClass.processClass.name"
    },
    {
      text: Messages.judgePlace,
      sortable: true,
      value: "office.name"
    },
    {
      text: Messages.judge,
      sortable: true,
      value: "judge.document"
    },
    ,
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
      sortable: false
    }
  ];

  inspectSubjects(process: Process) {
    this.processSelected = process;
    this.seeSubjects = true
  }

  selectProcess(process: Process) {
    this.$router.push({ path: "/procesos/" + process.id });
  }
}
</script>
