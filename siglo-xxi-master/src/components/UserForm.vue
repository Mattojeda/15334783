<template>
  <div>
    <v-tabs dark color="primary" centered grow icons-and-text v-model="activeTab">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab href="#1" :disabled="blockTabs">
        {{Messages.personalInformation}}
        <v-icon>person</v-icon>
      </v-tab>
      <v-tab href="#2" :disabled="blockTabs">
        {{Messages.contactInformation}}
        <v-icon>phone</v-icon>
      </v-tab>
      <v-tab href="#3" :disabled="blockTabs">
        {{Messages.workInformation}}
        <v-icon>work</v-icon>
      </v-tab>
      <v-tab-item value="1">
        <PersonForm
          :mode="mode"
          :user="user"
          @saved="savePersonalInformation"
          @showMessage="showMessage"
        />
      </v-tab-item>
      <v-tab-item value="2">
        <v-card flat>
          <v-form v-model="userForm2" @submit.prevent="saveContactInformation" ref="form2">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-autocomplete
                      v-model="user.ubications[0].city.departament.id"
                      item-value="id"
                      item-text="name"
                      :items="data.departaments"
                      :label="Messages.departament"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      prepend-icon="location_on"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-autocomplete
                      v-model="user.ubications[0].city.id"
                      item-value="id"
                      item-text="name"
                      :items="data.cities"
                      :label="Messages.city"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      prepend-icon="location_on"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs4 md3>
                    <v-autocomplete
                      v-model="user.ubications[0].address.part1"
                      :items="data.part1Items"
                      :label="Messages.address"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      prepend-icon="location_on"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs4 md1>
                    <v-text-field
                      v-model="user.ubications[0].address.part2"
                      type="number"
                      :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                      :label="Messages.addressNo"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 md2>
                    <v-autocomplete
                      v-model="user.ubications[0].address.part3"
                      :items="data.part3Y5Items"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      :label="Messages.letter"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs6 md1>
                    <v-text-field
                      v-model="user.ubications[0].address.part4"
                      type="number"
                      :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                      :label="Messages.addressNo"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 md2>
                    <v-autocomplete
                      v-model="user.ubications[0].address.part5"
                      :items="data.part3Y5Items"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      :label="Messages.letter"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs6 md1>
                    <v-text-field
                      v-model="user.ubications[0].address.part6"
                      type="number"
                      :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 md2>
                    <v-autocomplete
                      v-model="user.ubications[0].address.part7"
                      :items="data.part7Items"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      type="number"
                      v-model="user.phone"
                      :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                      :label="Messages.phone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      type="number"
                      v-model="user.cellphone"
                      :rules="mode != Crud.READ ? [rules.number, rules.required] : []"
                      :label="Messages.cellphone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      v-model="user.email"
                      :rules="mode != Crud.READ ? [rules.email, rules.required] : []"
                      :label="Messages.email"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-divider/>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="activeTab = '1'" flat type="button">
                <v-icon left>skip_previous</v-icon>
                {{Messages.back}}
              </v-btn>
              <v-spacer/>
              <v-btn type="submit" color="primary">
                {{Messages.next}}
                <v-icon right>skip_next</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item value="3">
        <v-card flat>
          <v-form v-model="userForm3" @submit.prevent="saveUser" ref="userForm3">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="user.userName"
                      :rules="mode != Crud.READ ? [rules.required] : []"
                      :label="Messages.userName"
                      :disabled="user.identityStatus ==  IdentityStatus.OK || mode == Crud.UPDATE"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-toolbar flat>
                <v-toolbar-title>{{Messages.roles}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" outline @click="addRole()">
                  {{Messages.add}}
                  <v-icon right>add</v-icon>
                </v-btn>
              </v-toolbar>
              <v-list three-line>
                <v-subheader>{{ Messages.active }}</v-subheader>
                <v-list-tile v-for="(item, index) in user.roles" :key="index" avatar>
                  <v-list-tile-action>
                    <v-checkbox v-model="item.active"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <span class="text--primary">{{ item.office.name }}</span>
                      &mdash;
                      {{ item.office.corporation.name }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple @click="deleteRole(index)">
                      <v-icon color="accent">delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="activeTab = '2'" flat type="button">
                <v-icon left>skip_previous</v-icon>
                {{Messages.back}}
              </v-btn>
              <v-spacer/>
              <v-btn color="primary" type="submit">
                {{Messages.save}}
                <v-icon right>save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="roleModal" persistent max-width="700px">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{Messages.role}}</v-toolbar-title>
        </v-toolbar>
        <v-form v-model="roleForm" @submit.prevent="saveRole" ref="roleForm">
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="roleCity.departament.id"
                  item-value="id"
                  item-text="name"
                  :items="data.departaments"
                  :label="Messages.departament"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="location_on"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="roleCity.id"
                  item-value="id"
                  item-text="name"
                  :items="data.cities"
                  :label="Messages.city"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="location_on"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="newRole.office.corporation"
                  return-object
                  item-text="name"
                  :items="data.corporations"
                  :label="Messages.corporation"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="account_balance"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="newRole.office.especiality"
                  return-object
                  item-text="name"
                  :items="data.especialities"
                  :label="Messages.especiality"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="class"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="newRole.office.id"
                  item-value="id"
                  item-text="name"
                  :items="data.offices"
                  :label="Messages.office"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="work"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="newRole.id"
                  item-value="id"
                  item-text="name"
                  :items="data.roles"
                  :label="Messages.role"
                  :rules="mode != Crud.READ ? [rules.required] : []"
                  prepend-icon="person"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="roleModal = false" flat type="button">
              <v-icon left>close</v-icon>
              {{Messages.close}}
            </v-btn>
            <v-spacer/>
            <v-btn color="primary" type="submit">
              {{Messages.save}}
              <v-icon right>save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
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
import PersonForm from "@/components/PersonForm.vue";
import IdentityStatus from "@/models/IdentityStatus";

@Component({
  components: {
    PersonForm: PersonForm
  }
})
export default class UserForm extends BaseController {
  data = Data;
  @Prop() user!: User;
  Crud = Crud;
  IdentityStatus = IdentityStatus;
  @Prop() mode!: Crud;
  @Prop() blockTabs!: boolean;

  loading = false;

  userForm2 = false;
  userForm3 = false;
  activeTab = "1";

  roleForm = false;
  newRole = new Role();
  roleModal = false;
  roleCity = new City();

  savePersonalInformation() {
    this.activeTab = "2";
  }

  saveContactInformation() {
    const form: any = this.$refs.form2;
    form.validate();
    if (!this.userForm2) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.activeTab = "3";
    }
  }
  saveUser() {
    this.loading = false;
    if (this.user.roles.length == 0) {
      this.showMessage([
        new Alert(this.Messages.errors.rolesNotSelected, "warning")
      ]);
    } else if (!this.userForm3) {
      const form: any = this.$refs.userForm3;
      form.validate();
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "warning")
      ]);
    } else {
      this.loading = true;
      this.saved(this.user);
    }
  }

  @Emit("saved")
  saved(user: User) {}

  deleteRole(index: number) {
    this.user.roles.splice(index, 1);
  }

  addRole() {
    const roleForm: any = this.$refs.roleForm;
    roleForm.reset();
    this.newRole = new Role();
    this.roleModal = true;
    this.roleCity = new City();
  }

  saveRole() {
    const roleForm: any = this.$refs.roleForm;
    roleForm.validate();
    if (!this.roleForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      for (let item of this.data.roles) {
        if (item.id == this.newRole.id) {
          this.newRole.name = item.name;
          this.newRole.active = true;
          break;
        }
      }
      this.user.roles.push(this.newRole);
      this.roleModal = false;
    }
  }
}
</script>
