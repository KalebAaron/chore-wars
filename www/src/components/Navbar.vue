<template>
  <div class="navbar">
    <div class="row">
      <div class="col-12">
        <center>
          <img src="http://i.imgur.com/V8xAS9b.jpg" class="img-fluid">
        </center>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'navbar',
  data() {
    return {

    }

  },
  mounted() {

  },

  computed: {
    user() {
      return this.$store.state.user
    },
    activeHousehold() {
      return this.$store.state.activeHousehold
    }
  },
  methods: {
    logout() {

      this.$store.dispatch('logout', this.user)
    }
  },
  components: {}
}
</script>


<style scoped>
h1 {
  font-family: helvetica;
  font-size: 40px;
  font-weight: bold;
  padding-top: 0px;
  margin-top: 0px;
}

.navbar-brand {
  padding-left: 20px
}
</style>