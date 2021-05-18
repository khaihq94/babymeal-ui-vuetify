<template>
  <div>
    <v-row v-for="(item, index) in items" :key="index" align="center" justify="center">
      <v-col cols="4" lg="5">
        <v-select
          v-model="item.language"
          :items="availableLang"
          :label="form.language.label"
          required
          :rules="form.language.rules"
        >
          <template v-slot:item="data">{{ $t(data.item) }}</template>
        </v-select>
      </v-col>
      <v-col col="6" lg="6">
        <v-text-field v-model="item.content" :label="form.content.label" required :rules="form.content.rules" />
      </v-col>
      <v-col cols="2" lg="1">
        <v-btn icon color="red" @click="removeName(index)" v-if="isRenderDeleteButton()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-btn color="primary" x-small fab class="mb-5" @click="addMoreLang" :disabled="isReachMaxSupportedLang">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Translation',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isReachMaxSupportedLang: false,
    form: {
      language: {
        label: 'Language',
        rules: [(v) => !!v || 'This field is required'],
      },
      content: {
        label: 'Name',
        rules: [(v) => !!v || 'This field is required'],
      },
    },
    availableLang: ['vi', 'en'],
  }),
  methods: {
    addMoreLang() {
      this.$emit('addItem')
      this.handleDisableAddButton()
    },
    removeName(index) {
      this.$emit('removeItem', index)
      this.handleDisableAddButton()
    },
    handleDisableAddButton() {
      if ((this.items?.length | 0) >= this.availableLang.length) {
        this.isReachMaxSupportedLang = true
      } else {
        this.isReachMaxSupportedLang = false
      }
    },
    isRenderDeleteButton() {
      return (this.items?.length | 0) > 1
    },
  },
}
</script>
