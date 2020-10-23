<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="elevation-0 teal darken-3">
        <v-toolbar-title><v-icon class="pa-2">mdi-account-plus-outline</v-icon>Register</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex justify-center py-10">
        <div>
          <v-img src="@/assets/appetiser-logo.png" width="300"></v-img>
        </div>
      </div>
      <v-card-text class="pr-10 pl-10">
        <!-- REGISTRATION FORM -->
        <v-form lazy-validation ref="registerform"  @keyup.native.enter="submitRegister()">
          <v-text-field
            label="Email"
            solo
            v-model="register.email"
            :rules="[v => !!v || 'Email is required']"
          ></v-text-field>
          <v-text-field
            label="Full Name"
            solo
            v-model="register.full_name"
            :rules="[v => !!v || 'Full Name is required']"
          ></v-text-field>
          <v-text-field
            label="Password"
            solo
            type="password"
            v-model="register.password"
            :rules="[v => !!v || 'Password is required']"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            solo
            type="password"
            v-model="register.password_confirmation"
            :rules="[v => v === register.password || 'Password and Confirm Password does not match']"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn depressed to="/login">Back to Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="teal darken-3" @click="submitRegister()" :loading="loading">
          <v-icon left> mdi-account-plus-outline </v-icon>
          Register
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
    register: {
      email: '',
      full_name: '',
      password: '',
      password_confirmation: ''
    },
    loading: false
  }),
  methods: {
    async submitRegister () {
      if (this.$refs.registerform.validate()) {
        try {
          this.loading = true
          const response = await window.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/register', this.register)
          if (response.data.http_status === 200) {
            this.snackbar_color = 'green darken-2'
            this.snackbar_text = 'Register Successful!'
            this.snackbar = true
            window.axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.data.access_token
            window.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
            this.$router.push('/verify')
          }
        } catch (error) {
          this.snackbar_color = 'red darken-2'
          this.snackbar_text = error
          this.snackbar = true
        } finally {
          this.loading = false
        }
      }
    },
    clear () {
      this.register = {}
    }
  }
}
</script>
