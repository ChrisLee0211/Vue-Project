import axios from 'axios';
import { SUCC_CODE, TIMEOUT } from './config'

const CancelToken = axios.CancelToken;
let cancel;
// 获取内容数据

export const getCategoryContent = (id) => {
    cancel && cancel('取消了前一次的请求!')
    cancel = null;
    return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
        timeout: TIMEOUT,
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    }).then(res => {
        if (res.data.code === SUCC_CODE) {
            console.log('获取成功');
            return res.data.content;
        }
        throw new Error('获取时局失败')
    }).catch(err => {
        if (axios.isCancel(err)) { //取消前一次的请求
            console.log(err)
        } else {
            console.log(err)
        }
    })
}