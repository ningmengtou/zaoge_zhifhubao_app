import CryptoJS from './crypto-js.min.js'

export function request(url, data) {
  let urlBase = 'https://www.zaoge.com'
  return new Promise((resolve, reject) => {
    let dataTypeStr = ''
    if (url == '/sbc.esp?qmx_detail' || url == "/sbc/get_tm_qmx_notice_list") {
      dataTypeStr = 'text'
    } else {
      dataTypeStr = 'json'
    }
    uni.request({
      url: urlBase + url,
      data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      dataType: dataTypeStr,
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  }).catch((e) => {})
}

export function yuzhuaRes(url, data) {
  let urlBase = 'https://yx.yuzhua.com/eapi.esp?'
  return new Promise((resolve, reject) => {
    uni.request({
      url: urlBase + url,
      data,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    });
  }).catch((e) => {})
}

export  function requestZhiqi(url, data, method = "POST") {
	let baseUrl = 'https://m.yuzhua.com/r/api/mark/'
	return new Promise((resolve, reject) => {
	  uni.request({
	    url: baseUrl + url,
	    method,
	    data,
	    header: {
	      'Content-Type': 'application/json'
	    },
	    success: res => {		
			console.log(res.data.data.data)
			let result = decrypt(res.data.data.data)

	      resolve(JSON.parse(result))
	    },
	    fail: err => {
	      reject(err)
	    }
	  })
	})
}

export const requestYuzhua = function(url, data, method = "POST") {
	let baseUrl = 'https://yx.yuzhua.com'
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data,
			header: {
				'Content-Type': 'application/json'
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	}).catch((e) => {});
}

// 解密
function decrypt (content) {
  const key = CryptoJS.enc.Latin1.parse('g@$ocmmiP3t5rg#k')
  const iv = CryptoJS.enc.Latin1.parse('1234567812345678')
  const bytes = CryptoJS.AES.decrypt(content.toString(), key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptResult = CryptoJS.enc.Utf8.stringify(bytes).toString()
  return decryptResult
}

