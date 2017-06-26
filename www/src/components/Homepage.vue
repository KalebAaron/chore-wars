<template>
  <div class="homepage">
    <nav class="navbar navbar-toggleable-md">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#about" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fa fa-bolt" aria-hidden="true"></i> About</a>
          </li>
          <li class="nav-item">
            <a href="#how-to" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fa fa-bolt" aria-hidden="true"></i> How to Play</a>
          </li>
          <li class="nav-item">
            <a href="#start" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fa fa-bolt" aria-hidden="true"></i> Start</a>
          </li>
          <li class="nav-item">
            <router-link to='/login' class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fa fa-bolt" aria-hidden="true"></i> Log In</router-link>
          </li>
          <li class="nav-item">
            <router-link to='/register' class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fa fa-bolt" aria-hidden="true"></i> Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="col-12">
        <center>
          <img src="http://i.imgur.com/6xjLJsi.jpg" class="img-fluid">
        </center>
      </div>
    </div>
    <div class="row" id="about">
      <div class="about">
        <div class="col-12 text-left">
          <h2>What is Chore Wars?</h2>
          <p>If your household struggles to get chores done,
            <strong>Chore Wars</strong> is the answer. Chore Wars was built on the concept that everyone likes to be rewarded for doing a task. Whether you're a family trying to get children to do chores, or you're in a household full of roommates who enjoy a bit of competition, get chores in your house done the Chore Wars way!</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="how-to" id="how-to">
        <div class="col-12 text-left">
          <h2>How to Play</h2>
          <p>Playing chore wars is easy.</p>
          <ol>
            <li>Everyone in the household must
              <a href="#start">create an account</a>. </li>
            <li>Decide who will create the household. </li>
            <li>Once the household has been created, "Add Chores" to your household and select their point value. These chores will be the possible chores for your household to complete. Make your decisions now, because you can't go back and add more chores. That's cheating.</li>
            <li>Invite members to your household.</li>
            <li>Decide on a prize for the winner.</li>
            <li>Now "Start Your Household". The Household will finish at the end of 2 weeks. Once the two weeks is over, whoever has the most points at the end is the winner. Losers split up the cost of the prize!</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="start" id="start">
        <div class="col-12 text-left">
          <h2>Start</h2>
          <p>Log in here or sign up!</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-sm-center">
      <div class="col-5">
        <h3>Already a Member?</h3>
        <button class="btn btn-primary">
          <router-link to="/login">Login</router-link>
        </button>
      </div>
      <div class="col-5">
        <h3>New to Chore Wars?</h3>
        <button class="btn btn-primary register">
          <router-link to="/register">Register</router-link>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="footer">
        <div class="col-12">
          <p class="text-center footer">Created by Amy Roche, Kaleb Hundersmarck, and Nathan Elg at Boise CodeWorks.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Login from './Login'

export default {
  name: 'homepage',
  data() {
    return {
      msg: 'Welcome to ChoreWars'
    }
  },
   components: {
    Navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 20px;
  font-family: geneva;
  font-weight: bold;
}

h3 {
  font-size: 24px;
}

.btn {
  padding: 14px 24px;
  border: 0 none;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.btn:focus,
.btn:active:focus,
.btn.active:focus {
  outline: 0 none;
}

.btn-primary {
  background: #a09a9a;
  color: #ffffff;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open>.dropdown-toggle.btn-primary {
  background: #7c7c7e;
}

.btn-primary:active,
.btn-primary.active {
  background: #5a6ed0;
  box-shadow: none;
}

.register {
  background: #d9d7d7;
  color: #ffffff;
}

a {
  color: #251f1f;
}

a:hover {
  text-decoration: none;
}

.about {
  background-color: #a09a9a;
  width: 100%;
  padding: 40px;
}

.how-to {
  background-color: #d9d7d7;
  width: 100%;
  padding: 40px;
}

.start {
  background-color: #fff;
  width: 100%;
  padding: 50px;
  padding-bottom: 20px;
}
.footer {
  background-color: #251f1f;
  width: 100%;
  padding: 5px;
  margin-top: 40px;
}

.navbar {
  background-color: #fff;
  border: none;
  margin-right: 100px;
}

.navbar-nav>li>a,
a:active {
  color: #251f1f;
  font-size: 18px;
  text-transform: uppercase;
  font-family: tahoma;
  padding: 20px;
  padding-bottom: 0px;
}

.navbar-nav>li>a:hover {
  color: #251f1f !important;
}

.navbar-nav>li {
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

p,
ol {
  font-size: 20px;
}
p.footer {
  color: #fff
}
</style>
