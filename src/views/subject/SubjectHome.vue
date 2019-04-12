<template>
  <div>
    <v-card>
      <v-card-title>
        <ListHeader>
          <span slot="tittle">{{Messages.fellows}}</span>
          <v-btn slot="button" color="primary" outline @click="redirect()">
            <v-icon left v-if="mode != Crud.READ">arrow_left</v-icon>
            {{mode == Crud.READ ? Messages.add : Messages.comeback}}
            <v-icon right v-if="mode == Crud.READ">add</v-icon>
          </v-btn>
        </ListHeader>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="personListGet()"
          item-key="document"
          v-if="mode == Crud.READ && personList.length != 0"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.type.name}}</td>
            <td>{{ props.item.firstName+ ' ' + props.item.secondName+ ' ' + props.item.lastName+ ' ' + props.item.secondLastName}}</td>
            <td>{{ props.item.documentType.id ? props.item.documentType.id : '' +' '}}{{props.item.document}}</td>
            <td>
              <v-checkbox
                v-if="props.item.type.emplace"
                v-model="props.item.emplaced"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td>
              <v-checkbox v-model="props.item.private" primary hide-details></v-checkbox>
            </td>
            <td>
              <v-chip
                v-if="props.item.type.verifyProfessionalCard"
                label
                outline
                color="primary"
              >N° Tarjeta: {{props.item.professionalCard.id}}</v-chip>
              <v-chip
                v-if="props.item.type.verifyProfessionalCard"
                label
                outline
                color="primary"
              >N° Tarjeta: {{props.item.professionalCard.id}}</v-chip>
            </td>
            <td>
              <v-btn flat icon color="primary" @click="deleteSubject(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn flat icon color="secondary" @click="defenseAnalize()">
                <v-icon>assignment</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <template v-if="mode != Crud.READ && actualPhase == phases.stepTwo">
          <PersonForm
            v-if="!person.type.company"
            :mode="personMode"
            :user="person"
            :hideIdentity="personMode == Crud.READ && !person.type.identified"
            @saved="actualPhase = phases.stepThree"
            @showMessage="showMessage"
          />
          <CompanyForm
            v-if="person.type.company"
            :mode="personMode"
            :company="person"
            @saved="actualPhase = phases.stepThree"
            @showMessage="showMessage"
          />
        </template>
        <v-card v-if="mode != Crud.READ && actualPhase == phases.stepThree">
          <v-card-title>
            <v-toolbar flat>
              <v-toolbar-title>{{Messages.contactInformation}}</v-toolbar-title>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-form v-model="numberForm">
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 md6 v-if="person.type.verifyProfessionalCard">
                    <v-text-field
                      v-model="person.professionalCard.id"
                      :rules="[rules.required]"
                      :label="Messages.profesionalCard"
                      @change="person.professionalCard.status = undefined"
                    ></v-text-field>
                    <div class="text-xs-center">
                      <v-btn
                        v-if="!person.professionalCard.status"
                        :loading="loading"
                        :disabled="loading || person.professionalCard.status == IdentityStatus.OK"
                        outline
                        color="primary"
                        @click="verifyProfessionalCard()"
                      >{{Messages.verify}}</v-btn>
                      <v-chip
                        v-if="person.professionalCard.status"
                        label
                        outline
                        :color="person.professionalCard.status == IdentityStatus.OK ? 'primary' : 'red'"
                      >{{person.professionalCard.status}}</v-chip>
                    </div>
                  </v-flex>
                  <v-flex xs12 :md6="person.type.verifyProfessionalCard">
                    <v-select
                      v-model="person.studyLevel"
                      return-object
                      item-text="name"
                      :items="data.studyLevels"
                      :label="Messages.studyLevel"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <UbicationForm :ubicationList="person.ubications"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-list two-line subheader>
                    <v-subheader>{{Messages.phones}}</v-subheader>
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{Messages.regularOffice}}</v-list-tile-title>
                        <v-list-tile-sub-title>
                          <v-text-field
                            v-model="person.phones[0]"
                            solo
                            type="number"
                            :label="Messages.regularOffice"
                          ></v-text-field>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{Messages.house}}</v-list-tile-title>
                        <v-list-tile-sub-title>
                          <v-text-field
                            v-model="person.phones[1]"
                            solo
                            type="number"
                            :label="Messages.house"
                          ></v-text-field>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{Messages.cellphone}}</v-list-tile-title>
                        <v-list-tile-sub-title>
                          <v-text-field
                            v-model="person.phones[2]"
                            solo
                            type="number"
                            :label="Messages.cellphone"
                          ></v-text-field>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6>
                  <v-form v-model="additionalInformationForm">
                    <v-list subheader>
                      <v-subheader>
                        {{Messages.emails}}
                        <v-spacer/>Notificable
                      </v-subheader>
                      <v-list-tile v-for="(item, index) in person.emails" :key="index" avatar>
                        <v-list-tile-content>
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs12>
                                <v-text-field
                                  full-width
                                  solo
                                  v-model="item.email"
                                  :rules="[rules.optionalEmail]"
                                  :label="Messages.email"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-checkbox v-model="item.notify"></v-checkbox>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="actualPhase = phases.stepTwo"
              flat
              :loading="loading"
              :disabled="loading"
            >
              <v-icon left>skip_previous</v-icon>
              {{Messages.back}}
            </v-btn>
            <v-spacer/>
            <v-btn @click="addPerson" color="primary" :loading="loading" :disabled="loading">
              {{Messages.save}}
              <v-icon right>save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
    <v-dialog
      v-if="mode != Crud.READ && actualPhase == phases.stepOne"
      v-model="show"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{Messages.personSearch}}</div>
            <span class="grey--text">{{Messages.search}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-select
            v-if="!person.type.id"
            v-model="person.type"
            return-object
            item-text="name"
            :items="data.subjectTypes"
            :label="Messages.subjectType"
            @change="identityAnalize"
          ></v-select>
          <v-form v-model="searchForm" v-if="person.type.id">
            <v-select
              v-if="person.type"
              v-model="person.documentType"
              return-object
              item-text="name"
              :items="person.type.company ? data.identityTypes : data.documentTypes"
              :label="Messages.documentType"
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              v-model="person.document"
              :rules="[rules.required]"
              :label="Messages.document"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions v-if="person.type.id">
          <v-btn color="primary" outline :loading="loading" :disabled="loading" @click="redirect()">
            <v-icon left>close</v-icon>
            {{Messages.back}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" :disabled="loading" @click="search()">
            {{Messages.search}}
            <v-icon right>search</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="selectDefenders" v-model="selectDefenders" width="800">
      <v-card>
        <v-card-title primary-title>
          <v-toolbar-title>{{Messages.defenseSelection}}</v-toolbar-title>
        </v-card-title>
        <v-card-text>
          <v-list three-line>
            <v-list-tile v-for="(item, index) in subjectDemandAnalize" :key="index" avatar>
              <v-list-tile-avatar>
                <v-icon>person</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content v-if="!item.selected">
                <v-list-tile-title>{{ item.firstName+ ' ' + item.secondName+ ' ' + item.lastName+ ' ' + item.secondLastName }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{ item.type.name }}</span>
                  &mdash;
                  {{ item.documentType.id ? item.documentType.id : '' +' '}}{{item.document}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content v-if="item.selected">
                <div v-if="item.type.defense">
                  <v-autocomplete
                    v-model="item.asociate"
                    return-object
                    item-text="firstName"
                    :items="subjectDemandAnalize"
                    :label="Messages.selectDefended"
                    prepend-icon="person"
                  ></v-autocomplete>
                </div>
                <div v-if="item.type.canBeDefended">
                  <v-autocomplete
                    v-model="item.asociate"
                    return-object
                    item-text="firstName"
                    :items="subjectDemandAnalize"
                    :label="Messages.selectDefender"
                    prepend-icon="person"
                  ></v-autocomplete>
                </div>
                <div v-if="item.type.autoDefense">
                  <span>{{Messages.canAutodefense}}</span>
                </div>
              </v-list-tile-content>
              <v-list-tile-action v-if="!item.selected">
                <v-btn icon ripple @click="item.selected = true">
                  <v-icon color="accent">check_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import UserService from "@/providers/services/UserService";
import User from "@/models/User";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Messages from "@/constants/Messages";
import ListHeader from "@/components/ListHeader.vue";
import Crud from "@/constants/Crud";
import PersonForm from "@/components/PersonForm.vue";
import CompanyForm from "@/components/CompanyForm.vue";
import UbicationForm from "@/components/UbicationForm.vue";
import Subject from "@/models/Subject";
import SubjectType from "@/models/SubjectType";
import IdentityStatus from "@/models/IdentityStatus";

enum PersonCreationPhases {
  //"userType"
  stepOne,
  //"Basic Information"
  stepTwo,
  //"Additional Information"
  stepThree
}

@Component({
  components: {
    ListHeader: ListHeader,
    PersonForm: PersonForm,
    CompanyForm: CompanyForm,
    UbicationForm: UbicationForm
  }
})
export default class SubjectHome extends BaseController {
  @Prop() personList!: Subject[];
  Crud = Crud;
  IdentityStatus = IdentityStatus;
  data = Data;
  actualPhase: PersonCreationPhases = PersonCreationPhases.stepOne;
  phases = PersonCreationPhases;
  mode = Crud.READ;
  personMode = Crud.READ;
  loading = false;
  show = true;
  searchForm = false;
  numberForm = false;
  additionalInformationForm = false;
  person: Subject = new Subject();
  selectDefenders = false;
  subjectDemandAnalize: Subject[] = [];
  headers = [
    {
      text: Messages.subjectType,
      sortable: true,
      value: "type.name"
    },
    {
      text: Messages.name,
      sortable: true,
      value: "firstName"
    },
    {
      text: Messages.identityNumber,
      sortable: true,
      value: "document"
    },
    {
      text: Messages.emplaced,
      sortable: false,
      value: "document"
    },
    {
      text: Messages.private,
      sortable: false,
      value: "document"
    },
    {
      text: Messages.additionalInformation,
      value: "document"
    },
    {
      text: Messages.actions,
      sortable: false
    }
  ];

  redirect() {
    this.mode = this.mode == Crud.READ ? Crud.CREATE : Crud.READ;
    this.person = new Subject();
    this.actualPhase = PersonCreationPhases.stepOne;
  }

  identityAnalize(newValue: SubjectType) {
    if (!newValue.identified) {
      this.personMode = Crud.READ;
      this.actualPhase = PersonCreationPhases.stepTwo;
    }
  }

  search() {
    this.loading = false;
    if (!this.searchForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.loading = true;
      const tempType = this.person.type;
      this.person = UserService.getSubject(this.person) || this.person;
      if (this.person.firstName) {
        this.person.type = tempType;
        this.showMessage([new Alert(this.Messages.userFound, "success")]);
        this.personMode = Crud.CREATE;
      } else {
        this.showMessage([new Alert(this.Messages.noUserFound, "info")]);
        this.personMode = Crud.READ;
      }
      this.loading = false;
      this.actualPhase = PersonCreationPhases.stepTwo;
    }
  }

  addPerson() {
    if (!this.numberForm && this.person.type!.verifyProfessionalCard) {
      this.showMessage([
        new Alert(this.Messages.errors.professionalCardNoValid, "error")
      ]);
    } else {
      if (
        !this.person.professionalCard!.status &&
        this.person.type!.verifyProfessionalCard
      ) {
        this.verifyProfessionalCard();
      }
      if (
        this.person.professionalCard!.status == IdentityStatus.BLOCK &&
        this.person.type!.verifyProfessionalCard
      ) {
        this.showMessage([
          new Alert(this.Messages.errors.professionalCardNoValid, "error")
        ]);
      } else {
        if (!this.additionalInformationForm) {
          this.showMessage([new Alert(this.Messages.errors.email, "error")]);
        } else {
          this.personList.push(this.person);
          this.defenseAnalize();
          this.redirect();
        }
      }
    }
  }

  personListGet() {
    return this.personList;
  }

  deleteSubject(item: Subject) {
    this.personList.splice(this.personList.indexOf(item), 1);
  }

  verifyProfessionalCard() {
    if (
      !this.numberForm &&
      (this.person.type!.verifyProfessionalCard || !this.person.studyLevel)
    ) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.loading = true;
      this.person.professionalCard!.status = undefined;
      let result: any = UserService.getProfessionalCard(
        this.person.professionalCard!
      );
      if (result) {
        this.person.professionalCard = result;
      } else {
        this.person.professionalCard!.status = IdentityStatus.BLOCK;
      }
      this.loading = false;
    }
  }

  defenseAnalize() {
    console.log(1);
    this.subjectDemandAnalize = [];
    this.selectDefenders = false;
    let defendersNumber = 0;
    let defendedNumber = 0;
    let autoDefendedNumber = 0;
    if (this.personList.length > 0) {
      for (let item of this.personList) {
        item.selected = false;
        if (item.type!.autoDefense) {
          autoDefendedNumber++;
          this.subjectDemandAnalize.push(item);
          continue;
        }
        if (item.type!.defense) {
          defendersNumber++;
          this.subjectDemandAnalize.push(item);
          continue;
        }
        if (item.type!.canBeDefended) {
          defendedNumber++;
          this.subjectDemandAnalize.push(item);
          continue;
        }
      }
    }
    if (autoDefendedNumber > 0 || (defendersNumber > 0 && defendedNumber > 0)) {
      this.selectDefenders = true;
    }
  }
}
</script>
