<template>
  <div>
    <v-dialog v-model="findPerson" persistent width="500">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{Messages.personSearch}}</div>
            <span class="grey--text">{{Messages.search}}</span>
          </div>
        </v-card-title>
        <v-form v-model="searchForm" @submit.prevent="search()" ref="form">
          <v-card-text>
            <v-select
              v-model="user.documentType"
              return-object
              item-text="name"
              :items="data.documentTypes"
              :label="Messages.documentType"
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              v-model="user.document"
              :rules="[rules.number, rules.required]"
              type="number"
              :label="Messages.document"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="loading" :disabled="loading" type="submit">
              {{Messages.search}}
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <UserForm
      :user="user"
      v-if="!findPerson"
      @saved="userSaved"
      @showMessage="showMessage"
      :mode="Crud.CREATE"
    />
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import UserService from "@/providers/services/UserService";
import User from "@/models/User";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import UserForm from "@/components/UserForm.vue";
import Crud from "@/constants/Crud";
import Ubication from "@/models/Ubication";

@Component({
  components: {
    UserForm: UserForm
  }
})
export default class UserCreate extends BaseController {
  findPerson = true;
  Crud = Crud;
  data = Data;
  user = new User();
  searchForm = false;
  loading = false;

  search() {
    const form: any = this.$refs.form;
    form.validate();
    this.loading = false;
    if (!this.searchForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.loading = true;
      this.user = UserService.get(this.user) || this.user;
      if (this.user.email) {
        this.showMessage([new Alert(this.Messages.userFound, "success")]);
      } else {
        this.user.ubications = [new Ubication()];
        this.showMessage([new Alert(this.Messages.noUserFound, "info")]);
      }
      this.loading = false;
      this.findPerson = false;
    }
  }

  userSaved(user: User) {
    UserService.save(user).then(data => {
      this.showMessage([new Alert(this.Messages.changesSaved, "success")]);
      this.loading = false;
      this.$router.push({ path: "/usuarios" });
    });
  }
}
</script>
