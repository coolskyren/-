import {
  getMenuList,
  getroleList,
  getuserList,
  getspecsList,
  getcateList,
  getgoodsList,
  getbannerList,
  getseckList,
} from '@/util/axios'

export default {
  getActionMenuList({
    commit
  }) {
    getMenuList({
      istree: 1
    })
      .then(res => {
        if (res.data.code == 200) {
          commit('reqMenuList', res.data.list)
        }
      })
  },
  getActionRoleList({
    commit
  }) {
    getroleList()
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          commit('reqRoleList', res.data.list)
        }
      })
  },
  getActionUserList({
    commit
  }, pageInfo) {
    getuserList(pageInfo)
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          let list = [];
          list = res.data.list == null ? [] : res.data.list
          commit('reqUserList', res.data.list)
        }
      })
  },
  getActionSpecsList({
    commit
  }, pageInfo) {
    getspecsList(pageInfo)
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          let list = [];
          list = res.data.list == null ? [] : res.data.list
          commit('reqSpecsList', res.data.list)
        }
      })
  },
  getActionGoodsList({
    commit
  }, pageInfo) {
    getgoodsList(pageInfo)
      .then(res => {
        if (res.data.code == 200) {
          
          commit('reqGoodsList', res.data.list)
        }
      })
  },
  getActionCateList({
    commit
  }) {
    getcateList({istree:1})
      .then(res => {
        if (res.data.code == 200) {
          commit('reqCateList', res.data.list)
        }
      })
  },
  getActionBannerList({
    commit
  }) {
    getbannerList({istree:1})
      .then(res => {
        if (res.data.code == 200) {
          commit('reqBannerList', res.data.list)
        }
      })
  },
  getActionSeckList({
    commit
  }) {
    getseckList({istree:1})
      .then(res => {
        if (res.data.code == 200) {
          commit('reqSeckList', res.data.list)
        }
      })
  },
  getActionMemberList({
    commit
  }) {
    getmemberList({istree:1})
      .then(res => {
        if (res.data.code == 200) {
          commit('reqMemberList', res.data.list)
        }
      })
  },
}
