const types = {
	state: {
		direction: 'forward',
		isLoading: false,
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

export default types