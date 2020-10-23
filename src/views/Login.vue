<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="elevation-0 teal darken-3">
        <v-toolbar-title><v-icon class="pa-2">mdi-login</v-icon>Login</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex justify-center py-10">
        <div>
          <v-img src="@/assets/appetiser-logo.png" width="300"></v-img>
        </div>
      </div>
      <v-card-text class="pr-10 pl-10">
        <!-- LOGIN FORM -->
        <v-form lazy-validation ref="loginform" @keyup.native.enter="submitLogin()">
          <v-text-field
            prepend-icon="mdi-email"
            label="Username or Email"
            solo
            v-model="login.email"
            :rules="[v => !!v || 'Username or Email is required']"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-form-textbox-password"
            label="Password"
            solo
            v-model="login.password"
            type="password"
            :rules="[v => !!v || 'Password is required']"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn dark depressed color="primary" to="/register">register</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="teal darken-3" @click="submitLogin()" :loading="submitting">
          <v-icon class="pa-2">mdi-login</v-icon>
          Login
        </v-btn>
        <v-btn @click="clear()">
          <v-icon class="pa-2">mdi-eraser</v-icon>
          Clear
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :color="snackbar_color"
      :timeout="2000"
      absolute
      right
      rounded="pill"
      top
    >
      {{snackbar_text}}
    </v-snackbar>
  </v-flex>
</template>
<script>
export default {
  data: () => ({
    snackbar_color: '',
    snackbar_text: '',
    snackbar: false,
    login: {
      email: '',
      password: ''
    },
    submitting: false
  }),
  methods: {
    async submitLogin () {
      if (this.$refs.loginform.validate()) {
        try {
          this.submitting = true
          const payload = {
            username: this.login.email,
            password: this.login.password
          }
          const response = await window.axios.post(process.env.VUE_APP_API_ENDPOINT + '/auth/login', payload)
          this.snackbar_color = 'green darken-2'
          this.snackbar_text = 'Login Successful!'
          this.snackbar = true
          // set axios config
          window.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
          window.axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.data.access_token
          // set in vuex
          setTimeout(() => {
            if (response.data.data.user.verified) {
              // set the user session in cookies
              this.$cookies.set('user_session', response.data)
              this.$store.commit('auth/setUser', response.data.data.user)
              this.$store.commit('auth/setIsLoggedIn', true)
              this.$router.push('/success')
            } else {
              this.$router.push('/verify')
            }
            this.submitting = false
          }, 2000)
        } catch (error) {
          this.snackbar_color = 'red darken-2'
          this.snackbar_text = error
          this.snackbar = true
          this.submitting = false
        }
      }
    },
    clear () {
      this.login = {}
    }
  }
}
</script>
