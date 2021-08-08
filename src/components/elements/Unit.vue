<template>
  <div>
    <v-row v-for="(item, index) in unit.contents" :key="index" align="center" justify="center">
      <v-col cols="4" lg="5">
        <v-select v-model="item.language" :items="availableLang" :label="$t('language')" :rules="rules.language">
          <template v-slot:item="data">{{ $t(data.item) }}</template>
          <template v-slot:selection="data">{{ $t(data.item) }}</template>
        </v-select>
      </v-col>
      <v-col col="6" lg="6">
        <v-text-field v-model="item.content" :label="$t('name')" :rules="rules.content" />
        <v-text-field v-model="item.description" :label="$t('description')" :rules="rules.description" />
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
import UnitModel from '@/model/UnitModel'

export default {
  name: 'Unit',
  props: {
    unit: {
      type: UnitModel,
      required: true,
    },
  },
  data() {
    return {
      isReachMaxSupportedLang: false,
      availableLang: ['vi', 'en'],
      rules: {
        language: [(v) => !!v || this.$t('requiredField')],
        content: [(v) => !!v || this.$t('requiredField')],
      },
    }
  },
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
      if ((this.unit?.contents?.length | 0) >= this.availableLang.length) {
        this.isReachMaxSupportedLang = true
      } else {
        this.isReachMaxSupportedLang = false
      }
    },
    isRenderDeleteButton() {
      return (this.unit?.contents?.length | 0) > 1
    },
  },
}
</script>
