const route = {
  state: {
    listFields: {},
    addFormFields: {},
    editFormFields: {},
    detailFields: {}
  },
  mutations: {
    SET_ListFields: (state: any, { key, fields }: any) => {
      state.listFields[key] = fields
    },
    SET_AddFormFields: (state: any, { key, fields }: any) => {
      state.addFormFields[key] = fields
    },
    SET_EditFormFields: (state: any, { key, fields }: any) => {
      state.editFormFields[key] = fields
    },
    SET_DetailFields: (state: any, { key, fields }: any) => {
      state.detailFields[key] = fields
    }
  },
  actions: {
    setListFields({ commit }: any, { key, fields }: any) {
      commit('SET_ListFields', { key, fields })
    },
    setAddFormFields({ commit }: any, { key, fields }: any) {
      commit('SET_AddFormFields', { key, fields })
    },
    setEditFormFields({ commit }: any, { key, fields }: any) {
      commit('SET_EditFormFields', { key, fields })
    },
    setDetailFields({ commit }: any, { key, fields }: any) {
      commit('SET_DetailFields', { key, fields })
    }
  }
}

export default route
