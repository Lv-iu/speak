(()=>{
	//定义入口函数
	const init =()=>{
		initEvent();
	}
	const initEvent = ()=>{
		//对事件的绑定
		formContainer.addEventListener('submit',onFormSubmitClick)
	}
	//创建函数
	const onFormSubmitClick = (e) =>{
		//组织默认事件
		e.preventDefault()
		//获取用户名和密码
		const loginId = userName.value.trim();
		const loginPwd = userPassword.value.trim();
		//判断用户输入是否正确
		if(loginId === ''){
			window.alert('请输入账号');
		}
		if(loginPwd === ''){
			window.alert('请输人密码');
		}
		senData(loginId,loginPwd)
	}
	//发送数据
	const senData =  async(loginId,loginPwd)=>{
	// 	//获取数据
		const res = await fethcFn({
			url:'/user/login',
			method:'POST',
			 params: { loginId,loginPwd }
		})
		// const res = await fetch('https://study.duyiedu.com/api/user/login',{
		// 	method:'POST',
		// 	headers:{
		// 		'Content-Type':'application/json'
		// 	},
		// 	body:JSON.stringify({
		// 		loginId,
		// 		loginPwd
		// 	})
		// })
		// const result = await res.json();
		// // 判断用户输入信息是否正确
		// if(result.code === 400){
		// 	console.log(result)
		// 	window.alert(result.msg)
		// 	return;
		// }
		console.log('323')
		// result.data && window.location.replace('./index.html')
		res && window.location.replace('./index.html')
	}
	init();
})()