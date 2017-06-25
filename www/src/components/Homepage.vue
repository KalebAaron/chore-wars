<template>
  <div class="homepage">
    <navbar></navbar>
    <div class="row">
      <div class="col-12">
        <img src="http://i.imgur.com/gnWr1ON.png" class="float-left" style="width: 300px">
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-left">
        <h1>The ultimate way to do your chores.</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-left">
        <h5>If your household struggles to get all of the chores done,
          <strong>Chore Wars</strong> is the answer.</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-left">
        <p>Chore Wars is perfect for families and roommates. BLARG.....</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h4>Already a Member?</h4>
        <button class="btn btn-primary">
          <router-link to="/login">Login</router-link>
        </button>
      </div>
      <div class="col-6">
        <h4>New to Chore Wars?</h4>
        <button class="btn btn-primary register">
          <router-link to="/register">Register</router-link>
        </button>
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
      background: #5a6ed0;
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
      background: #233fc9;
      color: #ffffff;
    }

a {
      color: #ffffff;
    }
a:hover {
      text-decoration: none;
    }
</style>
