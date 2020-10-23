import store from './store/index'

export const gate = () => {
  if (!(store.getters['auth/isLoggedIn'])) {
    return '/login'
  } else {
    return '/success'
  }
}

export const onlyGuest = (to, from, next) => {
  if (!(store.getters['auth/isLoggedIn'])) {
    next()
  } else {
    next(false)
  }
}

export const onlyAuthorize = (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next()
  } else {
    next(false)
  }
}
