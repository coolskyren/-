import http from './axios'
export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })   
}
export function getMenuAdd(data){
    return http.post('/api/menuadd',data)   
}
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })   
}
export function getMenuEdit(data){
    return http.post('/api/menuedit',data)   
}
export function getMenuDelete(data){
    return http.post('/api/menudelete',data)   
}
export function getroleList(){
    return http.get('/api/rolelist')   
}
export function getroleAdd(data){
    return http.post('/api/roleadd',data)   
}
export function getroleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })   
}
export function getroleEdit(data){
    return http.post('/api/roleedit',data)   
}
export function getroleDelete(data){
    return http.post('/api/roledelete',data)   
}
//============================管理员接口============================
export function getuserList(params){
    return http.get('/api/userlist',{
        params
    })
}
export function getuserAdd(data){
    return http.post('/api/useradd',data)   
}
export function getuserInfo(params){
    return http.get('/api/userinfo',{
        params
    })   
}
export function getuserEdit(data){
    return http.post('/api/useredit',data)   
}
export function getuserDelete(data){
    return http.post('/api/userdelete',data)   
}
export function getuserCount(params){
    return http.get('/api/usercount',{
        params
    })   
}
//=========================管理员登陆login==================
export function getuserlogin(data){
    return http.post('/api/userlogin',data)   
}
//=======================商品管理==================
export function getcateList(params){
    return http.get('/api/catelist',{
        params
    })   
}
export function getcateAdd(data){
    return http.post('/api/cateadd',data)   
}
export function getcateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })   
}
export function getcateEdit(data){
    return http.post('/api/cateedit',data)   
}
export function getcateDelete(data){
    return http.post('/api/catedelete',data)   
}





//============================商品规格==========================
export function getspecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
export function getspecsAdd(data){
    return http.post('/api/specsadd',data)   
}
export function getspecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })   
}
export function getspecsEdit(data){
    return http.post('/api/specsedit',data)   
}
export function getspecsDelete(data){
    return http.post('/api/specsdelete',data)   
}
export function getspecsCount(params){
    return http.get('/api/specscount',{
        params
    })   
}

//=========================商品管理================================
export function getgoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
export function getgoodsAdd(data){
    return http.post('/api/goodsadd',data)   
}
export function getgoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })   
}
export function getgoodsEdit(data){
    return http.post('/api/goodsedit',data)   
}
export function getgoodsDelete(data){
    return http.post('/api/goodsdelete',data)   
}
export function getgoodsCount(params){
    return http.get('/api/goodscount',{
        params
    })   
}

//=================================会员管理=======================
export function getmemberList(params){
    return http.get('/api/memberlist',{
        params
    })   
}

export function getmemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })   
}
export function getmemberEdit(data){
    return http.post('/api/memberedit',data)   
}


//============================轮播图管理===================================
export function getbannerList(){
    return http.get('/api/bannerlist')   
}
export function getbannerAdd(data){
    return http.post('/api/banneradd',data)   
}
export function getbannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })   
}
export function getbannerEdit(data){
    return http.post('/api/banneredit',data)   
}
export function getbannerDelete(data){
    return http.post('/api/bannerdelete',data)   
}
//======================限时秒杀===========================
export function getseckList(){
    return http.get('/api/secklist')   
}
export function getseckAdd(data){
    return http.post('/api/seckadd',data)   
}
export function getseckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })   
}
export function getseckEdit(data){
    return http.post('/api/seckedit',data)   
}
export function getseckDelete(data){
    return http.post('/api/seckdelete',data)   
}