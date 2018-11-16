const route = {
	state: {
		count: 1
	},
	mutations: {
				increment(state) {
					// 变更状态
					state.count++
				}
//				increment(state, n) {
//					state.count += n
//				}
//		increment(state, payload) {
//			state.count += payload.amount
//		}
	},
	actions: {
		//		increment(context) {
		//			context.commit('increment')
		//		}
		increment({commit}) {
			commit('increment')
		}
	}
}
export default route