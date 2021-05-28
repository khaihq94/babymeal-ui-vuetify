<template>
  <div>
    <v-row v-for="(item, index) in ingredients" :key="index" align="center" justify="center">
      <v-col cols="4" lg="5">
        <v-autocomplete
          :items="getTranslationItems(ages)"
          :filter="customFilter"
          item-text="content"
          :label="$t('unit')"
          v-model="item.unitId"
        />
      </v-col>
      <v-col col="6" lg="6">
        <v-autocomplete
          :items="getTranslationItems(dishes)"
          :filter="customFilter"
          item-text="content"
          :label="$t('ingredient')"
          v-model="item.ingredientId"
        />
      </v-col>
      <v-col cols="2" lg="1">
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
export default {
  name: 'RecipeIngredient',
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
  }),
  methods: {
    addMoreItem() {
      this.$emit('addItem')
    },
    removeItem(index) {
      this.$emit('removeItem', index)
    },
    isRenderDeleteButton() {
      return (this.items?.length | 0) > 1
    },
  },
}
</script>
