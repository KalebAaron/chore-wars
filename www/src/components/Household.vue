<template>
    <div class="household">
        <navbar></navbar>
        <div class="row justify-content-sm-center">
            <div class="name">
                <div class="col-12 text-center">
                    <h1 class="text-center">{{activeHousehold.name}}</h1>
                    <h3 v-if='activeHousehold.prize != {}'>Prize: {{activeHousehold.prize.name}}</h3>
                    <button v-if="this.user._id == this.activeHousehold.creatorId && !this.activeHousehold.endDate" type="submit" class="btn btn-success start" @click="householdStartEndDate">Start your Household</button>
                </div>
                <hr>
            </div>
        </div>
        <div class="row justify-content-sm-center">
            <div class="col-3">
                <div class="sidebar">
                    <router-link v-if="this.activeHousehold.choresList.length <= 0" :to="'/households/'+activeHousehold._id + '/chores'">
                        <button type="button" class="btn btn-primary chores">Add Chores</button>
                    </router-link>
                    <br>
                    <router-link :to="'/households/'+activeHousehold._id + '/user'">
                        <button type="button" class="btn btn-primary user">User Profile</button>
                    </router-link>
                    <br>
                    <button type="button" class='btn btn-primary search' @click="searchFormToggle" v-show="addCollaboratorsButton">Search Users</button>
                    <form class="form-inline find-user-form" @submit.prevent="searchUsers" v-show="newSearch">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="username" name="userName" placeholder="Member Name">
                            &nbsp;<button type="submit" class="btn btn-primary searchuser" @click="searchFormToggleBack"> Add</button>
                        </div>
                    </form>
                    <br>
                    <button type="button" class='btn btn-primary prize' @click="prizeFormToggle" v-show="addPrizeButton" v-if="activeHousehold.prize.name == ''">Add Your Prize</button>
                    <form class="form-inline find-user-form" @submit.prevent="addHouseholdPrize" v-show="newPrize">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="prize.name" placeholder="Prize Name">
                            &nbsp;<button type="submit" class="btn btn-primary addprize" @click="prizeFormToggleBack">Add</button>
                        </div>
                    </form>
                    <hr>
                    <router-link :to="'/start'">Back to Households</router-link>
                </div>
            </div>
            <div class="col-7">
                <div class="maincontent">
                    <div class="row">
                        <div class="col-12">
                            <h3>Household Completed Chores:</h3>
                            <ul id="double">
                                <li v-for='completed in completedChores'>{{completed.name}}</li>
                            </ul>
                            <h6 v-if="completedChores[0] == null" class="text-center">This household has not completed any chores yet.</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h3 class="scoreboard">Scoreboard:</h3>
                            <div v-for='member in scoreBoard'>
                                <span class="membername">{{member.name}}</span> 
                                <span class="memberpoints">{{member.points}}</span>
                            </div>
                            <h6 v-if="scoreBoard == {}" class="text-center">No one in this household has earned any points yet.</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h3 class="hmembers">Household Members:</h3>
                            <ul>
                                <li v-for='member in activeHousehold.members'>{{member.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'household',
    data() {
        return {
            username: "",
            newSearch: false,
            addCollaboratorsButton: true,
            newPrize: false,
            addPrizeButton: true,
            prize: { name: '', creatorId: this.$store.state.user._id, householdId: this.$route.params.id }
        }
    },
    computed: {
        activeHousehold() {
            return this.$store.state.activeHousehold
        },
        completedChores() {
            return this.$store.state.activeHousehold.choreLog
        },
        user() {
            return this.$store.state.user
        },
        prize() {
            return this.activeHousehold.prize.name
        },
        scoreBoard() {
            let pointsDictionary = {}
            for (var i = 0; i < this.activeHousehold.members.length; i++) {

                var member = this.activeHousehold.members[i];
                for (var j = 0; j < this.activeHousehold.completedChores.length; j++) {
                    var chore = this.activeHousehold.completedChores[j];
                    if (member._id == chore.userId) {
                        if (!pointsDictionary[member._id]) {
                            pointsDictionary[member._id] = { name: '', points: '' }
                            pointsDictionary[member._id].name = member.name
                            pointsDictionary[member._id].points = chore.pointsRewarded
                        } else {
                            pointsDictionary[member._id].points += chore.pointsRewarded
                        }
                    }
                }
            }
            return pointsDictionary
        }


    },
    mounted() {
        this.$store.dispatch('getHousehold', this.$route.params.id)
    },
    methods: {
        searchFormToggle() {
            this.newSearch = true;
            this.addCollaboratorsButton = false;
        },
        searchFormToggleBack() {
            this.newSearch = false;
            this.addCollaboratorsButton = true;
        },
        prizeFormToggle() {
            this.newPrize = true;
            this.addPrizeButton = false;
        },
        prizeFormToggleBack() {
            this.newPrize = false;
            this.addPrizeButton = false;
        },
        searchUsers() {
            debugger
            this.$store.dispatch("searchUsers", { user: this.username, householdId: this.$route.params.id })
        },
        addHouseholdPrize() {
            this.$store.dispatch("addHouseholdPrize", this.prize)
        },
        householdStartEndDate() {
            let date = new Date();
            let startMonth = date.getMonth() + 1;
            let startDay = date.getDate()
            let startHour = date.getHours();
            let startMinutes = date.getMinutes();
            let startDate = {
                startMonth: startMonth,
                startDay: startDay,
                startHour: startHour,
                startMinutes: startMinutes
            }
            if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {
                if (startDay + 14 > 31) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 31;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: startDate + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return

                }
            }
            if (startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11) {
                if (startDay + 14 > 30) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 30;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: realDays + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return
                }
            }
            if (startMonth == 2) {
                if (startDay + 14 > 28) {
                    let overDays = startDay + 14;
                    let realDays = overDays - 28;
                    let endDate = {
                        endMonth: startMonth + 1,
                        endDay: realDays,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return
                } else {
                    let endDate = {
                        endMonth: startMonth,
                        endDay: startDate + 14,
                        endHour: startHour,
                        endMinutes: startMinutes
                    }
                    this.$store.dispatch('startHousehold', { startDate: startDate, endDate: endDate, householdId: this.$route.params.id })
                    this.checkIfHouseHasEnded()
                    return

                }
            }
        },
        checkIfHouseHasEnded() {
            //debugger
            let date = new Date();
            let checkMonth = date.getMonth() + 1;
            let checkDay = date.getDate()
            let checkHour = date.getHours();
            let checkMinutes = date.getMinutes();
            let checkDate = {
                checkMonth: checkMonth,
                checkDay: checkDay,
                checkHour: checkHour,
                checkMinutes: checkMinutes
            }
            this.$store.dispatch('checkIfHouseHasEnded', { checkDate: checkDate, householdId: this.activeHousehold._id })
            setInterval(this.reCheckIfHouseHasEnded, 600000);

        },
        reCheckIfHouseHasEnded() {
            this.checkIfHouseHasEnded();
        }
    },
    components: {
        Navbar
    }
}
</script>


