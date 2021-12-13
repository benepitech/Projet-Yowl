<template>
    <div class= "container">
        <PostHomeTxtHeader/>
        <PostHomeTxtBody/>
        <PostHomeTxtFooter/>
    </div>
</template>

<script>

import PostHomeTxtBody from './PostHomeTxtBody.vue';
import PostHomeTxtHeader from './PostHomeTxtHeader.vue';
import PostHomeTxtFooter from './PostHomeTxtFooter.vue';

export default {
    name:"PostHomeTxt",
    components:{
        PostHomeTxtHeader,
        PostHomeTxtBody,
        PostHomeTxtFooter
    }
}
</script>