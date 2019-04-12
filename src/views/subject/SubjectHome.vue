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
          :items="subjectListGet()"
          item-key="document"
          v-if="mode == Crud.READ && subjectList.length != 0"
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
            </td>
            <td>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="accent" @click="selectSubject(props.item)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>{{Messages.edit}}</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="secondary" @click="defenseAnalize()">
                  <v-icon>assignment</v-icon>
                </v-btn>
                <span>{{Messages.defenseSelection}}</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="primary"
                  @click="deleteSubject(props.item)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{Messages.delete}}</span>
              </v-tooltip>
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
            <v-form
              v-model="numberForm"
              ref="numberForm"
              v-if="person.type.studyLevel || person.type.verifyProfessionalCard"
            >
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex
                    xs12
                    :md6="person.type.studyLevel"
                    v-if="person.type.verifyProfessionalCard"
                  >
                    <v-text-field
                      v-model="person.professionalCard.id"
                      :rules="[rules.number, rules.required]"
                      type="number"
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
                  <v-flex
                    xs12
                    v-if="person.type.studyLevel"
                    :md6="person.type.verifyProfessionalCard"
                  >
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
            <v-container grid-list-md>
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
                            :rules="[rules.number]"
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
                            :rules="[rules.number]"
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
                            :rules="[rules.number]"
                            type="number"
                            :label="Messages.cellphone"
                          ></v-text-field>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6>
                  <v-form v-model="additionalInformationForm" ref="additionalInformationForm">
                    <v-list subheader>
                      <v-subheader>
                        {{Messages.emails}}
                        <v-spacer/>Notificable
                      </v-subheader>
                      <v-list-tile v-for="(item, index) in person.emails" :key="index" avatar>
                        <v-list-tile-content>
                          <v-container grid-list-md>
                            <v-layout row wrap>
                              <v-flex xs12>
                                <v-text-field
                                  full-width
                                  solo
                                  v-model="item.email"
                                  :rules="[rules.email]"
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
        <v-form v-model="searchForm" @submit.prevent="search()" ref="searchForm">
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
            <v-select
              v-if="person.type.id"
              v-model="person.documentType"
              return-object
              item-text="name"
              :items="person.type.company ? data.identityTypes : data.documentTypes"
              :label="Messages.documentType"
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              v-if="person.type.id"
              v-model="person.document"
              :rules="[rules.number, rules.required]"
              type="number"
              :label="Messages.document"
            ></v-text-field>
          </v-card-text>
          <v-card-actions v-if="person.type.id">
            <v-btn
              color="primary"
              outline
              :loading="loading"
              :disabled="loading"
              @click="redirect()"
              type="button"
            >
              <v-icon left>close</v-icon>
              {{Messages.back}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="loading" :disabled="loading" type="submit">
              {{Messages.search}}
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-if="selectDefenders" v-model="selectDefenders" width="800">
      <v-card>
        <v-card-title primary-title>
          <v-toolbar-title>{{Messages.defenseSelection}}</v-toolbar-title>
        </v-card-title>
        <v-card-text>
          <v-list three-line>
            <v-subheader>
              <v-spacer/>
              {{ Messages.canAutodefense }}
            </v-subheader>
            <v-list-tile v-for="(item, index) in subjectListGroup.autoDefended" :key="index" avatar>
              <v-list-tile-avatar>
                <v-icon>person</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.firstName+ ' ' + item.secondName+ ' ' + item.lastName+ ' ' + item.secondLastName }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{ item.type.name }}</span>
                  &mdash;
                  {{ item.documentType.id ? item.documentType.id : '' +' '}}{{item.document}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="declareAutoDefended(item)">
                  <v-icon color="accent" v-if="!item.asociate">check_circle</v-icon>
                  <v-icon color="accent" v-if="item.asociate">close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="subjectListGroup.defenders.length != 0"/>
            <v-subheader v-if="subjectListGroup.defenders.length != 0">
              <v-spacer/>
              {{ Messages.selectDefended }}
            </v-subheader>
            <v-list-tile
              v-for="(item, index) in subjectListGroup.defenders"
              :key="index+'I'"
              avatar
            >
              <v-list-tile-avatar>
                <v-icon>person</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.firstName+ ' ' + item.secondName+ ' ' + item.lastName+ ' ' + item.secondLastName }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{ item.type.name }}</span>
                  &mdash;
                  {{ item.documentType.id ? item.documentType.id : '' +' '}}{{item.document}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="!item.selected">
                <v-autocomplete
                  v-model="item.asociate"
                  item-value="tempId"
                  item-text="firstName"
                  :items="subjectListGroup.defended"
                  :label="Messages.selectDefended"
                  prepend-icon="person"
                ></v-autocomplete>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            outline
            :loading="loading"
            :disabled="loading"
            @click="selectDefenders = false"
          >
            <v-icon left>skip_previous</v-icon>
            {{Messages.back}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
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
  @Prop() subjectList!: Subject[];
  @Prop() editSubjects!: boolean;
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
  subjectListGroup: {
    defended: Subject[];
    defenders: Subject[];
    autoDefended: Subject[];
  } = {
    defenders: [],
    defended: [],
    autoDefended: []
  };
  selectDefenders = false;
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
      const form: any = this.$refs.searchForm;
      form.validate();
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
    if (
      !this.numberForm &&
      (this.person.type!.verifyProfessionalCard || this.person.type!.studyLevel)
    ) {
      const form: any = this.$refs.numberForm;
      form.validate();
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
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
          const form: any = this.$refs.additionalInformationForm;
          form.validate();
          this.showMessage([new Alert(this.Messages.errors.email, "error")]);
        } else {
          this.person.tempId = this.person.document
            ? this.person.document
            : new Date().getTime();
          this.subjectList.push(this.person);
          this.defenseAnalize();
          this.redirect();
        }
      }
    }
  }

  subjectListGet() {
    return this.subjectList;
  }

  deleteSubject(item: Subject) {
    this.subjectList.splice(this.subjectList.indexOf(item), 1);
  }

  verifyProfessionalCard() {
    if (
      !this.numberForm &&
      (this.person.type!.verifyProfessionalCard || this.person.type!.studyLevel)
    ) {
      const form: any = this.$refs.numberForm;
      form.validate();
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
    this.autoDefendedFiltersList();
    this.defendersFiltersList();
    this.defendedFiltersList();
    this.selectDefenders =
      this.subjectListGroup.autoDefended.length > 0 ||
      (this.subjectListGroup.defenders.length > 0 &&
        this.subjectListGroup.defended.length > 0)
        ? true
        : false;
  }

  defendedFiltersList() {
    this.subjectListGroup.defended = [];
    for (let item of this.subjectList) {
      item.selected = false;
      if (item.type!.canBeDefended && !item.asociate) {
        this.subjectListGroup.defended.push(item);
        continue;
      }
    }
  }

  defendersFiltersList() {
    this.subjectListGroup.defenders = [];
    for (let item of this.subjectList) {
      item.selected = false;
      if (item.type!.defense) {
        this.subjectListGroup.defenders.push(item);
        continue;
      }
    }
  }

  autoDefendedFiltersList() {
    this.subjectListGroup.autoDefended = [];
    for (let item of this.subjectList) {
      item.selected = false;
      if (item.type!.autoDefense) {
        this.subjectListGroup.autoDefended.push(item);
        continue;
      }
    }
  }

  declareAutoDefended(subject: Subject) {
    for (let item of this.subjectList) {
      if (item.tempId == subject.tempId) {
        subject.asociate = !subject.asociate ? "AUTO" : undefined;
      }
      if (item.asociate == subject.tempId) {
        item.asociate = undefined;
      }
    }
    this.defenseAnalize();
  }

  selectSubject(subject: Subject) {
    this.actualPhase = PersonCreationPhases.stepTwo;
    this.person = subject;
    this.personMode = Crud.UPDATE;
    this.mode = Crud.CREATE;
  }
}
</script>
