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
import UnitModel from '@/model/UnitModel'
import UnitContentModel from '@/model/UnitContentModel'
import request from '@/util/request'
import UnitModelMapper from '@/mapper/UnitModelMapper'

export default {
  name: 'unit-update',
  components: {
    Unit,
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
        console.log(resp);
        resp.name.forEach((el) => {
          this.contents.push(new UnitContentModel(el.language, el.content, el.description))
        })
      })
    } else {
      this.contents.push(new UnitContentModel())
    }
  },
  data() {
    return {
      contents: [],
      baseApiUrl: '/auth/units',
      postRedirectPagePath: '/admin/units',
      isEditing: false
    }
  },
  methods: {
    getPageTitle() {
      if (this.isEditing) return 'edit'
      return 'create'
    },
    addItem() {
      this.contents.push(new UnitContentModel())
    },
    removeItem(index) {
      this.contents.splice(index, 1)
    },
    save() {
      if (this.isEditing) {
        request({
          url: this.baseApiUrl + '/' + this.$route.params.id,
          method: 'put',
          data: UnitModelMapper.toModelForEditing(this.$route.params.id, this.contents),
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
          data: UnitModelMapper.toModelForCreation(this.contents),
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
