<template>
  <v-container>
    <v-btn color="primary" tile class="mb-5" :to="createUrl">
      <v-icon left> mdi-plus </v-icon>
      Create
    </v-btn>
    <v-data-table :headers="tableData.headers" :items="tableData.items" :items-per-page="5" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
    createUrl: Object
  },
  data: () => ({
    dialogDelete: false,
    editedIndex: -1,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
    ],
  }),
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
    },

    deleteItem(item) {
      console.log('delete clicked')
      this.editedIndex = this.desserts.indexOf(item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
  },
}
</script>
