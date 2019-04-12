<template>
  <v-card flat>
    <v-form v-model="personForm" @submit.prevent="savePersonalInformation" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 v-if="!!user.identityStatus" class="text-xs-center">
              <v-chip
                label
                outline
                :color="user.identityStatus == IdentityStatus.OK ? 'primary' : 'red'"
              >{{Messages.identityStatus + ':' + user.identityStatus}}</v-chip>
            </v-flex>
            <v-flex xs12 md6 v-if="!hideIdentity">
              <v-select
                v-model="user.documentType"
                return-object
                item-text="name"
                :items="data.documentTypes"
                :label="Messages.documentType"
                :rules="mode != Crud.READ ? [rules.required] : []"
                :disabled="mode == Crud.CREATE || mode == Crud.UPDATE"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6 v-if="!hideIdentity">
              <v-text-field
                v-model="user.document"
                :label="Messages.document"
                :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                type="number"
                :disabled="mode == Crud.CREATE || mode == Crud.UPDATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="user.firstName"
                :rules="mode != Crud.READ ? [rules.required] : []"
                :label="Messages.firstName"
                :disabled="!!user.identityStatus || mode == Crud.UPDATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="user.secondName"
                :label="Messages.secondName"
                :disabled="!!user.identityStatus || mode == Crud.UPDATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="user.lastName"
                :rules="mode != Crud.READ ? [rules.required] : []"
                :label="Messages.firstLastName"
                :disabled="!!user.identityStatus || mode == Crud.UPDATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="user.secondLastName"
                :label="Messages.secondLastName"
                :disabled="!!user.identityStatus || mode == Crud.UPDATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-select
                v-model="user.gender.id"
                item-value="id"
                item-text="name"
                :items="data.genders"
                :label="Messages.gender"
                :rules="mode != Crud.READ ? [rules.required] : []"
                :disabled="!!user.identityStatus || mode == Crud.UPDATE"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-menu
                :close-on-content-click="false"
                v-model="datePicker"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                :disabled="!!user.identityStatus"
              >
                <v-text-field
                  slot="activator"
                  v-model="user.birthDate"
                  :label="Messages.birthDate"
                  prepend-icon="event"
                  :disabled="!!user.identityStatus || mode == Crud.UPDATE"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="user.birthDate" @input="datePicker = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn type="submit" color="primary">
          {{Messages.next}}
          <v-icon right>skip_next</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import User from "@/models/User";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Role from "@/models/Role";
import City from "@/models/City";
import Crud from "@/constants/Crud";
import IdentityStatus from "@/models/IdentityStatus";

@Component
export default class PersonForm extends BaseController {
  data = Data;
  @Prop() user!: User;
  @Prop() mode!: Crud;
  @Prop() hideIdentity!: boolean;
  Crud = Crud;
  loading = false;
  IdentityStatus = IdentityStatus;

  personForm = false;
  datePicker = false;

  savePersonalInformation() {
    const form: any = this.$refs.form;
    form.validate();
    if (
      !this.personForm ||
      this.user.identityStatus == this.IdentityStatus.BLOCK
    ) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.saved(this.user);
    }
  }

  @Emit("saved")
  saved(user: User) {}
}
</script>
