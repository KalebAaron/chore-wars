import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

let state = {
  user: {},
  error: {},
  households: [],
  activeHousehold: {},
  chores: {},
  prize: {},
  allCompletedChores: []
}

let handleError = (err) => {
  state.error = err
}

export default new Vuex.Store({
  state,
  mutations: {
    setUser(state, user) {
      state.user = user
      router.push('/start')
    },
    setError(state) {
      state.error = {}
    },
    setLogin(state, user) {
      state.user = user
      router.push('/start')
    },
    setActiveHousehold(state, activeHousehold) {
     //
      //state.activeHousehold = activeHousehold
      //debugger
      Vue.set(state, "activeHousehold", activeHousehold)
    },
    setHouseholds(state, households) {
      state.households = households
    },
    setPrize(state, prize) {
      state.prize = prize
    },
    setChores(state, chores) {
      state.chores = chores
    },
    setHouseholdChores(state, chores) {
      //state.activeHousehold.choresList = chores;
      Vue.set(state.activeHousehold, "choresList", chores)
    },
    setMembers(state, member) {
      //
      //state.activeHousehold.choresList = chores;

      //Vue.set(state.activeHousehold, "members", member)
      state.activeHousehold.members.push(member)
    },
    setMembersChores(state, member) {
      //
      state.user.completedChores.push(member.completedChores)
    },
    addCompletedChore(state, chore) {
      // //
      //  state.user.completedChores.push(chore)
    },
    addNewChore(state, chore) {
      state.chores.push(chore)
    },
    setMemberPoints(state, member){
      //
      state.user.points = 0;
     //
      for (var i  = 0; i < member.completedChores.length; i++) {
        var chore = member.completedChores[i];
        if(chore.householdId == state.activeHousehold._id){
          state.user.points += chore.pointsRewarded
        }
      }
    },
    setUserPoints(state, user) {
      var householdId = state.activeHousehold._id
      if (!user.points.householdId) {
        Vue.set(state.user.points, state.activeHousehold._id, user.points[state.activeHousehold._id])
        // state.user.points[chore.householdId] = chore.chorePoints
      } else {
       // debugger
        state.user = user
       // state.user.points[state.activeHousehold._id] = user.points[state.activeHousehold._id]
        Vue.set(state, "user", user)
      }
      //Added points so they live on the household they were earned on!
    },
    householdChores(state, chore) {
     // debugger
      state.activeHousehold.choreLog.push(chore)
      state.activeHousehold.completedChores.push(chore)
    },
    addHouseholdPrize(state, prize) {
      state.activeHousehold.prize = prize
    },
    setCreator(state, user) {
     //
      state.activeHousehold.members.push(user)
    },
    setHouseholdMembers (state, user) {
      state.activeHousehold.members.push(user)
    },
    setUserCompletedChore (state, chore) {
     //
      state.user.completedChores.push(chore)
     // Vue.set(state, "user", user)
    },
    setUserChores (state, user){
     //
     state.allCompletedChores = [];
      for (var i = 0; i < user.completedChores.length; i++) {
        var chore = user.completedChores[i];
          state.allCompletedChores.push(chore)
      }
    },
      setNewHousehold(state, household) {
       // debugger
      router.push('households/' + household.householdId)
    },
  },
  actions: {
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          commit('setLogin', res.data.data)
          if (res.data.error) {
            return handleError(res.data.error)
          }
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          router.push('/start')
        })
        .catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          //state.user = res.data.data
          if (state.user === null) {
            router.push('/')
          } else {
            router.push('/start')
          }
        }).catch(err => {
          router.push('/')
        })
    },
    logout({commit, dispatch}, user) {
      auth.delete('logout', user)
        .then(res => {
          router.push('/')
        }).catch(handleError)
    },
    clearError({ commit, dispatch }) {
      commit('setError')
    },
    getHouseholds({ commit, dispatch }) {
      api('gethouseholds')
        .then(res => {
          commit('setHouseholds', res.data.data)
        })
        .catch(handleError)
    },
    getHousehold({ commit, dispatch }, id) {
      api('house/' + id)
        .then(res => {
          //for each member id in household, dispatch get member
          commit('setActiveHousehold', res.data.data)

        })
        .catch(handleError)
    },
    getMembers({ commit, dispatch }, id) {
      api('member/' + id)
        .then(res => {
          commit('setMembers', res.data.data)
        })
        .catch(handleError)
    },
    getMemberChores({ commit, dispatch }, id) {
      api('member/' + id)
        .then(res => {
          commit('setMembersChores', res.data.data)
        })
        .catch(handleError)
    },
    getUserChores({ commit, dispatch }, id) {
      api('member/' + id)
        .then(res => {
          //
          commit('setUserChores', res.data.data)
        })
        .catch(handleError)
    },
    getPrize({ commit, dispatch }, prize) {
      api('households/' + prize.householdId + "/prize/" + prize._id)
        .then(res => {
          commit('setPrize', res.data.data)
        })
        .catch(handleError)
    },
    getChores({ commit, dispatch }) {
      api('chores')
        .then(res => {
          commit('setChores', res.data.data)
        })
        .catch(handleError)
    },
    createHousehold({ commit, dispatch }, household) {
      api.post('households', household)
        .then(res => {
         // commit('setActiveHousehold', res.data.data)
          dispatch('addHouseholdIdToUser', {householdId: res.data.data._id, user: household.user})
        })
        .catch(handleError)
    },
    createChore({ commit, dispatch }, chore) {
      // //
      api.post('chores', chore)
        .then(res => {

          commit('addNewChore', res.data.data)
        })
        .catch(handleError)
    },
    addHouseholdIdToUser({ commit, dispatch }, householdData) {
      api.post('addCreator/'+ householdData.householdId,  householdData.user)
        .then(res => {
          commit('setActiveHousehold', res.data.data)
          commit('setNewHousehold', householdData)
        })
        .catch(handleError)
    },
    createPrize({ commit, dispatch }, prize) {
      api.post('prize/', prize)
        .then(res => {
          dispatch('getPrize')
        })
        .catch(handleError)
    },
    addHouseholdPrize({ commit, dispatch }, prize) {
      api.post('households/' + prize.householdId + '/prize', prize)
        .then(res => {

          dispatch('addHouseholdPrize', prize)
        })
        .catch(handleError)
    },
    addChoresToHousehold({ commit, dispatch }, activeHousehold) {
      api.put('households/' + activeHousehold._id + '/chores', activeHousehold.choresList)
        .then(res => {
          commit('setHouseholdChores', res.data.data)
          router.push('/households/' + activeHousehold._id)
        })
        .catch(handleError)
    },
    addPointsToUser({ commit, dispatch }, { chore, user }) {
      api.put('addPointsToUser', { chore, user })
        .then(res => {
        //
          commit('setUserPoints', res.data.data)
        })
        .catch(handleError)
    },
    updateUserCompletedChore({ commit, dispatch }, completedChore) {
      api.post('completed-chores', completedChore)
        .then(res => {
          commit('setUserCompletedChore', res.data.data)
        })
        .catch(handleError)
    },
    getMemberPoints({ commit, dispatch }, memberId) {
      api('member/' + memberId, memberId)
      .then(res => {
        commit('setMemberPoints', res.data.data)
      }) .catch(handleError)
    },
    householdChores({ commit, dispatch }, { chore, householdId }) {

      api.put('householdChores', { chore, householdId })
        .then(res => {

          commit('householdChores', res.data.data.chore)
        })
        .catch(handleError)
    },
    searchUsers({ commit, dispatch }, data) {
     // debugger
      api.post("findUsers", data)
        .then(res => {
          debugger
          commit('setHouseholdMembers', res.data.data)
        })
        .catch(handleError)
    },
    startHousehold({commit, dispatch}, householdData){
     // debugger
      api.put('startHousehold', householdData)
        .then(res => {
          //debugger
           commit('setActiveHousehold', res.data.data)
          //probably send some notification to the user that the house has been started, create two week countdown
        })
        .catch(handleError)
    },
    checkIfHouseHasEnded({commit, dispatch}, timeData){
      api('housedata/' + timeData.householdId)
        .then(res => {
         // debugger
          if(res.data.data.endDate.endMonth == timeData.checkDate.checkMonth && res.data.data.endDate.endDay == timeData.checkDate.checkDay && res.data.data.endDate.endHour == timeData.checkDate.checkHour){
            router.push('households/' + timeData.householdId + "/winner")
          } 

        })
        .catch(handleError)
    },
    resetHousehold({commit, dispatch}, activeHousehold){
     // debugger
      api.post('resetHousehold', activeHousehold)
      .then (res => {
      //  debugger
        router.push('households')
      })
    }
  }

})