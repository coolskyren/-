export default {
    reqMenuList(state,payload){
        state.menuList = payload
    },
    reqRoleList(state,payload){
        state.roleList = payload
    },
    reqUserList(state,payload){
        state.userList = payload
    },
    reqSpecsList(state,payload){
        state.specsList = payload
    }
    ,
    reqGoodsList(state,payload){
        state.goodsList = payload
    },
    reqCateList(state,payload){
        state.cateList = payload
    }
}