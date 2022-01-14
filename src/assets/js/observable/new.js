export const store = Vue.observable({
    name: '张'
  })
  export const mutations = {
    SET_NAME (data) {
      store.name = data
    }
  }