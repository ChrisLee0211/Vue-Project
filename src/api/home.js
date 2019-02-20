import axios from 'axios'
import {SUCC_CODE} from './config'
import {TIMEOUT} from './config'

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