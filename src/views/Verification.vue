<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="elevation-0 teal darken-3">
        <v-toolbar-title><v-icon class="pa-2">mdi-account-check</v-icon>Verification</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex justify-center py-10">
        <div>
          <v-img src="@/assets/appetiser-logo.png" width="300"></v-img>
        </div>
      </div>
      <v-card-text class="pr-10 pl-10">
        <v-card-title>
          A verification code has been sent to your email.
        </v-card-title>
        <v-form ref="verificationform" @keyup.native.enter="submitVerification()">
          <div class="d-flex">
            <v-text-field
              prepend-icon="mdi-barcode-scan"
              label="Verification Code"
              solo
              type="number"
              v-model="verification.token"
              :rules="[v => !!v || 'Verification code is required']"
            >
            </v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          depressed
          dark
          color="blue darken-4"
          @click="resendVerificationCode"
          :loading="loading_resend_verification"
        >
          <v-icon left>mdi-send-check</v-icon>
          RESEND CODE
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="teal darken-3"
          dark
          @click="submitVerification()"
          :loading="loading_send_verification"
        >
          <v-icon left>mdi-send-check</v-icon>
          SEND
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
    verification: {
      token: '00000',
      via: 'email'
    },  
    loading_resend_verification: false,
    loading_send_verification: false
  }),
  methods: {
    async submitVerification () {
      if (this.$refs.verificationform.validate()) {
        try {
          this.loading_send_verification = true
          const payload = this.verification
          const response = await window.axios.post('/auth/verification/verify', payload)
          if (response.data.http_status === 200) {
            this.snackbar_color = 'green darken-2'
            this.snackbar_text = 'Sending a verification code is successful!'
            this.snackbar = true
            setTimeout(() => {
              this.$store.commit('auth/setIsLoggedIn', true)
              this.$store.commit('auth/setUser', response.data.data)
              this.$router.push('/success')
            }, 2000)
          }
        } catch (error) {
            this.snackbar_color = 'red darken-2'
            this.snackbar_text = 'Something went wrong in Sending a verification code!'
            this.snackbar = true
        } finally {
          this.loading_send_verification = false
        }
      }
    },
    async resendVerificationCode () {
      try {
        this.loading_resend_verification = true
        const payload = {
          via: this.verification.via
        }
        const response = await window.axios.post('/auth/verification/resend', payload)
        if (response.data.http_status === 200) {
          this.snackbar_color = 'green darken-2'
          this.snackbar_text = 'Resending a verification code is successful!'
          this.snackbar = true
        }
      } catch (error) {
        this.snackbar_color = 'red darken-2'
        this.snackbar_text = 'Something went wrong in Resending a verification code!'
        this.snackbar = true
      } finally {
        this.loading_resend_verification = false
      }
    }
  }
}
</script>
