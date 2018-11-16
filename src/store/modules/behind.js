const behind = {
	state: {
		title:'',
		path:''
	},
	mutations: {
		BEHIND_UPDATE_TITLE: (state,title) => {
			state.title=title;
		},
		BEHIND_UPDATE_PATH: (state,path) => {
			state.path=path;
		}		
	},
	actions: {
		behindUpdateTitle({ commit },title) {
			commit('BEHIND_UPDATE_TITLE',title);
			console.log('22',title)
		},
		behindUpdatePath({ commit },path) {
			commit('BEHIND_UPDATE_PATH',path);
			console.log('33',path )
		}
	}
}

export default behind