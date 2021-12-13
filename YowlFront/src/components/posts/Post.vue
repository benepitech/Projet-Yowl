<template>
  <tr>
    <td class="text-danger"># {{ post.id }}</td>
    <td class="text-yellow-800">{{ post.title }}</td>
    <td class="text-yellow-800">{{ post.content }}</td>
    <td class="text-yellow-800 lg:break-all">{{ post.url }}</td>
    <td class="text-yellow-800">{{ post.category }}</td>
    <td class="text-yellow-800">{{ post.likes_number }}</td>
    <td class="text-yellow-800">{{ post.login }} <br> {{ post.user_id }}</td>
    <td class="text-yellow-800 lg:break-all">{{ post.created_at }} <br> {{ post.updated_at }}</td>
    <td>
      <button
        @click="$store.dispatch('post/removePostItem', post.id)"
        class="btn btn-sm btn btn-outline-danger"
      >
        Delete
      </button>
      <router-link
        :to="'/crudupdateposts/' + post.id" 
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
  props: ["post"],
};
</script>