<style scoped>
.sidebar {
    background-color: #fff;
    width: 100%;
    padding: 30px;
}

.maincontent {
    background-color: #fff;
    width: 100%;
    padding: 10px;
    text-align: left;
    padding-top: 20px;
}

.name {
    padding-top: 10px;
    text-align: center;
}

hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

button.start {
    font-size: 18px;
    font-weight: bold;
    font-family: helvetica;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

button.user {
    font-size: 18px;
    color: #000;
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

button.user:hover {
    background-color: #fff;
    color: #251f1f;
}

button.chores {
    font-size: 18px;
    color: #000;
    font-weight: bold;
    font-family: helvetica;
    background-color: #443f3f;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

button.chores:hover {
    background-color: #fff;
    color: #251f1f;
}

button.search {
    font-size: 18px;
    color: #000;
    font-weight: bold;
    font-family: helvetica;
    background-color: #d9d7d7;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

button.search:hover {
    background-color: #fff;
    color: #251f1f;
}

button.prize {
    font-size: 18px;
    color: #000;
    font-weight: bold;
    font-family: helvetica;
    background-color: #f2f1f1;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

button.prize:hover {
    background-color: #fff;
    color: #251f1f;
}

a {
    color: #000;
}

a:hover {
    text-decoration: none;
}

.scoreboard {
    padding-top: 20px;
}

.hmembers {
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

button.searchuser {
    font-size: 16px;
    color: #000;
    font-family: helvetica;
    background-color: #d9d7d7;
    border: 0px;
    padding: 10px;
    transition-duration: 0.4s;
}
button.searchuser:hover {
    background-color: #a09a9a;
}

button.addprize {
    font-size: 16px;
    color: #000;
    font-family: helvetica;
    background-color: #d9d7d7;
    border: 0px;
    padding: 10px;
    transition-duration: 0.4s;
}
button.addprize:hover {
    background-color: #a09a9a;
}
</style>