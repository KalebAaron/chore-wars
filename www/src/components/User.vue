<template>
    <div class="user">
        <navbar></navbar>
        <div class="row justify-content-sm-center">
            <div class="col-12 text-center">
                <h1 class="text-center">{{activeHousehold.name}}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h4>User:
                    <span class="membername">{{user.name}}</span>
                    <span class="memberpoints">{{this.addUpUserPoints}}</span>
                </h4>
                <button class="pull-right logout" @click="logout(user)">Logout</button>
            </div>
        </div>
        <div class="row justify-content-sm-center">
            <div class="col-4">
                <h3 class="chores">Chores to Complete:</h3>
                <div v-for='chore in this.choresList'>{{chore.name}}
                    <button class="done" @click="updateUserCompletedChore(chore)">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <hr>
                </div>
    
            </div>
            <div class="col-4">
                <h3 class="completed">Chores Completed:</h3>
                <ul id="double">
                    <span v-for='chore in this.choresLog'>
                        <li v-if="chore.completedBy == user._id">{{chore.name}}</li>
                    </span>
                </ul>
            </div>
        </div>
        <div class="row justify-content-sm-center">
            <div class="return">
                <div class="col-12 text-center">
                    <center>
                        <router-link :to="'/households/'+activeHousehold._id">Back to Household</router-link>
                        <br>
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'user',

    data() {
        return {
            choresList: this.$store.state.activeHousehold.choresList
        }
    },
    mounted() {
        this.$store.dispatch('getUserChores', this.user._id)
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        allCompletedChores() {
            return this.$store.state.allCompletedChores
        },
        completedChores() {
            return this.$store.state.activeHousehold.completedChores
        },
        choresLog() {
            return this.$store.state.activeHousehold.choreLog
        },
        addUpUserPoints() {
            let userPoints = 0;
            let completedChores = this.$store.state.allCompletedChores
            for (var i = 0; i < completedChores.length; i++) {
                var chore = completedChores[i];
                if (chore.userId == this.user._id && chore.householdId == this.activeHousehold._id) {
                    userPoints += chore.pointsRewarded
                }
            }
            return userPoints
        }

    },
    methods: {
        updateUserCompletedChore(chore) {
            // updates user.completedChores
            chore.householdId = this.activeHousehold._id
            chore.completedBy = this.user._id;
            this.$store.dispatch('updateUserCompletedChore', { name: chore.name, choreId: chore._id, pointsRewarded: chore.points, userId: this.user._id, householdId: this.activeHousehold._id })
            this.addPointsToUser(chore)
        },
        addPointsToUser(chore) {
            // updates user.points
            this.$store.dispatch('addPointsToUser', { chore: chore, user: this.user })
            this.householdChores(chore, this.activeHousehold._id)
        },
        householdChores(chore, householdId) {
            // updates activehousehold.choreLog
            this.$store.dispatch('householdChores', { chore: chore, householdId: householdId })
            this.getAllUserChores()
        },
        getAllUserChores() {
            this.$store.dispatch('getUserChores', this.user._id)
        },
        logout() {
            this.$store.dispatch('logout', this.user)
        }
    },
    components: {
        Navbar
    }
}
</script>


<style scoped>
.membername {
    font-size: 25px;
    padding-left: 20px;
    line-height: 35px;
    padding-bottom: 5px;
}

.memberpoints {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 20px;
    color: #000;
    line-height: 20px;
    text-align: center;
    background: #5cb85c;
    padding: 10px;
}

.chores,
.completed {
    padding-top: 20px;
}

ul {
    margin-bottom: 5px;
    overflow: hidden;
}

li {
    line-height: 1.5em;
    float: left;
    display: inline;
}

#double li {
    width: 50%;
}

.return {
    margin-top: 30px;
}

a {
    color: #443f3f;
}

.done {
    font-size: 16px;
    color: #000;
    font-family: helvetica;
    background-color: #d9d7d7;
    border-radius: 10px;
    border: 0px;
    padding: 5px;
    transition-duration: 0.4s;
    height: 30px;
}

.done:hover {
    background-color: #5cb85c;
}

hr {
    border: 0px solid #fff;
}

button.logout {
    font-size: 18px;
    color: #000;
    font-weight: bold;
    font-family: helvetica;
    background-color: #a09a9a;
    border-radius: 5px;
    border: 0px;
    padding: 8px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
    margin-right: 200px;
}

button.logout:hover {
    background-color: #fff;
    color: #251f1f;
}
</style>