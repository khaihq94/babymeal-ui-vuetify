<template>
  <div class="page-ages">
    <v-container>
        <crud-table :createEditPageUrl="createUrl" :tableData="tableData"
          @removeItem="removeItem"
        />
    </v-container>
  </div>
</template>

<script>
import CrudTable from '@/components/table/CrudTable'
export default {
  name: 'Age',
  components: {
    CrudTable,
  },
  data: () => ({
    createUrl: {
      name: "age-create",
      params: {
        titleLabel: 'Age'
      }
    },
    tableData: {
      headers: [
      { text: 'Id', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [
      {
        id: "159",
        name: 'Carrot',
      },
      {
        id: "152",
        name: 'Spinach',
      },
      {
        id: "151",
        name: 'Rice',
      },
    ],
    }
  }),
  computed: {
  },
  methods: {
    removeItem(index) {
      this.tableData.items.splice(index, 1)
    }
  }
}
</script>
