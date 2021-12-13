<template>
  <tr>
    <td class="text-danger"># {{ comment.id }}</td>
    <td class="text-yellow-800">{{ comment.content }}</td>
   
    <td class="text-yellow-800">{{ comment.login }} <br> {{ comment.user_id }}</td>
     <td class="text-yellow-800">{{ comment.post_id }}</td>
    <td class="text-yellow-800">{{ comment.created_at }} <br> {{ comment.updated_at }}</td>
    <td>
      <button
        @click="$store.dispatch('comment/removeCommentItem', comment.id)"
        class="btn btn-sm btn btn-outline-danger"
      >
        Delete
      </button>
      <router-link
        :to="'/crudupdatecomments/' + comment.id + '/' + comment.post_id" 
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
  props: ["comment"],
};
</script>
