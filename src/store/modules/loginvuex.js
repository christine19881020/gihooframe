const loginvuex = {
	state: {
		show:false,
	},
	mutations: {
		loginclose:(state,value)=> {
			// 变更状态
			state.show=value;
		}
	},
	actions: {
		logincloseFn({commit},value){
			commit('loginclose',value);
			console.log('loginclose')
		}
	}
}
export default loginvuex;