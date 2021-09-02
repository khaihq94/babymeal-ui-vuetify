<template>
  <v-dialog v-model="showDialog" max-width="500px"
    @click:outside="closeDialog">
    <v-card>
      <v-card-title class="headline" v-html="title"></v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" outlined @click="closeDialog" v-html="closeLabel" />
        <v-btn color="red" outlined @click="handleConfirm" v-html="confirmLabel" />
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    title: {
      type: String,
      required: true,
    },
    closeLabel: {
      type: String,
      required: true,
    },
    confirmLabel: {
      type: String,
      required: true,
    },
    isShowed: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    showDialog() {
      return this.isShowed
    },
  },

  methods: {
    closeDialog() {
      // console.log("close");
      this.$emit('onClickCancel')
    },
    handleConfirm() {
      this.$emit('onClickConfirm')
    },
  },
}
</script>
