<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title>Create</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row v-for="(item, index) in formModel.names" :key="index" align="center" justify="center">
              <v-col :cols="4" :lg="5">
                <v-select
                  v-model="item.lang"
                  :items="availableLang"
                  :label="form.lang.label"
                  required
                  :rules="form.lang.rules"
                />
              </v-col>
              <v-col :col="6" :lg="6">
                <v-text-field v-model="item.name" :label="form.name.label" required :rules="form.name.rules" />
              </v-col>
              <v-col :cols="2" :lg="1">
                <v-btn icon color="red" @click="removeName(item)" v-if="formModel.names.length > 1">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12" :lg="6">
                <v-btn color="primary" small fab class="mb-5" @click="addMoreLang" :disabled="isReachMaxSupportedLang">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" tile> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TranslationForm',
  props: {
    titleLabel: String,
  },
  components: {},
  data: () => ({
    valid: true,
    isReachMaxSupportedLang: false,
    formModel: {
      names: [
        {
          lang: null,
          name: null,
        },
      ],
    },
    form: {
      lang: {
        label: 'Language',
        rules: [(v) => !!v || 'This field is required'],
      },
      name: {
        label: 'Name',
        rules: [(v) => !!v || 'This field is required'],
      },
    },
    availableLang: [
      {
        value: 'vi',
        text: 'Vietnam',
      },
      {
        value: 'en',
        text: 'English',
      },
    ],
  }),
  computed: {},
  methods: {
    addMoreLang() {
      this.formModel.names.push({
        lang: null,
        name: null,
      })
      this.handleDisableAddButton()
    },
    removeName(item) {
      this.formModel.names.splice(this.formModel.names.indexOf(item), 1)
      this.handleDisableAddButton()
    },
    handleDisableAddButton() {
      if (this.formModel.names.length >= this.availableLang.length) {
        this.isReachMaxSupportedLang = true
      } else {
        this.isReachMaxSupportedLang = false
      }
    },
  },
}
</script>
