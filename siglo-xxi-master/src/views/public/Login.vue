<template>
  <div class="login">
    <v-card>
      <v-img :src="require('@/assets/logo.png')"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{Messages.appName}}</div>
          <span class="grey--text">{{remember ? Messages.rememberPassword: Messages.login}}</span>
        </div>
      </v-card-title>
      <v-form
        v-if="remember"
        v-model="rememberFormValid"
        @submit.prevent="finishRemember()"
        ref="formRemember"
      >
        <v-card-text>
          <v-text-field v-model="user.email" :rules="[rules.email, rules.required]" :label="Messages.email"></v-text-field>
          <v-text-field
            v-model="user.userName"
            :rules="[rules.required]"
            :label="Messages.userName"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            flat
            color="secondary"
            :loading="loading"
            @click="remember = false;"
            :disabled="loading"
            type="button"
          >{{Messages.back}}</v-btn>
          <v-btn block outline color="primary" :loading="loading" :disabled="loading" type="submit">
            {{Messages.send}}
            <v-icon right>send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-form v-model="formValid" v-else @submit.prevent="login()" ref="form">
        <v-card-text>
          <v-text-field
            v-model="user.userName"
            :rules="[rules.required]"
            :label="Messages.userName"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :label="Messages.password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="text-xs-center" v-if="attempts >= 1">
            <vue-recaptcha sitekey="6LfzJ5kUAAAAANhdPehMx0eZmE7Oblrpuzqiw7k5"></vue-recaptcha>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            flat
            color="secondary"
            :loading="loading"
            @click="remember = true;"
            :disabled="loading"
            type="button"
          >{{Messages.rememberPassword}}</v-btn>
          <v-btn block outline color="primary" :loading="loading" :disabled="loading" type="submit">
            {{Messages.access}}
            <v-icon right>send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-dialog v-model="selectRoleModal" max-width="500" persistent>
      <RoleSelection @selectedRole="selectedRole" :roles="Data.roles"></RoleSelection>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Emit } from "vue-property-decorator";
import LoginService from "@/providers/services/LoginService";
import UserService from "@/providers/services/UserService";
import BaseController from "@/providers/BaseController";
import RoleSelection from "@/components/RoleSelection.vue";
import Alert from "@/models/Alert";
import User from "@/models/User";
import Role from "@/models/Role";
import Data from "@/constants/Data";
import VueRecaptcha from "vue-recaptcha";

@Component({
  components: {
    RoleSelection: RoleSelection,
    "vue-recaptcha": VueRecaptcha
  }
})
export default class Login extends BaseController {
  formValid = false;
  rememberFormValid = false;
  showPassword = false;
  user = new User();
  loading = false;
  selectRoleModal = false;
  Data = Data;
  remember = false;
  attempts = 0;

  login() {
    this.loading = false;
    const form: any = this.$refs.form;
    form.validate();
    if (!this.formValid) {
      this.showMessage([
        new Alert(this.Messages.errors.loginError, "error")
      ]);
    } else {
      this.loading = true;
      LoginService.createLogin(this.user).then(data => {
        this.attempts++;
        let user = UserService.getByUserName(this.user);
        if (user) {
          this.user = user;
          this.selectRoleModal = true;
        } else {
          if (this.attempts >= 3) {
            this.remember = true;
          }
          this.showMessage([new Alert(this.Messages.errors.loginError, "error")]);
        }
        this.loading = false;
      });
    }
  }

  selectedRole(role: Role) {
    this.selectRoleModal = false;
    this.user.role = role;
    this.user.roles = Data.roles;
    this.loginEvent(this.user);
  }

  @Emit("login")
  loginEvent(user: User) {}

  finishRemember() {
    this.loading = false;
    const formRemember: any = this.$refs.formRemember;
    formRemember.validate();
    if (!this.rememberFormValid) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.loading = true;
      LoginService.createForget(this.user).then(data => {
        this.showMessage([new Alert(this.Messages.changesSaved, "success")]);
        this.remember = false;
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
div.login > .v-card {
  width: 435px;
  margin: auto;
  margin-top: 10vh;
}
</style>
