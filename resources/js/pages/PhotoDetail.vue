<template>
  <div 
    v-if="photo" 
    class="photo-detail"
    v-bind:class="{ 'photo-detail--column': fullWidth }"
  >
    <figure 
      class="photo-detail__pane photo-detail__image"
      v-on:click="fullWidth = ! fullWidth"
    >
      <img v-bind:src="photo.url" alt="">
      <figcaption>Posted by {{ photo.owner.name }}</figcaption>
    </figure>
    <div class="photo-detail__pane">
      <button class="button button--like" title="Like photo">
        <i class="icon ion-md-heart"></i>12
      </button>
      <a
        v-bind:href="`/photos/${photo.id}/download`"
        class="button"
        title="Download photo"
      >
        <i class="icon ion-md-arrow-round-down"></i>Download
      </a>
      <h2 class="photo-detail__title">
        <i class="icon ion-md-chatboxes"></i>Comments
      </h2>
    </div>
  </div>
</template>

<script>
import { OK } from '../util'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      photo: null,
      fullWidth: false      
    }
  },
  methods: {
    async fetchPhoto () {
      const response = await axios.get(`/api/photos/${this.id}`)

      if (response.status !== OK) {
        this.$store.commit('error/setCode', response.status)
        return false
      }

      this.photo = response.data
    }
  },
  // $route を監視してページが切り替わったときに fetchPhoto が実行される  
  watch: {
    $route: {
      async handler () {
        await this.fetchPhoto()
      },
      immediate: true // コンポーネントが生成されたタイミングでも実行される
    }
  }
}
</script>