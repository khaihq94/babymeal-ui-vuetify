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
              <v-col cols="4" lg="5">
                <v-autocomplete
                  :items="getTranslationItems(ages)"
                  :filter="customFilter"
                  item-text="content"
                  :label="$t('age')"
                />
              </v-col>
              <v-col col="6" lg="6">
                <v-autocomplete
                  :items="getTranslationItems(dishes)"
                  :filter="customFilter"
                  item-text="content"
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
            language: 'vi',
            content: 'Món chính',
          },
          {
            language: 'en',
            content: 'Main dish',
          },
        ],
      },
      {
        id: 2,
        names: [
          {
            language: 'vi',
            content: 'Món phụ',
          },
          {
            language: 'en',
            content: 'Side dish',
          },
        ],
      },
    ],
    ages: [
      {
        id: 1,
        names: [
          {
            language: 'vi',
            content: '5-8 tháng',
          },
          {
            language: 'en',
            content: '5-8 months',
          },
        ],
      },
      {
        id: 2,
        names: [
          {
            language: 'vi',
            content: '9-12 tháng',
          },
          {
            language: 'en',
            content: '9-12 months',
          },
        ],
      },
    ],
    recipe: {
      names: [
        {
          language: '',
          content: '',
        },
      ],
      steps: [
        {
          language: '',
          content: '',
        },
      ],
      dishId: '',
      ageId: '',
      recipeIngredients: [
        {
          unit: [
            {
              language: '',
              content: '',
            },
          ],
          ingredientId: '',
        },
      ],
      suggestionRecipeId: '',
    },
    names: [
      {
        language: '',
        content: '',
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
        language: '',
        content: '',
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
      const text = MultilingualConverter.stringToSlug(item.content)
      const searchText = MultilingualConverter.stringToSlug(queryText)
      return text.indexOf(searchText) > -1
    },
  },
}
</script>
