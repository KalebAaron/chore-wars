<template>
  <div class="login">
    <navbar></navbar>
    <div class="row justify-content-sm-center">
      <div class="col-8 text-left">
        <div class="loginform">
          <h2 class="text-center">Log in to Chore Wars</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="text" v-model="email" id="email" class="form-control" placeholder="Email" aria-describedby="sizing-addon1">
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" v-model="password" id="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon1">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-success btn-lg">Submit</button>
            </div>
          </form>
          <p class="text-center">Don't have an account?
            <router-link to='/register'> Register here</router-link>.
          </p>
        </div>
      </div>
    </div>
    <error></error>
  </div>
</template>


<script>
import Error from '@/components/Error'
import Navbar from '@/components/Navbar'
export default {
  name: 'login',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  computed: {},
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', user)
    }
  },
  components: {
    Navbar,
    Error
  }
}

</script>


<style scoped>
.form-group {
  width: 100%;
}

.loginform {
  background-color: #fff;
  width: 100%;
  padding: 40px;
}

.btn {
  padding: 12px 22px;
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
a {
  color: #251f1f;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>