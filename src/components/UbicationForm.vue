<template>
  <div>
    <v-dialog v-model="modal" width="800">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{Messages.address}}</div>
            <span class="grey--text">{{Messages.add}}</span>
          </div>
        </v-card-title>
        <v-form v-model="ubicationForm" @submit.prevent="save" ref="form">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-select
                    v-model="ubication.name"
                    return-object
                    :items="names"
                    :label="Messages.name"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="ubication.city.departament"
                    return-object
                    item-text="name"
                    :items="data.departaments"
                    :label="Messages.departament"
                    :rules="[rules.required]"
                    prepend-icon="location_on"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="ubication.city"
                    return-object
                    item-text="name"
                    :items="data.cities"
                    :label="Messages.city"
                    :rules="[rules.required]"
                    prepend-icon="location_on"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4 md3>
                  <v-autocomplete
                    v-model="ubication.address.part1"
                    :items="data.part1Items"
                    :label="Messages.address"
                    :rules="[rules.required]"
                    prepend-icon="location_on"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4 md1>
                  <v-text-field
                    v-model="ubication.address.part2"
                    :rules="[rules.number, rules.required]"
                    type="number"
                    :label="Messages.addressNo"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 md2>
                  <v-autocomplete
                    v-model="ubication.address.part3"
                    :items="data.part3Y5Items"
                    :rules="[rules.required]"
                    :label="Messages.letter"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6 md1>
                  <v-text-field
                    v-model="ubication.address.part4"
                    :rules="[rules.number, rules.required]"
                    type="number"
                    :label="Messages.addressNo"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 md2>
                  <v-autocomplete
                    v-model="ubication.address.part5"
                    :items="data.part3Y5Items"
                    :rules="[rules.required]"
                    :label="Messages.letter"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6 md1>
                  <v-text-field
                    v-model="ubication.address.part6"
                    :rules="[rules.number, rules.required]"
                    type="number"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 md2>
                  <v-autocomplete
                    v-model="ubication.address.part7"
                    :items="data.part7Items"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" outline @click="modal = false" type="button">
              <v-icon left>close</v-icon>
              {{Messages.back}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">
              {{Messages.add + ' ' + Messages.address}}
              <v-icon right>save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-list two-line>
      <template v-for="(item, index) in ubicationList">
        <v-list-tile :key="index" ripple>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ item.city.name }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ item.address.part1+ ' ' +item.address.part2 + ' ' +item.address.part3+ ' # ' +item.address.part4+' ' +item.address.part5+ ' - ' +item.address.part6+' ' +item.address.part7}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ item.city.departament.name }}</v-list-tile-action-text>
            <v-icon @click="edit(item, index)">edit</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < ubicationList.length" :key="index+'div'"></v-divider>
      </template>
      <v-divider></v-divider>
      <v-list-tile ripple>
        <v-list-tile-content>
          <div class="text-xs-center widther">
            <v-btn @click="modal = true" color="primary">
              {{Messages.add + ' ' + Messages.address}}
              <v-icon right>add</v-icon>
            </v-btn>
          </div>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Messages from "@/constants/Messages";
import Ubication from "@/models/Ubication";

@Component
export default class UbicationForm extends BaseController {
  @Prop() ubicationList!: Ubication[];
  ubication = new Ubication();
  ubicationForm = false;
  data = Data;
  modal = false;
  names = ["Oficina", "Residencia"];

  save() {
    const form: any = this.$refs.form;
    form.validate();
    if (!this.ubicationForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      for (const item of this.ubicationList) {
        if (item.name == this.ubication.name) {
          this.ubicationList.splice(this.ubicationList.indexOf(item), 1);
          break;
        }
      }
      this.ubicationList.push(this.ubication);
      this.ubication = new Ubication();
      this.modal = false;
    }
  }

  edit(item: Ubication, indexToDelete: number) {
    this.ubication = item;
    this.ubicationList.splice(indexToDelete, 1);
    this.modal = true;
  }
}
</script>

<style>
.widther {
  width: 100%;
}
</style>

