<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ $t(getPageTitle()) }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <unit :items="contents" @addItem="addItem" @removeItem="removeItem" />
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
import Unit from '@/components/elements/Unit'

export default {
  name: 'UnitForm',
  components: {
    Unit,
  },
  data: () => ({
    contents: [
      {
        language: '',
        content: '',
        description: '',
      },
    ],
  }),
  computed: {},
  methods: {
    getPageTitle() {
      if (this.$route.params.id === undefined) return 'create'
      return 'edit'
    },
    addItem() {
      this.contents.push({
        language: '',
        content: '',
        description: '',
      })
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
