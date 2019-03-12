import jsonp from 'jsonp';

const transformData = data => {
  let arr = [];

  // for(const key in data){
  //     let str = key + "=" +data[key]
  //     arr.push(str)
  // }
  // return arr.join('&')
  for (const key in data) {
    arr.push([key, data[key]]);
  }
  return arr.map(value => value.join('=')).join('&');
};

export default (url, data, options) => {
  // 自己先做好url和data数据的拼接
  url += (url.indexOf('?') < 0 ? '?' : '&') + transformData(data);
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
