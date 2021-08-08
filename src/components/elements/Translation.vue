<template>
  <div>
    <v-row v-for="(item, index) in items" :key="index" align="center" justify="center">
      <v-col cols="4" lg="5">
        <v-select
          v-model="item.language"
          :items="availableLang"
          :label="form.language.label"
          :rules="form.language.rules"
        >
          <template v-slot:item="data">{{ $t(data.item) }}</template>
          <template v-slot:selection="data">{{ $t(data.item) }}</template>
        </v-select>
      </v-col>
      <v-col col="6" lg="6">
        <tiptap-vuetify v-if="isEditorTextField" v-model="item.content" :extensions="extensions" :rules="form.content.rules" />
        <v-text-field v-else v-model="item.content" :label="form.content.label" :rules="form.content.rules" />
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
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'

export default {
  name: 'Translation',
  components: {
    TiptapVuetify,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isEditorTextField: {
      type: Boolean,
      required: false,
      default: false,
    },
    minItem: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      isReachMaxSupportedLang: false,
      form: {
        language: {
          label: this.$t('language'),
          rules: [(v) => !!v || this.$t('requiredField')],
        },
        content: {
          label: '',
          rules: [(v) => !!v || this.$t('requiredField')],
        },
      },
      availableLang: ["vi", "en"],
      extensions: [
        History,
        Blockquote,
        Link,
        Strike,
        Bold,
        Italic,
        Underline,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
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
      if ((this.items?.length | 0) >= this.availableLang.length) {
        this.isReachMaxSupportedLang = true
      } else {
        this.isReachMaxSupportedLang = false
      }
    },
    isRenderDeleteButton() {
      return (this.items?.length | 0) > this.minItem
    },
  },
}
</script>
