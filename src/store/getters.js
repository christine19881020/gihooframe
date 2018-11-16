const getters = {
  direction: state => state.types.direction,
  isLoading: state => state.types.isLoading,
  accounts: state => state.user.accounts
}
export default getters
