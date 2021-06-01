<template>
  <div>
    <v-container>
      <v-card tile>
        <v-card-title> {{ $t(getPageTitle()) }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col>
                <h2 class="text-subtitle-1 font-weight-bold">{{ $t('name') }}</h2>
                <translation :items="recipe.name" @addItem="addName" @removeItem="removeName" />
                <v-divider />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" lg="5">
                <v-autocomplete
                  :items="getTranslationItems(ages)"
                  :filter="customFilter"
                  item-value="id"
                  item-text="content"
                  :label="$t('age')"
                  v-model="recipe.ageId"
                  :rules="rules.age"
                />
              </v-col>
              <v-col col="6" lg="6">
                <v-autocomplete
                  :items="getTranslationItems(dishes)"
                  :filter="customFilter"
                  item-value="id"
                  item-text="content"
                  :label="$t('dish')"
                  v-model="recipe.dishId"
                  :rules="rules.dish"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2 class="text-subtitle-1 font-weight-bold">{{ $t('preparationTime') }}</h2>
                <translation :items="recipe.preparationTime" @addItem="addTime" @removeItem="removeTime" />
                <v-divider />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2 class="text-subtitle-1 font-weight-bold">{{ $t('ingredient') }}</h2>
                <recipe-ingredient
                  :viewBean="buidRecipeIngredientViewBean()"
                  :model="recipe.recipeIngredients"
                  @addItem="addIngredient"
                  @removeItem="removeIngredient"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2 class="text-subtitle-1 font-weight-bold">{{ $t('source') }}</h2>
                <translation :items="recipe.source" @addItem="addSource" @removeItem="removeSource" :isEditorTextField="true" :minItem="0" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2 class="text-subtitle-1 font-weight-bold">{{ $t('note') }}</h2>
                <translation :items="recipe.note" @addItem="addNote" @removeItem="removeNote" :isEditorTextField="true" :minItem="0" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" tile @click="save"> {{ $t('save') }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Translation from '@/components/elements/Translation'
import RecipeIngredient from '@/components/elements/RecipeIngredient'
import MultilingualConverter from '@/util/multilingualConverter'
import RecipeModel from '@/model/RecipeModel'
import TranslationModel from '@/model/TranslationModel'
import RecipeIngredientModel from '@/model/RecipeIngredientModel'

export default {
  name: 'TranslationForm',
  components: {
    Translation,
    RecipeIngredient,
  },
  data() {
    return {
      dishes: [
        {
          id: 1,
          name: [
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
          name: [
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
          name: [
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
          name: [
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
      units: [
        {
          id: 1,
          name: [
            {
              language: 'vi',
              content: 'muỗng cafe',
              description: '',
            },
            {
              language: 'en',
              content: 'spoon',
              description: '',
            },
          ],
        },
        {
          id: 2,
          name: [
            {
              language: 'vi',
              content: 'muỗng canh',
              description: '',
            },
            {
              language: 'en',
              content: 'table spoon',
              description: '',
            },
          ],
        },
      ],
      ingredients: [
        {
          id: 1,
          name: [
            {
              language: 'vi',
              content: 'Cà rốt',
            },
            {
              language: 'en',
              content: 'Carrot',
            },
          ],
        },
        {
          id: 2,
          name: [
            {
              language: 'vi',
              content: 'Cà chua',
            },
            {
              language: 'en',
              content: 'Tomato',
            },
          ],
        },
      ],
      recipe: new RecipeModel(),
      rules: {
        age: [(v) => !!v || this.$t('requiredField')],
        dish: [(v) => !!v || this.$t('requiredField')],
        recipeIngredients: [RecipeIngredientModel],
        suggestionRecipes: [(v) => !!v || this.$t('requiredField')],
        mainImage: [],
        images: [],
        videoUrl: [],
      },
    }
  },
  computed: {},
  methods: {
    getPageTitle() {
      if (this.$route.params.id === undefined) return 'create'
      return 'edit'
    },
    addName() {
      this.recipe.name.push(new TranslationModel())
    },
    removeName(index) {
      this.recipe.name.splice(index, 1)
    },
    addSource() {
      this.recipe.source.push(new TranslationModel())
    },
    removeSource(index) {
      this.recipe.source.splice(index, 1)
    },
    addTime() {
      this.recipe.preparationTime.push(new TranslationModel())
    },
    removeTime(index) {
      this.recipe.preparationTime.splice(index, 1)
    },
    addNote() {
      this.recipe.note.push(new TranslationModel())
    },
    removeNote(index) {
      this.recipe.note.splice(index, 1)
    },
    addIngredient() {
      this.recipe.recipeIngredients.push(new RecipeIngredientModel())
    },
    removeIngredient(index) {
      this.recipe.recipeIngredients.splice(index, 1)
    },
    save() {
      if (this.$refs.form.validate()) {
        console.log(this.recipe)
      }
    },
    getTranslationItems(items) {
      return MultilingualConverter.buildItemsByCurrentLanguage(items)
    },
    customFilter(item, queryText, itemText) {
      const text = MultilingualConverter.stringToSlug(item.content)
      const searchText = MultilingualConverter.stringToSlug(queryText)
      return text.indexOf(searchText) > -1
    },
    buidRecipeIngredientViewBean() {
      return {
        units: this.units,
        ingredients: this.ingredients,
      }
    },
  },
}
</script>
