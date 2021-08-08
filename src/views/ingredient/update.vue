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
import request from '@/util/request'
import AgeModelMapper from '@/mapper/AgeModelMapper'

export default {
  name: 'ingredient-update',
  components: {
    Translation,
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.isEditing = true;
    }
    if (this.isEditing) {
      request({
        url: this.baseApiUrl + "/" + this.$route.params.id,
        method: 'get',
      }).then((resp) => {
        resp.name.forEach((el) => {
          this.contents.push(new TranslationModel(el.language, el.content))
        })
      })
    } else {
      this.contents.push(new TranslationModel())
    }
  },
  data() {
    return {
      contents: [],
      baseApiUrl: '/auth/ingredients',
      postRedirectPagePath: '/admin/ingredients',
      isEditing: false
    }
  },
  computed: {},
  methods: {
    getPageTitle() {
      if (this.isEditing) return 'edit'
      return 'create'
    },
    addItem() {
      this.contents.push(new TranslationModel())
    },
    removeItem(index) {
      this.contents.splice(index, 1)
    },
    save() {
      if (this.isEditing) {
        request({
          url: this.baseApiUrl + '/' + this.$route.params.id,
          method: 'put',
          data: AgeModelMapper.toModelForEditing(this.$route.params.id, this.contents),
        })
          .then(() => {
            this.$store.dispatch('showSuccessSnackbar', this.$t('snackbar.message.update_successfully'))
            this.$router.push(this.postRedirectPagePath)
          })
          .catch((resp) => {
            this.$store.dispatch('showErrorSnackbar', resp)
          })
      } else {
        request({
          url: this.baseApiUrl,
          method: 'post',
          data: AgeModelMapper.toModelForCreation(this.contents),
        })
          .then(() => {
            this.$store.dispatch('showSuccessSnackbar', this.$t('snackbar.message.create_successfully'))
            this.$router.push(this.postRedirectPagePath)
          })
          .catch((resp) => {
            this.$store.dispatch('showErrorSnackbar', resp)
          })
      }
    },
  },
}
</script>
