<template>
  <v-card flat>
    <v-form v-model="factForm" @submit.prevent="saveFact()" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="fact.ubication.city.departament"
                return-object
                item-text="name"
                :items="data.departaments"
                :label="Messages.departament"
                :rules="[rules.required]"
                prepend-icon="location_on"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="fact.ubication.city"
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
                v-model="fact.ubication.address.part1"
                :items="data.part1Items"
                :label="Messages.address"
                :rules="[rules.required]"
                prepend-icon="location_on"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs4 md1>
              <v-text-field
                v-model="fact.ubication.address.part2"
                :rules="[rules.number, rules.required]"
                type="number"
                :label="Messages.addressNo"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 md2>
              <v-autocomplete
                v-model="fact.ubication.address.part3"
                :items="data.part3Y5Items"
                :rules="[rules.required]"
                :label="Messages.letter"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6 md1>
              <v-text-field
                v-model="fact.ubication.address.part4"
                :rules="[rules.number, rules.required]"
                type="number"
                :label="Messages.addressNo"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md2>
              <v-autocomplete
                v-model="fact.ubication.address.part5"
                :items="data.part3Y5Items"
                :rules="[rules.required]"
                :label="Messages.letter"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6 md1>
              <v-text-field
                v-model="fact.ubication.address.part6"
                :rules="[rules.number, rules.required]"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md2>
              <v-autocomplete
                v-model="fact.ubication.address.part7"
                :items="data.part7Items"
                :rules="[rules.required]"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                v-model="fact.longitude"
                :rules="[rules.number, rules.required]"
                type="number"
                :label="Messages.longitude"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                v-model="fact.latitude"
                :rules="[rules.number, rules.required]"
                type="number"
                :label="Messages.latitude"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-menu
                :close-on-content-click="false"
                v-model="showDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="fact.date"
                  :label="Messages.factDate"
                  prepend-icon="event"
                  :rules="[rules.required]"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="fact.date" @input="showDate = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md6>
              <v-textarea
                box
                :label="Messages.factPlaceDescription"
                :rules="[rules.required]"
                auto-grow
                v-model="fact.placeDescription"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 md6>
              <v-textarea
                box
                :label="Messages.factDescription"
                :rules="[rules.required]"
                auto-grow
                v-model="fact.description"
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
import Fact from "@/models/Fact";

@Component
export default class FactForm extends BaseController {
  data = Data;
  fact = new Fact();
  loading = false;
  showDate = false;

  factForm = false;

  saveFact() {
    const form: any = this.$refs.form;
    form.validate();
    if (!this.factForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.saved(this.fact);
    }
  }

  @Emit("saved")
  saved(fact: Fact) {}
}
</script>
