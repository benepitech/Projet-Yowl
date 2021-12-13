<template>
  <tr>
    <td class="text-danger"># {{ category.id }}</td>
    <td class="text-yellow-800">{{ category.name }}</td>
    <td>
      <button
        @click="$store.dispatch('category/removeCategoryItem', category.id)"
        class="btn btn-sm btn btn-outline-danger"
      >
        Delete
      </button>
      <router-link
        :to="'/crudupdatecategories/' + category.id" 
        tag="button"
        class="btn btn-sm btn btn-outline-warning"
      >
        Edit
      </router-link>
    </td>
  </tr>
</template>
<script>
export default {
  props: ["category"],
};
</script>
