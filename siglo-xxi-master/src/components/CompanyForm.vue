<template>
  <v-card flat>
    <v-form v-model="companyForm" @submit.prevent="saveForm" ref="form">
      <v-card-text>
        <v-container  grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field
                v-model="company.document"
                :label="Messages.nit"
                :rules="[rules.required]"
                :disabled="mode == Crud.CREATE"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="company.firstName"
                :rules="[rules.required]"
                :label="Messages.companyName"
                :disabled="mode == Crud.CREATE"
              ></v-text-field>
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
import Alert from "@/models/Alert";
import Person from "@/models/Person";
import Crud from "@/constants/Crud";

@Component
export default class CompanyForm extends BaseController {
  @Prop() company!: Person;
  loading = false;
  @Prop() mode!: Crud;
  Crud = Crud;
  companyForm = false;

  saveForm() {
    const form: any = this.$refs.form;
    form.validate();
    if (!this.companyForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.saved(this.company);
    }
  }

  @Emit("saved")
  saved(company: Person) {}
}
</script>
