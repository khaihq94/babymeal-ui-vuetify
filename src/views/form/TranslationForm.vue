<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title>Create</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row v-for="item in formModel.names" :key="item.lang">
              <v-col :cols="12" :lg="6">
                <v-select
                  v-model="item.lang"
                  :items="availableLang"
                  :label="form.lang.label"
                  required
                  :rules="form.lang.rules"
                />
              </v-col>
              <v-col :col="12" :lg="6">
                <v-text-field v-model="item.name" :label="form.name.label" required :rules="form.name.rules" />
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12" :lg="6">
                <v-btn color="primary" tile class="mb-5">
                  <v-icon left> mdi-plus </v-icon>
                  Add 
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
}
</script>
