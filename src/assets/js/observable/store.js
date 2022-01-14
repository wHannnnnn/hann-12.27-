export default class Store {
    constructor({state, mutations, actions}){
        this.state = Vue.observable(state || {});
        this.mutations = mutations;
        this.actions = actions;
    }
    commit(fnName, params){
        this.mutations[fnName](this.state, params)
    }
    dispatch(fnName, params){
        this.actions[fnName](this, params)
    }
}