import jsonp from 'jsonp'
import {jsonpOptions} from './config'

// 获取轮播图
export const getProductDetail = (id) => {

    let data = `%7B"itemNumId"%3A"${id}"%7D`
    let options = jsonpOptions;
    let url = "https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?api=mtop.taobao.detail.getdetail&ttid=2017%40taobao_h5_6.6.0&data="+data+"&appKey=12574478&dataType=jsonp&type=jsonp&v=6.0&callback=__jp1"
    return new Promise((resolve,reject) => {
        jsonp(url, options,(err,data) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}