<template>
  <tr>
    <td class="text-danger"># {{ user.id }}</td>
    <td class="text-yellow-800">{{ user.login }}</td>
    <td class="text-yellow-800">{{ user.email }}</td>
    <td class="text-yellow-800">{{ user.status }}</td>
    <td class="text-yellow-800">{{ user.created_at }} <br> {{ user.updated_at }}</td>
    <td>
      <button
        @click="$store.dispatch('user/removeUserItem', user.id)"
        class="btn btn-sm btn btn-outline-danger"
      >
        Delete
      </button>
      <router-link
        :to="'/crudupdateusers/' + user.id" 
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
  props: ["user"],
};
</script>
