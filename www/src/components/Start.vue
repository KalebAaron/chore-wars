<template>
  <div class="start">
    <navbar></navbar>
    <div class='myhouseholds'>
      <div class="row">
        <div class="col-12">
          <h2 class="float-left">Your Households:</h2>
        </div>
      </div>
      <div class="row justify-content-sm-center">
        <div class="col-5" v-for="household in households">
            <router-link :to="'/households/'+household._id">
              <button class="household">
                <i class="fa fa-home" aria-hidden="true"></i>
                {{household.name}}</button>
            </router-link>
        </div>
        <h3 v-if="households[0] == null">You have not created or joined any households yet.</h3>
      </div>
    </div>
    <div class="row">
      <div class="add">
        <div class="col-12">
          <h2 class="float-left">Add a household:</h2>
        </div>
      </div>
    </div>
    <div class="row justify-content-sm-center">
      <div class="col-10">
        <form class="form-inline" @submit.prevent="createHousehold">
          <div class="col-12 col-sm-6">
            <input type="text" class="form-control" v-model="name" name="name" placeholder="Household Name or Street Number and Address"> &nbsp;
          </div>
          <div class="col-12 col-sm-6">
            <button type="submit" class="btn btn-primary create">Create a New Household</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'start',
  data() {
    return {
      name: '',
      creatorId: this.$store.state.user._id,
      newHousehold: false,
      addHouseholdButton: true,
    }
  },
  mounted() {
    this.$store.dispatch('getHouseholds')
  },
  computed: {
    households() {
      return this.$store.state.households
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    createHousehold() {
      this.$store.dispatch("createHousehold", { name: this.name, creatorId: this.$store.state.user._id, user: this.user })
      // this.addHouseholdIdToUser();
    },
    addHouseholdIdToUser() {
      this.$store.dispatch('addHouseholdIdToUser', { user: this.user, householdId: this.$store.state.activeHousehold._id })
    }
  },
  components: {
    Navbar
  }
}


</script>


<style scoped>
h2 {
  color: #251f1f;
  padding-left: 50px;
}
h3 {
  font-size: 22px;
}

button.household {
  font-size: 25px;
  color: #fff;
  font-weight: bold;
  font-family: helvetica;
  background-color: #a09a9a;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.household:hover {
  background-color: #d9d7d7;
  color: #251f1f;
}

button.create {
  font-size: 18px;
  color: #251f1f;
  font-weight: bold;
  font-family: helvetica;
  background-color: #d9d7d7;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 22px;
  transition-duration: 0.4s;
}

button.create:hover {
  background-color: #a09a9a;
  color: #fff;
}

input[type=text] {
  width: 100%;
  height: 43px;
  float: left;
}

.myhouseholds {
  background-color: #fff;
  width: 100%;
  padding: 40px;
}
.add {
  background-color: #fff;
  width: 100%;
  padding: 40px;
  padding-bottom: 5px;
}
</style>