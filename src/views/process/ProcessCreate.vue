<template>
  <div>
    <!-- <v-btn block flat @click="mode = mode == 1 ? 2 : 1 ">Alternar contenedor
      <v-icon right dark>sync</v-icon>
    </v-btn>-->
    <!-- <appContainer :mode="mode" :activeTab="activeTab"> -->
    <v-tabs dark color="primary" centered grow icons-and-text v-model="activeTab">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab v-for="(item, index) in steps" :href="'#'+index" :key="index">
        {{item.text}}
        <v-icon>{{item.icon}}</v-icon>
      </v-tab>
      <v-tab-item value="0">
        <v-card>
          <v-layout wrap>
            <v-flex xs2 md4>
              <v-list two-line>
                <v-subheader>{{Messages.select}}</v-subheader>
                <template v-for="(item, index) in selectSteps">
                  <v-divider :key="index+'div'" v-if="item.show"></v-divider>
                  <v-list-tile
                    :key="index"
                    v-if="item.show"
                    :class="{ passed: step > index, active: step == index } "
                    @click="navigateStep(index)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{item.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{item.value.name}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon v-if="item.valid">done_all</v-icon>
                      <v-icon v-else>remove</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <v-divider></v-divider>
              </v-list>
            </v-flex>
            <v-flex xs10 md8>
              <v-container grid-list-md text-xs-center v-if="selectSteps[step].options.length > 1">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-toolbar flat>
                      <v-toolbar-title>{{Messages.select +' '+selectSteps[step].name}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="buttonSearch"
                        clear-icon="close"
                        clearable
                        :label="Messages.search"
                        @click:clear="buttonSearch = ''"
                        hide-details
                        single-line
                        full-width
                      />
                    </v-toolbar>
                  </v-flex>
                  <v-flex
                    xs4
                    v-for="(item, index) in filteredButtons(selectSteps[step].options)"
                    :key="index"
                  >
                    <v-btn outline large color="primary" @click="moveStep(item)">{{item.name}}</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab-item value="1">
        <SubjectHome
          @showMessage="showMessage"
          v-if=" activeTab == '1'"
          :subjectList="process.subjectList"
        />
      </v-tab-item>
      <v-tab-item value="2">
        <FilesManage
          v-if="activeTab == '2'"
          @showMessage="showMessage"
          :fileList="process.fileList"
        />
      </v-tab-item>
      <v-tab-item value="3">
        <PlacesManage
          v-if="activeTab == '3'"
          @showMessage="showMessage"
          :placeList="process.placeList"
        />
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Process from "@/models/Process";
import Messages from "@/constants/Messages";
import Descriptor from "@/models/Descriptor";
import SubjectHome from "@/views/subject/SubjectHome.vue";
import SessionManage from "@/providers/SessionManage";
import FilesManage from "@/components/FilesManage.vue";
import PlacesManage from '@/components/PlacesManage.vue';
import Config from '../../constants/Config';

@Component({
  components: {
    SubjectHome: SubjectHome,
    FilesManage: FilesManage,
    PlacesManage: PlacesManage
  }
})
export default class ProcessCreate extends BaseController {
  [k: string]: any;
  loading = true;
  steps = [
    {
      text: Messages.generalInformation,
      icon: "work"
    },
    {
      text: Messages.fellows,
      icon: "person"
    },
    {
      text: Messages.files,
      icon: "attach_file"
    },
    {
      text: Messages.place,
      icon: "place"
    }
  ];
  /* mode = 1; */
  process: Process = new Process();
  step = 0;
  buttonSearch = "";
  activeTab: string = "0";
  selectSteps: {
    name: string;
    show: boolean;
    valid: boolean;
    value: Descriptor;
    options: any[];
  }[] = [
    {
      name: Messages.especiality,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.corporation,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.subEspeciality,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.lawType,
      show: false,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.processType,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.processClass,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    },
    {
      name: Messages.SubProcessClass,
      show: true,
      valid: false,
      value: new Descriptor(),
      options: []
    }
  ];

  keysToPersist = [
    "process",
    "step",
    "buttonSearch",
    "activeTab",
    "selectSteps"
  ];

  created() {
    this.selectSteps[this.step].options = Data.especialities;
    const recover = SessionManage.getForm("processForm");
    if (recover) {
      for (const item of this.keysToPersist) {
        if (recover[item]) {
          this[item] = recover[item];
        }
      }
    }
  }

  updated() {
    SessionManage.saveForm("processForm", this.keysToPersist, this);
  }

  moveStep(value: any) {
    this.selectSteps[this.step].value = value;
    this.selectSteps[this.step].valid = true;
    if (!this.selectSteps[this.step + 1]) {
      this.finishStepper();
    } else {
      this.step++;
      this.step += this.selectSteps[this.step].show ? 0 : 1;
      this.loadData();
    }
  }

  filteredButtons(options: Descriptor[]) {
    const buttonSearch = this.buttonSearch;
    if (this.buttonSearch != "") {
      options = options.filter(m => {
        return m.name!.toLowerCase().indexOf(buttonSearch.toLowerCase()) >= 0;
      });
    }
    return options;
  }

  finishStepper() {
    this.activeTab = "1";
  }

  loadData() {
    for (let [index, item] of this.selectSteps.entries()) {
      if (index >= this.step) {
        item.options = [];
        item.valid = false;
        item.value = new Descriptor();
      }
    }
    let data: any[] = [];
    if (this.selectSteps[0].value && this.selectSteps[0].value.id == Config.penalId) {
      this.selectSteps[3].show = true;
    } else {
      this.selectSteps[3].show = false;
    }
    switch (this.selectSteps[this.step].name) {
      case Messages.especiality:
        data = Data.especialities;
        break;
      case Messages.corporation:
        data = Data.corporations;
        break;
      case Messages.subEspeciality:
        data = Data.especialities;
        break;
      case Messages.lawType:
        data = Data.lawTypes;
        break;
      case Messages.processType:
        data = Data.processTypes;
        break;
      case Messages.processClass:
        data = Data.processClases;
        break;
      case Messages.SubProcessClass:
        data = Data.processClases;
        break;
    }
    if (data.length == 1) {
      this.showMessage([
        new Alert(
          this.Messages.automaticSelectedOption[1] +
            this.selectSteps[this.step].name +
            this.Messages.automaticSelectedOption[2],
          "success"
        )
      ]);
      this.moveStep(data[0]);
    } else {
      this.selectSteps[this.step].options = data;
    }
  }

  navigateStep(index: number) {
    if (
      this.selectSteps[index].value.name ||
      this.selectSteps[index - 1].value.name
    ) {
      this.step = index;
    }
  }
}
</script>

<style scoped lang="stylus">
.theme--dark {
  div.v-list > div.passed {
    background: var(--v-white-darken1);
  }
}

.theme--dark {
  div.v-list > div.passed {
    background: #000;
  }
}

div.v-list > div.active {
  background: var(--v-white-darken2);
}
</style>

