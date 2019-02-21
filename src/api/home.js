import axios from 'axios'
import jsonp from 'assets/js/jsonp'
import {SUCC_CODE} from './config'
import {TIMEOUT,HOME_RECOMMEND_PAGE_SIZE,jsonpOptions} from './config'

// 获取幻灯片数据--ajax
export const getHomeSlider = () => {
    return axios.get('http://www.imooc.com/api/home/slider',{timeout:TIMEOUT}).then(res => {
        
        if(res.data.code === SUCC_CODE){
            return res.data.slider;
        }

        throw new Error('没有成功获取到数据！')
    }).catch(err => {
        if(err) {
            console.log(err)
        }

        return [
            {
                linkUrl: 'https://www.imooc.com',
                picUrl: require('assets/img/404.png')
            }
        ]
    })
    // 以下异步用于测试loading组件
    // .then(data => {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(data)
    //         }, 1000);
    //     })
    // })
}

export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
    const url = "https://ju.taobao.com/json/tg/ajaxGetItemsV2.json"
    const params = {page,psize,type:0,frontCatId:''}
    return jsonp(url,params,jsonpOptions).then(res => {
        if(res.code === '200') {
            return res
        }

        throw new Error('没有成功获取到数据！')
    }).catch(err => {
        if(err) {
            console.log(err)
        }
    })
    //以下异步用于测试loading组件
    .then(data => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data)
            }, 1000);
        })
    })
}