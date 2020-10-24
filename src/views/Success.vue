<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="elevation-0 teal darken-3">
        <v-toolbar-title><v-icon left>mdi-home</v-icon>Home Page</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex justify-center py-10">
        <div>
          <v-img src="@/assets/appetiser-logo.png" width="300"></v-img>
        </div>
      </div>
      <v-card-text class="pa-10">
        <v-card-title>
          <div v-if="login">
            Hi {{user.full_name}}, You are now in Home Page.
          </div>
          <div v-else>
            Please wait a moment and you will be out...
          </div>
        </v-card-title>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-3" dark :loading="loading" @click="doLogout"><v-icon left>mdi-login</v-icon>LOGOUT</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    loading: false,
    login: true
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
  methods: {
    doLogout () {
      try {
        this.loading = true
        this.login = false
        setTimeout(() => {
          this.$store.commit('auth/setIsLoggedIn', false)
          this.$cookies.remove('user_session')
          localStorage.removeItem('vuex')
          localStorage.removeItem('redirect')
          this.$router.push('/login')
        }, 3000)
      } catch (error) {
        console.log(error)
      } finally {
        this.logout = false
      }
    }
  }
}
</script>
