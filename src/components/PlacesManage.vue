<template>
  <div>
    <v-card>
      <v-card-title>
        <ListHeader>
          <span slot="tittle">{{Messages.placeManage}}</span>
          <v-btn v-if="!hideAddition" slot="button" color="primary" outline @click="changeMode()">
            <v-icon left v-if="mode != Crud.READ">arrow_left</v-icon>
            {{mode == Crud.READ ? Messages.add : Messages.comeback}}
            <v-icon right v-if="mode == Crud.READ">add</v-icon>
          </v-btn>
        </ListHeader>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="placeListGet()"
          item-key="id"
          v-if="mode == Crud.READ"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.ubication.city.departament.name}}</td>
            <td>{{ props.item.ubication.city.name}}</td>
            <td>{{ props.item.register}}</td>
            <td>{{ props.item.type.name}}</td>
            <td>{{ props.item.id}}</td>
            <td>{{ props.item.description}}</td>
            <td>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="primary" @click="deletePlace(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{Messages.delete}}</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <template v-if="mode != Crud.READ">
          <PlaceForm :place="newPlace" @saved="createPlace" @showMessage="showMessage"/>
        </template>
      </v-card-text>
    </v-card>
    <v-dialog v-model="searchPlace" width="500">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{Messages.placeManage}}</div>
            <span class="grey--text">{{Messages.search}}</span>
          </div>
        </v-card-title>
        <v-form @submit.prevent="search()" ref="form">
          <v-card-text>
            <v-radio-group v-model="searchType" :mandatory="false">
              <v-radio :label="Messages.placeRegister" :value="1"></v-radio>
              <v-radio :label="Messages.placeDocument" :value="2"></v-radio>
            </v-radio-group>
            <v-text-field
              v-if="searchType == 1"
              v-model="newPlace.register"
              :label="Messages.placeRegister"
              :rules="[rules.number, rules.required]"
              type="number"
            ></v-text-field>
            <v-text-field
              v-if="searchType == 2"
              v-model="newPlace.id"
              :label="Messages.placeDocument"
              :rules="[rules.number, rules.required]"
              type="number"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              outline
              @click="closeModal()"
              :loading="loading"
              :disabled="loading"
              type="button"
            >
              <v-icon left>close</v-icon>
              {{Messages.back}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="loading" :disabled="loading" type="submit">
              {{Messages.search}}
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
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
import Place from "@/models/Place";
import PlaceService from "@/providers/services/PlaceService";
import PlaceForm from "@/components/PlaceForm.vue";

@Component({
  components: {
    ListHeader: ListHeader,
    PlaceForm: PlaceForm
  }
})
export default class PlacesManage extends BaseController {
  @Prop() placeList!: Place[];
  @Prop() hideAddition!: boolean;
  searchPlace = false;
  placeTypes = Data.placeTypes;
  Crud = Crud;
  mode = Crud.READ;
  newPlace: Place = new Place();
  loading = false;
  searchType: number = 1;
  headers = [
    {
      text: Messages.departament,
      sortable: false,
      value: "ubication.city.departament.name"
    },
    {
      text: Messages.city,
      sortable: false,
      value: "ubication.city.name"
    },
    {
      text: Messages.placeRegister,
      sortable: true,
      value: "register"
    },
    {
      text: Messages.placeType,
      sortable: false,
      value: "type.id"
    },
    {
      text: Messages.placeDocument,
      sortable: true,
      value: "id"
    },
    {
      text: Messages.description,
      sortable: true,
      value: "name"
    },
    {
      text: Messages.actions,
      sortable: false,
      value: "id"
    }
  ];

  placeListGet() {
    return this.placeList;
  }

  search() {
    const form: any = this.$refs.form;
    form.validate();
    this.loading = false;
    if (
      (this.searchType == 1 && !this.newPlace.register) ||
      (this.searchType == 2 && !this.newPlace.id)
    ) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      if (this.searchType == 1) {
        this.newPlace.id = undefined;
      } else if (this.searchType == 2) {
        this.newPlace.register = undefined;
      }
      this.loading = true;
      this.newPlace = PlaceService.get(this.newPlace) || this.newPlace;
      if (this.newPlace.name) {
        this.createPlace();
        this.showMessage([new Alert(this.Messages.placeFound, "success")]);
        this.mode = Crud.READ;
      } else {
        this.showMessage([new Alert(this.Messages.noPlaceFound, "info")]);
        let temp: any = {};
        Object.assign(temp, this.newPlace);
        this.newPlace = new Place();
        this.newPlace.id = temp.id;
        this.newPlace.register = temp.register;
        this.mode = Crud.CREATE;
      }
      this.loading = false;
      this.searchPlace = false;
    }
  }

  changeMode() {
    if (this.mode == Crud.READ) {
      this.searchPlace = true;
    } else {
      this.searchPlace = false;
      this.mode = Crud.READ;
    }
  }

  createPlace() {
    this.placeList.push(this.newPlace);
    this.closeModal();
  }

  closeModal() {
    this.searchPlace = false;
    this.mode = Crud.READ;
    this.newPlace = new Place();
  }

  deletePlace(item: Place) {
    this.placeList.splice(this.placeList.indexOf(item), 1);
  }
}
</script>
