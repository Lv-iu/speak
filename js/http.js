//封装地址
const  BASE_URL = 'https://study.duyiedu.com/api';

const fethcFn = async ({url,method='GET',params = {}})=>{
	let result = null;
	//创建一个空对象，用于请求头的Authorization值写入
	const extendsObj = {}
	sessionStorage.token && (extendsObj.Authorization = 'Bearer' + ' ' + sessionStorage.token);
	if( method === 'GET' && params.length !== 0){
		url += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
		// url += '?' + Object.keys(params).map(key => ''.concat(key, '=', params[key])).join('&')
	}
	try{
		const res = await fetch(BASE_URL+url,{
			method,
			headers:{ 
				'Content-Type': 'application/json',
				...extendsObj
			},
			body: method === 'GET' ? null : JSON.stringify(params)
		})
		result = await res.json();
		console.log(result)
		const token = res.headers.get('Authorization');
		token && sessionStorage.setItem('token',token)
		if(result.code === 0){
			console.log('通过了')
			// return (result.hasOwnProperty('chatTotal') 
			// ? { chatTotal: result.chatTotal, data: result.data } 
			// : result.data);
			/* 如果后端返回值里面有chatTotal，我们就把这个chatTotal也返回给前台 */
		if (result.hasOwnProperty('chatTotal')) {
		  result.data = { chatTotal: result.chatTotal, data: result.data }
		}
		return result.data
		}else{
			window.alert(result.msg)
		}
	}catch(e){
		console.log(e)
	}
	
}