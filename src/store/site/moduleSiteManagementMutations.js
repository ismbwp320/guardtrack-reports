

export default {
  SET_SITES (state, sites) {
    state.sites = sites
  },
  ADD_SITE (state, site) {
    state.sites.push(site)
  },
  REMOVE_RECORD (state, siteId) {
    const siteIndex = state.sites.findIndex((u) => u.id === siteId)
    state.sites.splice(siteIndex, 1)
  }
}
  