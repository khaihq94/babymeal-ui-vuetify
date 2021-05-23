<template>
  <v-container>
    <v-btn color="primary" tile class="mb-5" :to="getCreateUrl()">
      <v-icon left> mdi-plus </v-icon>
      {{ $t('create') }}
    </v-btn>
    <v-data-table :headers="tableData.headers" :items="tableData.items" :items-per-page="5" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="teal" icon @click="editItem(item)">
          <v-icon class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn color="red" icon @click="deleteItem(item)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="red" outlined @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      headers: [Object],
      items: [Object],
    },
    redirectPageUrlName: {
      create: String,
      edit: String,
    },
    apiBaseUrl: String,
  },
  data: () => ({
    dialogDelete: false,
    editedIndex: -1,
  }),
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
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$emit('removeItem', this.editedIndex)
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
