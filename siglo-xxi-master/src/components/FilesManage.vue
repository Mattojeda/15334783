<template>
  <div>
    <v-card>
      <v-card-title>
        <ListHeader>
          <span slot="tittle">{{Messages.filesManage}}</span>
          <v-btn v-if="!hideAddition" slot="button" color="primary" outline @click="addFile =true">
            {{Messages.add}}
            <v-icon right v-if="mode == Crud.READ">add</v-icon>
          </v-btn>
        </ListHeader>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="fileListGet()" item-key="name">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.applicationType.name}}</td>
            <td>{{ props.item.content.name}}</td>
            <td>{{ props.item.content.size / 1000}} KB</td>
            <td>
              <v-btn flat icon color="primary" @click="downloadFile(props.item)">
                <v-icon>cloud_download</v-icon>
              </v-btn>
            </td>
            <td>
              <v-tooltip top>
                <v-btn slot="activator" flat icon color="primary" @click="deleteFile(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{Messages.delete}}</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="addFile" width="800">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{Messages.filesManage}}</div>
            <span class="grey--text">{{Messages.creation}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container  grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  v-model="newFile.applicationType"
                  return-object
                  item-text="name"
                  :items="filetypes"
                  :label="Messages.fileType"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-btn
                  color="primary"
                  block
                  @click="pickFile"
                  :loading="loading"
                  :disabled="loading"
                >
                  {{Messages.upload}}
                  <v-icon right>attach_file</v-icon>
                </v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="inputFile"
                  accept="*"
                  @change="onFilePicked"
                >
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <v-chip
                  v-if="newFile.content"
                  label
                  outline
                  color="primary"
                >{{newFile.content.name}}</v-chip>
              </v-flex>
              <v-flex xs12 v-if="newFile.url && newFile.image" class="text-xs-center">
                <img :src="newFile.url" height="150">
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            outline
            @click="closeModal()"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon left>close</v-icon>
            {{Messages.back}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="createFile()" :loading="loading" :disabled="loading">
            {{Messages.save}}
            <v-icon right>save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AppFile from "@/models/AppFile";
import Crud from "@/constants/Crud";
import Messages from "@/constants/Messages";
import BaseController from "@/providers/BaseController";
import ListHeader from "@/components/ListHeader.vue";
import Data from "@/constants/Data";
import Alert from "@/models/Alert";
import Config from "@/constants/Config";

@Component({
  components: {
    ListHeader: ListHeader
  }
})
export default class FilesManage extends BaseController {
  @Prop() fileList!: AppFile[];
  @Prop() hideAddition!: boolean;
  addFile = false;
  filetypes = Data.fileTypes;
  Crud = Crud;
  mode = Crud.READ;
  newFile: AppFile = new AppFile();
  loading = false;
  headers = [
    {
      text: Messages.fileType,
      sortable: true,
      value: "applicationType.name"
    },
    {
      text: Messages.name,
      sortable: true,
      value: "content.name"
    },
    {
      text: Messages.size,
      sortable: true,
      value: "content.size"
    },
    {
      text: Messages.download,
      sortable: false,
      value: "content.name"
    },
    {
      text: Messages.delete,
      sortable: false,
      value: "content.name"
    }
  ];

  fileListGet() {
    return this.fileList;
  }

  createFile() {
    if (!this.newFile.applicationType) {
      this.showMessage([
        new Alert(this.Messages.errors.applicationTypeNotSelected, "error")
      ]);
    } else if (!this.newFile.content) {
      this.showMessage([
        new Alert(this.Messages.errors.fileNotSelected, "error")
      ]);
    } else if (this.newFile.content.size > Config.fileMaxSize) {
      this.showMessage([
        new Alert(this.Messages.errors.fileSizeInvalid, "error")
      ]);
    } else if (
      Config.validFileFormats.indexOf(this.newFile.content.type) == -1
    ) {
      this.showMessage([
        new Alert(this.Messages.errors.fileFormatInvalid, "error")
      ]);
    } else {
      this.fileList.push(this.newFile);
      this.closeModal();
    }
  }

  closeModal() {
    this.addFile = false;
    this.newFile = new AppFile();
  }

  deleteFile(item: AppFile) {
    this.fileList.splice(this.fileList.indexOf(item), 1);
  }

  downloadFile(item: AppFile) {
    var file_path: any = item.url;
    var a: any = document.createElement("A");
    a.href = file_path;
    a.download = item.content!.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  pickFile() {
    let a: any = this.$refs.inputFile;
    a.click();
  }

  onFilePicked(e: any) {
    const files = e.target.files;
    if (files[0] !== undefined) {
      this.loading = true;
      this.newFile.content = files[0];
      if (this.newFile.content!.name.lastIndexOf(".") <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.newFile.url = fr.result;
        if (
          Config.imageValidFormats.indexOf(this.newFile.content!.type) != -1
        ) {
          this.newFile.image = true;
        }
        this.loading = false;
      });
    } else {
      this.newFile.content = undefined;
      this.newFile.url = "";
    }
  }
}
</script>
