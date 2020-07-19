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