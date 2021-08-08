<template>
  <div>
    <v-row v-for="(item, index) in model" :key="index" align="center" justify="center">
      <v-col cols="1" lg="1">
        <v-text-field v-model="item.quantity" :label="$t('quantity')" type="number" min="1" :rules="rules.quantity"/>
      </v-col>
      <v-col cols="5" lg="5">
        <v-autocomplete
          :items="getTranslationItems(viewBean.units)"
          :filter="customFilter"
          item-text="content"
          :label="$t('unit')"
          v-model="item.unitId"
          :rules="rules.unit"
        />
      </v-col>
      <v-col col="5" lg="5">
        <v-autocomplete
          :items="getTranslationItems(viewBean.ingredients)"
          :filter="customFilter"
          item-text="content"
          :label="$t('ingredient')"
          v-model="item.ingredientId"
          :rules="rules.ingredient"
        />
      </v-col>
      <v-col cols="1" lg="1">
        <v-btn icon color="red" @click="removeItem(index)" v-if="isRenderDeleteButton()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-btn color="primary" x-small fab class="mb-5" @click="addMoreItem">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MultilingualConverter from '@/util/multilingualConverter'

export default {
  name: 'RecipeIngredient',
  props: {
    viewBean: {
      type: Object,
      required: true,
    },
    model: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        quantity: [(v) => !!v || this.$t('requiredField')],
        unit: [(v) => !!v || this.$t('requiredField')],
        ingredient: [(v) => !!v || this.$t('requiredField')],
      }
    }
  },
  methods: {
    addMoreItem() {
      this.$emit('addItem')
    },
    removeItem(index) {
      this.$emit('removeItem', index)
    },
    isRenderDeleteButton() {
      return (this.model?.length | 0) > 1
    },
    getTranslationItems(items) {
      return MultilingualConverter.buildItemsByCurrentLanguage(items)
    },
    customFilter(item, queryText, itemText) {
      const text = MultilingualConverter.stringToSlug(item.content)
      const searchText = MultilingualConverter.stringToSlug(queryText)
      return text.indexOf(searchText) > -1
    },
  },
}
</script>
