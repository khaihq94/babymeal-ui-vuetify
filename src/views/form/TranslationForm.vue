<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ getPageTitle() }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <translation :items="names" @addItem="addItem" @removeItem="removeItem" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Translation from '@/components/elements/Translation'

export default {
  name: 'TranslationForm',
  components: {
    Translation,
  },
  data: () => ({
    names: [
      {
        lang: '',
        name: '',
      },
    ],
  }),
  computed: {},
  methods: {
    getPageTitle() {
      if (this.$route.params.id === undefined) return 'Create'
      return 'Edit'
    },
    addItem() {
      this.names.push({
        lang: '',
        name: '',
      })
    },
    removeItem(index) {
      this.names.splice(index, 1)
    },
    save() {
      console.log(this.$route.params.id)
    },
  },
}
</script>
