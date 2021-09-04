<template>
  <v-container>
    <v-btn color="primary" tile class="mb-5" :to="getCreateUrl()">
      <v-icon left> mdi-plus </v-icon>
      {{ $t('create') }}
    </v-btn>
    <v-data-table :headers="tableData.headers" :items="tableData.items" :items-per-page="5" class="elevation-1">
      <template v-slot:[`item.name`]="{ item }">
        {{ dynamicLocalization(item.name) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="teal" icon @click="editItem(item)">
          <v-icon class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn color="red" icon @click="deleteItem(item)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <app-dialog :isShowed="dialogDelete" 
      :title="$t('dialog.title.delete_item')"
      :confirmLabel="$t('dialog.button.yes')"
      :closeLabel="$t('dialog.button.cancel')"
      @onClickConfirm="deleteItemConfirm"
      @onClickCancel="closeDeleteDialog" />
  </v-container>
</template>

<script>
import DynamicLocalization from '@/mixins/dynamicLocalization'
import AppDialog from '@/components/common/AppDialog'

export default {
  components: {AppDialog},
  mixins: [DynamicLocalization],
  props: {
    tableData: {
      headers: [Object],
      items: [Object],
    },
  },
  data() {
    return {
      dialogDelete: false,
      editedIndex: -1,
      updatedId: '',
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDeleteDialog()
    },
  },
  methods: {
    getCreateUrl() {
      return this.$route.fullPath + '/create'
    },
    editItem(item) {
      this.$router.push(this.$route.fullPath + '/' + item.id)
    },
    deleteItem(item) {
      this.editedIndex = this.tableData.items.indexOf(item)
      this.updatedId = item.id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$emit('removeItem', this.editedIndex, this.updatedId)
      this.closeDeleteDialog()
    },

    closeDeleteDialog() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
  },
}
</script>
