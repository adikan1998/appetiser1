<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="elevation-0 teal darken-3">
        <v-toolbar-title v-if="login_form"><v-icon class="pa-2">mdi-login</v-icon>Login</v-toolbar-title>
        <v-toolbar-title v-else><v-icon class="pa-2">mdi-account-plus-outline</v-icon>Register</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex justify-center py-10">
        <div>
          <v-img src="@/assets/appetiser-logo.png" width="300"></v-img>
        </div>
      </div>
      <v-card-text class="pr-10 pl-10">
        <!-- LOGIN FORM -->
        <v-form lazy-validation ref="loginform" v-if="login_form"  @keyup.native.enter="submitLogin(login)">
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
            :rules="[v => !!v || 'Username or Email is required']"
          ></v-text-field>
        </v-form>
        <!-- REGISTRATION FORM -->
        <v-form lazy-validation v-else ref="registerform"  @keyup.native.enter="submitRegister(register)">
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
        <template v-if="login_form">
          <v-btn depressed dark color="light-blue darken-4" @click="login_form = !login_form">
            <v-icon left>
              mdi-account-plus-outline
            </v-icon>
            Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="teal darken-3" @click="submitLogin(login)">
            <v-icon class="pa-2">mdi-login</v-icon>
            Login</v-btn>
          <v-btn>
            <v-icon class="pa-2">mdi-eraser</v-icon>
            Clear</v-btn>
            <v-btn @click="resendVerification">resend</v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" @click="login_form = true">
            <v-icon class="pa-2">mdi-login</v-icon>
            Back to Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="teal darken-3" @click="submitRegister(register)">
            <v-icon left> mdi-account-plus-outline </v-icon>
            Register</v-btn>
            <v-btn>
              <v-icon class="pa-2">mdi-eraser</v-icon>
              Clear
            </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  data: () => ({
    login_form: true,
    login: {
      email: '',
      password: ''
    }, 
    register: {
      email: '',
      full_name: '',
      password: '',
      password_confirmation: ''
    }
  }),
  methods: {
    async submitRegister (register) {
      if (this.$refs.registerform.validate()) {
        const response = await window.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/register', register)
        window.axios.defaults.headers.common.Authorization = response.data.token_type + ' ' + response.data.access_token
        window.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
      }
    },
    async resendVerification () {
      const payload = {
        via: 'email'
      }
      window.axios.defaults.headers.common.Authorization = 'Bearer 1139|jeVgeI4u0v2Lk6F1d1riyf77yMSBdp1g9ZXObIxs'
      const response = await window.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/resend', payload)
    }
  }
} 
</script>
