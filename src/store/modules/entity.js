import {
  getListFields,
  getAddFormFields,
  getEditFormFields,
  getDetailFields,
} from '@/api/entity'

const route = {
  state: {
    listFields: {},
    addFormFields: {},
    editFormFields: {},
    detailFields: {},
  },
  mutations: {
    SET_ListFields: (state, { key, fields }) => {
      state.listFields[key] = fields
    },
    SET_AddFormFields: (state, { key, fields }) => {
      state.addFormFields[key] = fields
    },
    SET_EditFormFields: (state, { key, fields }) => {
      state.editFormFields[key] = fields
    },
    SET_DetailFields: (state, { key, fields }) => {
      state.detailFields[key] = fields
    },
  },
  actions: {
    async getListFields({ commit, state }, path) {
      let key = path + '-list'
      let fields = state.listFields[key]
      if (!fields) {
        let res = await getListFields(path)
        fields = res.data.data
        commit('SET_ListFields', { key, fields })
      }
      return fields
    },
    async getAddFormFields({ commit, state }, path) {
      let key = path + '-addForm'
      let fields = state.addFormFields[key]
      if (!fields) {
        let res = await getAddFormFields(path)
        fields = res.data.data
        commit('SET_AddFormFields', { key, fields })
      }
      return fields
    },
    async getEditFormFields({ commit, state }, path) {
      let key = path + '-editForm'
      let fields = state.editFormFields[key]
      if (!fields) {
        let res = await getEditFormFields(path)
        fields = res.data.data
        commit('SET_EditFormFields', { key, fields })
      }
      return fields
    },
    async getDetailFields({ commit, state }, path) {
      let key = path + '-detail'
      let fields = state.detailFields[key]
      if (!fields) {
        let res = await getDetailFields(path)
        fields = res.data.data
        commit('SET_DetailFields', { key, fields })
      }
      return fields
    },
  },
}

export default route
