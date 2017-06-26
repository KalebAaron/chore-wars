<template>
    <div class="winner">
        <navbar></navbar>
        <div class="row justify-content-sm-center">
            <div class="name">
                <div class="col-12 text-center">
                    <h1 class="text-center">{{activeHousehold.name}}</h1>
                </div>
                <hr>
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
        <div class="row justify-content-sm-center">
            <div class="end">
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-success resethh" @click="resetHousehold">End Household</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'winner',
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('getHouseholds')
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        activeHousehold() {
            return this.$store.state.activeHousehold
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
    methods: {
        resetHousehold() {
            this.$store.dispatch("resetHousehold", this.activeHousehold)
        }
    },
    components: {
        Navbar
    }
}
</script>


<style scoped>
.name {
    padding-top: 10px;
    text-align: center;
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

button.resethh {
    font-size: 18px;
    font-weight: bold;
    font-family: helvetica;
    border-radius: 5px;
    border: 0px;
    padding: 10px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}

.end {
  padding-top: 20px;
}
</style>