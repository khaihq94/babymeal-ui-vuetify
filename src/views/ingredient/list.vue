<template>
  <div class="page-ingredients">
    <v-container>
      <crud-table :tableData="tableData" @removeItem="removeItem" />
    </v-container>
  </div>
</template>

<script>
import CrudTable from '@/components/table/CrudTable'
import request from '@/util/request'

export default {
  name: 'ingredient-list',
  components: {
    CrudTable,
  },
  data() {
    return {
      tableData: {
        headers: [
          { text: this.$i18n.t('index'), value: 'id' },
          { text: this.$i18n.t('name'), value: 'name' },
          { text: this.$i18n.t('actions'), value: 'actions', sortable: false },
        ],
        items: [],
      },
      baseApiUrl: '/auth/ingredients',
    }
  },
  mounted() {
    request({
      url: this.baseApiUrl,
      method: 'get',
    }).then((resp) => {
      resp.forEach((el) => {
        this.tableData.items.push(el)
      })
    })
  },
  computed: {},
  methods: {
    removeItem(index, id) {
      request({
        url: this.baseApiUrl + "/" + id,
        method: 'delete',
      }).then(() => {
        this.tableData.items.splice(index, 1)
        this.$store.dispatch('showSuccessSnackbar', this.$t('snackbar.message.delete_successfully'))
      }).catch((resp) => {
        this.$store.dispatch('showErrorSnackbar', resp)
      })
    },
  },
}
</script>
