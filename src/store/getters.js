const getters = {
  direction: state => state.types.direction,
  isLoading: state => state.types.isLoading,
  accounts: state => state.user.accounts,
  show: state => state.loginvuex.show,
}
export default getters
