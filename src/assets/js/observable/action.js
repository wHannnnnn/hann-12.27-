const actions = {
    addAsync(store, num){ 
        setTimeout(() => {
            store.commit('add', num)
        }, 1000)
    }
}
export default actions
