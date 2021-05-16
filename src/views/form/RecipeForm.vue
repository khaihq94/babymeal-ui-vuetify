<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ getPageTitle() }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col col="12">
                <h2 class="text-subtitle-1">Name</h2>
              </v-col>
            </v-row>
            <translation :items="recipe.names" @addItem="addName" @removeItem="removeName" />
            <v-row>
              <v-col col="6">
                <v-autocomplete
                  :items="getTranslationItems(ages)"
                  :filter="customFilter"
                  item-text="name"
                  :label="$t('age')"
                />
              </v-col>
              <v-col col="6">
                <v-autocomplete
                  :items="getTranslationItems(dishes)"
                  :filter="customFilter"
                  item-text="name"
                  :label="$t('dish')"
                />
              </v-col>
            </v-row>
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
import MultilingualConverter from '@/util/multilingualConverter'

export default {
  name: 'TranslationForm',
  components: {
    Translation,
  },
  data: () => ({
    dishes: [
      {
        id: 1,
        names: [
          {
            lang: 'vi',
            name: 'Món chính',
          },
          {
            lang: 'en',
            name: 'Main dish',
          },
        ],
      },
      {
        id: 2,
        names: [
          {
            lang: 'vi',
            name: 'Món phụ',
          },
          {
            lang: 'en',
            name: 'Side dish',
          },
        ],
      },
    ],
    ages: [
      {
        id: 1,
        names: [
          {
            lang: 'vi',
            name: '5-8 tháng',
          },
          {
            lang: 'en',
            name: '5-8 months',
          },
        ],
      },
      {
        id: 2,
        names: [
          {
            lang: 'vi',
            name: '9-12 tháng',
          },
          {
            lang: 'en',
            name: '9-12 months',
          },
        ],
      },
    ],
    recipe: {
      names: [
        {
          lang: '',
          name: '',
        },
      ],
      steps: [
        {
          lang: '',
          name: '',
        },
      ],
      dishId: '',
      ageId: '',
      recipeIngredients: [
        {
          unit: [
            {
              lang: '',
              name: '',
            },
          ],
          ingredientId: '',
        },
      ],
      suggestionRecipeId: '',
    },
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
    addName() {
      this.recipe.names.push({
        lang: '',
        name: '',
      })
    },
    removeName(index) {
      this.recipe.names.splice(index, 1)
    },
    save() {
      console.log(this.$route.params.id)
    },
    getTranslationItems(items) {
      return MultilingualConverter.buildItemsByCurrentLanguage(items)
    },
    customFilter(item, queryText, itemText) {
      const text = MultilingualConverter.stringToSlug(item.name)
      const searchText = MultilingualConverter.stringToSlug(queryText)
      return text.indexOf(searchText) > -1
    },
  },
}
</script>
