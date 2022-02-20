<template>
  <div class="text-center">
    <v-dialog
      v-model="open"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title
          v-if="title"
          class="text-h5 primary-color"
        >{{ title }}</v-card-title>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('add', false)"
            color="primary"
            text
            :disabled="btndisable"
            class="text-none"
          >{{ primaBtnLabel }}</v-btn>
          <v-btn
            @click="$emit('close', false)"
            color="primary"
            text
            class="text-none"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    primaBtnLabel: {
      type: String,
      default: "Add",
    },
    disbaled: {
      type: Boolean,
      default: false,
    },
    validateBtn: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    btndisable () {
      if (this.validateBtn) {
        return this.disbaled;
      }
      return false;
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style scoped>
.primary-color {
  background-color: #f5f9ff !important;
  color: #0c365a ;
}
</style>