<template>
  <v-card flat>
    <v-form v-model="actForm" @submit.prevent="saveAct()" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="act.cicle"
                return-object
                item-text="name"
                :items="data.cicles"
                :label="Messages.cicle"
                :rules="[rules.required]"
                prepend-icon="autorenew"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              <v-autocomplete
                v-model="act.type"
                return-object
                item-text="name"
                :items="data.actTypes"
                :label="Messages.act"
                :rules="[rules.required]"
                prepend-icon="assignment"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                :value="act.type.procedure"
                :label="Messages.procedure"
                readonly
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-menu
                :close-on-content-click="false"
                v-model="showDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="act.date"
                  :label="Messages.actDate"
                  prepend-icon="event"
                  :rules="[rules.required]"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="act.date" @input="showDate = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                box
                :label="Messages.description"
                :rules="[rules.required]"
                auto-grow
                v-model="act.description"
              ></v-textarea>
            </v-flex>
            <template v-if="act.type.providence">
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="act.providence"
                  return-object
                  item-text="name"
                  :items="data.providences"
                  :label="Messages.providence"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-model="act.precision"
                  return-object
                  item-text="name"
                  :items="data.precisions"
                  :label="Messages.precision"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-flex>
            </template>
            <template v-if="act.type.daysToEnd != 0">
              <v-flex xs12 md6>
                <v-text-field
                  :value="calculateFinishDate() | filterDate"
                  :label="Messages.executeDate"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  :value="act.type.daysToEnd"
                  :label="Messages.finishDays"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  :value="calculateStartFinishDate() | filterDate"
                  :label="Messages.startFinishDate"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  :value="calculateEndFinishDate() | filterDate"
                  :label="Messages.endFinishDate"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
        <v-divider/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" type="submit">
          {{Messages.save}}
          <v-icon right>save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "@/providers/BaseController";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Act from "../models/Act";
import moment from "moment";

@Component({
  filters: {
    filterDate(value: Date) {
      return moment(value)
        .locale("es")
        .format("LL");
    }
  }
})
export default class ActForm extends BaseController {
  data = Data;
  @Prop() act!: Act;
  loading = false;
  showDate = false;
  actForm = false;

  saveAct() {
    const form: any = this.$refs.form;
    form.validate();
    if (!this.actForm) {
      this.showMessage([
        new Alert(this.Messages.errors.formHasErrors, "error")
      ]);
    } else {
      this.saved(this.act);
    }
  }

  convertStringToDate(value: string): Date {
    var parts = value.split("-");
    return new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    );
  }

  calculateFinishDate(): Date | undefined {
    if (this.act.date) {
      return new Date(
        new Date().setDate(
          this.convertStringToDate(this.act.date).getDate() +
            this.act.type.daysToEnd
        )
      );
    }
  }

  calculateStartFinishDate(): Date | undefined {
    if (this.act.date) {
      return new Date(
        new Date().setDate(
          this.convertStringToDate(this.act.date).getDate() + 1
        )
      );
    }
  }

  calculateEndFinishDate(): Date | undefined {
    if (this.act.date) {
      return new Date(
        new Date().setDate(
          this.convertStringToDate(this.act.date).getDate() +
            this.act.type.daysToEnd -
            1
        )
      );
    }
  }

  @Emit("saved")
  saved(act: Act) {}
}
</script>
