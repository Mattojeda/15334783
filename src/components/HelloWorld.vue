<template>
  <v-img :src="require('@/assets/logo.png')" class="my-3" contain height="200"></v-img>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginService from "@/providers/services/LoginService";

@Component
export default class HelloWorld extends Vue {

}
</script>
