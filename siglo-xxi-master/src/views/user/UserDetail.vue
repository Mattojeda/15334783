<template>
  <div v-if="user">
    <div class="text-xs-center">
      <v-btn color="primary" v-if="user.status != 'DISABLED'">
        {{Messages.disable}}
        <v-icon right>lock</v-icon>
      </v-btn>
      <v-btn color="accent" v-if="user.status != 'ACTIVE'">
        {{Messages.activate}}
        <v-icon right>lock_open</v-icon>
      </v-btn>
      <v-btn color="warning" v-if="user.status != 'BLOCK'">
        {{Messages.block}}
        <v-icon right>block</v-icon>
      </v-btn>
    </div>
    <UserForm :user="user" @saved="userSaved" @showMessage="showMessage" :mode="Crud.UPDATE"/>
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

@Component({
  components: {
    UserForm: UserForm
  }
})
export default class UserDetail extends BaseController {
  findPerson = true;
  Crud = Crud;
  data = Data;
  user?: User = new User();

  loading = false;

  created() {
    this.user!.userName = this.$router.currentRoute.params.idUser;
    let user = UserService.getByUserName(this.user!);
    if (user) {
      this.user = user;
    } else {
      this.user = undefined;
      this.showMessage([new Alert(this.Messages.noUserFound, "info")]);
      this.$router.push({ path: "/usuarios" });
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
