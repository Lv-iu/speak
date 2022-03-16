(()=>{
	let isRepeat = false;
	//函数入口
	const init = ()=>{
		initEvent()
	}
	//绑定事件
	const initEvent = ()=>{
		userName.addEventListener('change',onUserNameBlur)
		 formContainer.addEventListener('submit', onFormSubmit)
	}
	const onUserNameBlur = async ()=>{
		const loginId = userName.value.trim();
		const res = await fethcFn({
			url:'/user/exists',
			method:'GET',
			 params: { loginId }
		}) 
		if(res){
			window.alert('账号已存在，请重新输入')
			isRepeat = true;
			return;
		}
		isRepeat =false;
		// const response = await fetch(`https://study.duyiedu.com/api/user/exists?loginId=${loginId}`)
		// const result = await response.json();
		// if(result.data){
		// 	window.alert('账号已存在,亲更改账号名')
		// 	isRepeat = true;
		// 	return; 
		// }
		// isRepeat = false;
	}
	const onFormSubmit = async (e)=>{
		//阻止默认事件
		e.preventDefault();
		//获取表单信息
		const loginId = userName.value.trim();
		const nickname = userNickname.value.trim();
		const loginPwd = userPassword.value.trim();
		const confirmPwd = userConfirmPassword.value.trim()
		//验证表单信息是否符合。
		if(!checkForm(loginId,nickname,loginPwd,confirmPwd)) return;
		//请求数据
		const res = await fethcFn({
			url:'/user/reg',
			method:'POST',
			 params: { loginId,nickname,loginPwd }
		}) 
		res && window.location.replace('./index.html')
		// const response = await fetch(`https://study.duyiedu.com/api/user/reg`,{
		// 	method:'POST',
		// 	headers:{
		// 		'Content-Type':'application/json'
		// 	},
		// 	body:JSON.stringify({
		// 		loginId,
		// 		nickname,
		// 		loginPwd
		// 	})
		// })
		// const result = await response.json();
		// result.data && window.location.replace('./index.html')
	}
	function checkForm(loginId,nickname,loginPwd,confirmPwd){
		switch(true){
			case !loginId:
			window.alert('注册的账号不能为空')
			return;
			case !nickname:
			window.alert('注册的昵称不能为空')
			return;
			case !loginPwd:
			window.alert('注册的密码不能为空')
			return;
			case !confirmPwd:
			window.alert('确认的密码不能为空')
			return;
			case isRepeat:
			window.alert('账号已存在，请重新输入')
			return;
			case loginPwd !== confirmPwd:
			window.alert('两次输入的密码不一致')
			return;
			default:
			return true;
		}
	}
	init()
})()