<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ $t(getPageTitle()) }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <unit :unit="unit" @addItem="addItem" @removeItem="removeItem" />
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
import UnitModel from '@/model/UnitModel'
import UnitContent from '@/model/UnitContent'

export default {
  name: 'UnitForm',
  components: {
    Unit,
  },
  data: () => ({
    unit: new UnitModel(),
  }),
  computed: {},
  methods: {
    getPageTitle() {
      if (this.$route.params.id === undefined) return 'create'
      return 'edit'
    },
    addItem() {
      this.unit.contents.push(new UnitContent())
    },
    removeItem(index) {
      this.unit.contents.splice(index, 1)
    },
    save() {
      console.log(this.unit)
    },
  },
}
</script>
