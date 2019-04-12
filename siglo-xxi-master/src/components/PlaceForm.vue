<template>
  <v-card flat>
    <v-form v-model="placeForm" @submit.prevent="savePlace()" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field
                v-model="place.register"
                :label="Messages.placeRegister"
                :rules="[rules.number, rules.required]"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="place.id"
                :label="Messages.placeDocument"
                :rules="[rules.number, rules.required]"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="place.type"
                return-object
                item-text="name"
                :items="data.placeTypes"
                :label="Messages.placeType"
                :rules="[rules.required]"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="place.ubication.city.departament"
                return-object
                item-text="name"
                :items="data.departaments"
                :label="Messages.departament"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
                prepend-icon="location_on"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="place.ubication.city"
                return-object
                item-text="name"
                :items="data.cities"
                :label="Messages.city"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
                prepend-icon="location_on"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs4 md3>
              <v-autocomplete
                v-model="place.ubication.address.part1"
                :items="data.part1Items"
                :label="Messages.address"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
                prepend-icon="location_on"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs4 md1>
              <v-text-field
                v-model="place.ubication.address.part2"
                type="number"
                :rules="place.type == data.placeTypes[1] ? [rules.number, rules.required] : []"
                :label="Messages.addressNo"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 md2>
              <v-autocomplete
                v-model="place.ubication.address.part3"
                :items="data.part3Y5Items"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
                :label="Messages.letter"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6 md1>
              <v-text-field
                v-model="place.ubication.address.part4"
                type="number"
                :rules="place.type == data.placeTypes[1] ? [rules.number,rules.required] : []"
                :label="Messages.addressNo"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md2>
              <v-autocomplete
                v-model="place.ubication.address.part5"
                :items="data.part3Y5Items"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
                :label="Messages.letter"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6 md1>
              <v-text-field
                v-model="place.ubication.address.part6"
                type="number"
                :rules="place.type == data.placeTypes[1] ? [rules.number, rules.required] : []"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md2>
              <v-autocomplete
                v-model="place.ubication.address.part7"
                :items="data.part7Items"
                :rules="place.type == data.placeTypes[1] ? [rules.required] : []"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              <v-select
                v-model="place.population"
                item-value="id"
                item-text="name"
                :items="populationStatus"
                :label="Messages.population"
                :rules="[rules.required]"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="place.area"
                :rules="[rules.number, rules.required]"
                type="number"
                :label="Messages.area"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-select
                v-model="place.measure"
                return-object
                :items="data.measures"
                :label="Messages.measure"
                :rules="[rules.required]"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="place.zone"
                :items="data.microZones"
                :rules="[]"
                :label="Messages.zone"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 v-if="place.type == data.placeTypes[1]">
              <v-text-field
                v-model="place.district"
                :rules="[rules.required]"
                :label="Messages.district"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="place.type == data.placeTypes[0]">
              <v-text-field v-model="place.name" :rules="[rules.required]" :label="Messages.name"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="place.type == data.placeTypes[0]">
              <v-text-field
                v-model="place.inspection"
                :rules="[rules.required]"
                :label="Messages.inspection"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="place.type == data.placeTypes[0]">
              <v-text-field
                v-model="place.vereda"
                :rules="[rules.required]"
                :label="Messages.vereda"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="place.type == data.placeTypes[0]">
              <v-text-field
                v-model="place.corregimiento"
                :rules="[rules.required]"
                :label="Messages.corregimiento"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                box
                :label="Messages.description"
                :rules="[rules.required]"
                auto-grow
                v-model="place.description"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" type="submit">
          {{Messages.save}}
          <v-icon right>save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Crud from "@/constants/Crud";
import IdentityStatus from "@/models/IdentityStatus";
import Place from "@/models/Place";
import PopulationStatus from "@/models/PopulationStatus";

@Component
export default class PlaceForm extends BaseController {
  data = Data;
  @Prop() place!: Place;
  loading = false;
  populationStatus = [
    {
      id: PopulationStatus.REGULAR,
      name: PopulationStatus.REGULAR
    },
    {
      id: PopulationStatus.PELIGRO,
      name: PopulationStatus.PELIGRO
    }
  ];

  placeForm = false;

  savePlace() {
    const form: any = this.$refs.form;
    form.validate();
    if (!this.placeForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.saved(this.place);
    }
  }

  @Emit("saved")
  saved(place: Place) {}
}
</script>
