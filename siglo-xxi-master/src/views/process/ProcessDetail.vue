<template>
  <div>
    <v-tabs dark color="primary" centered grow icons-and-text v-model="activeTab">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab v-for="(item, index) in steps" :href="'#'+index" :key="index">
        {{item.text}}
        <v-icon>{{item.icon}}</v-icon>
      </v-tab>
      <v-tab-item value="0">
        <v-card>
          <v-layout wrap>
            <v-flex xs12>
              <v-list two-line>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.especiality}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.subEspeciality.especiality.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.corporation}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.corporation.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.subEspeciality}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.subEspeciality.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed" v-if="process.lawType">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.lawType}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.lawType.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.processType}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.processType.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.processClass}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.subProcessClass.processClass.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile class="passed">
                  <v-list-tile-content>
                    <v-list-tile-title>{{Messages.SubProcessClass}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{process.subProcessClass.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>done_all</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab-item value="1">
        <SubjectHome
          @showMessage="showMessage"
          v-if=" activeTab == '1'"
          :editSubjects="true"
          :subjectList="process.subjectList"
        />
      </v-tab-item>
      <v-tab-item value="2">
        <FilesManage
          v-if="activeTab == '2'"
          @showMessage="showMessage"
          :fileList="process.fileList"
          :hideAddition="true"
        />
      </v-tab-item>
      <v-tab-item value="3">
        <PlacesManage
          v-if="activeTab == '3'"
          @showMessage="showMessage"
          :placeList="process.placeList"
          :hideAddition="true"
        />
      </v-tab-item>
      <v-tab-item value="4">
        <ActsManage
          v-if="activeTab == '4'"
          @showMessage="showMessage"
          :actList="process.actList"
        />
      </v-tab-item>
      <v-tab-item value="5">
        <FactsManage
          v-if="activeTab == '5'"
          @showMessage="showMessage"
          :factsList="process.factsList"
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
import PlacesManage from "@/components/PlacesManage.vue";
import ProcessService from "@/providers/services/ProcessService";
import Config from "../../constants/Config";
import FactsManage from '../../components/FactsManage.vue';
import ActsManage from '../../components/ActsManage.vue';

@Component({
  components: {
    SubjectHome: SubjectHome,
    FilesManage: FilesManage,
    PlacesManage: PlacesManage,
    FactsManage: FactsManage,
    ActsManage: ActsManage
  }
})
export default class ProcessCreate extends BaseController {
  loading = false;
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
    },
    {
      text: Messages.acts,
      icon:"assignment"
    }
  ];
  process?: Process = new Process();
  activeTab: string = "0";

  created() {
    this.process!.id = this.$router.currentRoute.params.idProcess;
    let process = ProcessService.get(this.process!);
    if (process) {
      this.process = process;
      if (this.process!.subEspeciality!.especiality!.id == Config.penalId) {
        this.steps.push({
          text: Messages.facts,
          icon: "youtube_searched_for"
        });
      }
    } else {
      this.process = undefined;
      this.showMessage([
        new Alert(this.Messages.errors.noProcessFound, "info")
      ]);
      this.$router.push({ path: "/procesos" });
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
</style>

