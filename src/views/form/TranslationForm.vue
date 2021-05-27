<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ $t(getPageTitle()) }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <translation :items="contents" @addItem="addItem" @removeItem="removeItem" />
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
import TranslationModel from '@/model/TranslationModel'

export default {
  name: 'TranslationForm',
  components: {
    Translation,
  },
  data: () => ({
    contents: [TranslationModel],
  }),
  computed: {},
  methods: {
    getPageTitle() {
      if (this.$route.params.id === undefined) return 'create'
      return 'edit'
    },
    addItem() {
      this.contents.push(new TranslationModel())
    },
    removeItem(index) {
      this.contents.splice(index, 1)
    },
    save() {
      console.log(this.$route.params.id)
    },
  },
}
</script>
