const enums = {
	state: {
		list: [],
		page: {
			url: "",
			filters: {},
			pageindex: 1,
			pageSize: 10
		}
	},
	mutations: {
		UPDATE_DIRECTION: (state, direction) => {
			state.direction = direction
		},
		UPDATE_LOADING(state, status) {
			state.isLoading = status
		}
	},
	actions: {
		updateDirection({ commit }, direction) {
			commit('UPDATE_DIRECTION', direction)
		},
		updateLoadingStatus({ commit }, isLoading) {
			commit('UPDATE_LOADING', isLoading)
		}
	}
}

export default enums