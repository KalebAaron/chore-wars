<template>
  <div class="chores">
    <navbar></navbar>
    <div class="row justify-content-sm-center">
      <div class="col-12 text-center">
        <h2 class="text-center add">Add Chores to your Household</h2>
        <p>Reminder: Once your chores have been submitted, you cannot go back and add more.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addChoresToHousehold(checkedChores)">
          <div class="loop" v-for="chore in chores">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :value="chore" v-model="checkedChores">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">{{chore.name}} </span>
            </label>
            <span>Value: </span>
            <input type="number" min="1" max="10" v-model.number="chore.points" :placeholder="chore.points">
          </div>
          <h5 class="add">Add your own to the list: </h5>
          <input type="text" placeholder="Add a chore" v-model="newChore.name">
          <input type="number" v-model.number="newChore.points" placeholder="Your Chore Points">
          <button @click="createChore(newChore)" type="button" class="btn btn-primary addchore">+</button>
          <br>
          <br>
          <button type="submit" class="btn btn-success addchores">Submit Chore List</button>
        </form>
      </div>
    </div>
    <div class="row justify-content-sm-center">
            <div class="return">
                <div class="col-12 text-center">
                    <center>
                        <p class="back">Not ready yet? <router-link :to="'/households/'+activeHousehold._id">Back to Household</router-link></p>
                    </center>
                </div>
            </div>
        </div>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'chores',
  data() {
    return {
      checkedChores: [],
      newChore: { name: '', points: '' }

    }

  },
  mounted() {
    this.$store.dispatch('getChores')
    this.$store.dispatch('getHousehold', this.$route.params.id)
  },
  computed: {
    chores() {
      return this.$store.state.chores
    },
    activeHousehold() {
      return this.$store.state.activeHousehold
    }
  },
  methods: {
    addChoresToHousehold(chores) {
      this.activeHousehold.choresList = chores
      this.$store.dispatch('addChoresToHousehold', this.activeHousehold)

    },
    createChore(newChore) {
      //
      this.$store.dispatch('createChore', newChore)
    }
  },
  components: {
    Navbar
  }
}

</script>


<style scoped>
.add {
  padding-top: 20px;
}

button.addchores {
    font-size: 18px;
    font-weight: bold;
    font-family: helvetica;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

.addchore {
    font-size: 16px;
    color: #000;
    font-family: helvetica;
    background-color: #d9d7d7;
    border: 0px;
    padding: 10px;
    transition-duration: 0.4s;
}
.addchore:hover {
    background-color: #5cb85c;
}

a {
    color: #443f3f;
    text-decoration: underline;
}

.back {
  padding-top: 20px;
}
</style>