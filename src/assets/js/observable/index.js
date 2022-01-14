import Store from "./store"
import state from "./state"
import mutations from "./mutation"
import actions from "./action"
const store = new Store({
    state,
    mutations,
    actions
})
export default store