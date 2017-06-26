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
        name: "",
        password: "",
        email: "",
        loginShowing: false,
        registerShowing: false,
        loggedIn: false,
        loggedOut: true
      }

    },
    computed: {},
    methods: {
      toggleLogin() {
        this.loginShowing = true;
        this.registerShowing = false;
      },
      toggleRegister() {
        this.loginShowing = false;
        this.registerShowing = true;
      },
      login() {
        let user = {
          name: this.username,
          password: this.password
        }
        this.$store.dispatch('login', user)

      },
      createAccount() {
        let newUser = {
          name: this.username.toLowerCase(),
          email: this.email,
          password: this.password,
        }
        debugger
        this.$store.dispatch('register', newUser)
      }
    },
    components: {}
  }

</script>


<style scoped>
  li {
    margin-left: 10px;
  }
  ul{
    text-align: right;
  }

  #login {
    background-color: black;
    color: white;
  }

  #register {
    background-color: #fc0095;
    color: white;
    outline: none;
    border-color: #fc0095;
  }

  #register-button,
  #signin-button {
    background-color: #fc0095;
    color: white;
    outline: none;
    border-color: #fc0095;
    height: 50px;
  }
  .logo{
    margin-left: 10px;
  }
</style>