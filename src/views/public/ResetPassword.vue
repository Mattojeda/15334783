<template>
  <div class="login">
    <v-card>
      <v-img :src="require('@/assets/logo.png')"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{Messages.appName}}</div>
          <span class="grey--text">{{Messages.recoverPassword}}</span>
        </div>
      </v-card-title>
      <v-form v-model="formValid" @submit.prevent="reset()" ref="form">
        <v-card-text>
          <v-text-field
            v-model="password1"
            :append-icon="showPassword1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="showPassword1 ? 'text' : 'password'"
            :label="Messages.password"
            @click:append="showPassword1 = !showPassword1"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :append-icon="showPassword2 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="showPassword2 ? 'text' : 'password'"
            :label="Messages.confirmPassword"
            @click:append="showPassword2 = !showPassword2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block outline color="primary" :loading="loading" :disabled="loading" type="submit">
            {{Messages.send}}
            <v-icon right>send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import LoginService from "@/providers/services/LoginService";
import BaseController from "@/providers/BaseController";
import Alert from "@/models/Alert";

@Component
export default class ResetPassword extends BaseController {
  formValid = false;
  password1 = "";
  password2 = "";
  showPassword1 = false;
  showPassword2 = false;
  loading = false;

  reset() {
    this.loading = false;
    const form: any = this.$refs.form;
    form.validate();
    if (!this.formValid) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else if (this.password1 !== this.password2) {
      this.showMessage([
        new Alert(this.Messages.errors.passwordsNotEquivalent, "warning")
      ]);
    } else {
      this.loading = true;
      LoginService.createRecover({
        password1: this.password1,
        password2: this.password2,
        token: this.$router.currentRoute.params.token
      }).then(data => {
        this.showMessage([new Alert(this.Messages.changesSaved, "success")]);
        this.loading = false;
        this.$router.push({ path: "/" });
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
