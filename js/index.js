(()=>{
	let page = 0;
	let size = 10;
	let chatTotal = 0;
	let sendType = 'enter';
	//定义函数入口函数
	const init = ()=>{
		initEvents();
		//初始化界面
		getDatas()
		//渲染后端储存的聊天记录
		// setDatas()
		intiChatList('button')
	}
	//注册监听事件
	const initEvents = ()=>{
		doms.sendBtn.addEventListener('click',setDatas)
		doms.contentBody.addEventListener('scroll',onContentBodyScroll);
		doms.arrowContainer.addEventListener('click',onOpendEnter);
		doms.selectItem.forEach(function(node){node.addEventListener('click',onChangeEnter)});
		doms.inputContent.addEventListener('keyup',onInputKey)
		doms.close.addEventListener('click',onClose)
  	}
	//定义关闭函数
	function onClose (){
		 sessionStorage.removeItem('token')
		window.location.replace('./login.html')
	}
	//定义按下键盘函数
	function onInputKey(e){
		if(e.keyCode === 13 && e.ctrlKey && sendType === 'ctrlEnter' || e.keyCode === 13 && e.ctrlKey === false && sendType === 'enter')setDatas();
	}
	//定义切换发送消息的键
	function onChangeEnter(){
		doms.selectItem.forEach(node=>node.classList.remove('on'))
		this.classList.add('on')
		doms.arrowContainer.nextElementSibling.style.display = 'none'
		//赋值
		 sendType = this.getAttribute('type')
		 console.log(sendType)
		
	}
	//定义滚动事件的监听函数
	const onContentBodyScroll = ()=>{
		const height = doms.contentBody.scrollTop
		if(height <= 0 ){
			if(chatTotal <= (page + 1)*size) return
			page++;
			intiChatList('top')
		}
		
	}
	 function onOpendEnter(){
		this.nextElementSibling.style.display = 'block'
	}
	//获取doms事件
	const doms = {
		nickName:document.querySelector('.nick-name'),
		accountName:document.querySelector('.account-name'),
		logintime:document.querySelector('.login-time'),
		sendBtn:document.querySelector('.send-btn'),
		inputContent:document.querySelector('.input-container'),
		contentBody:document.querySelector('.content-body'),
		arrowContainer:document.querySelector('.arrow-container'),
		selectItem:document.querySelectorAll('.select-item'),
		active:document.querySelector('.on'),
		close:document.querySelector('.close')
	}
	//定义初始化界面函数
	const getDatas = async ()=>{
		const res = await fethcFn({
			url:'/user/profile',
		})
		
		doms.nickName.innerHTML = res.nickname;
		doms.accountName.innerHTML = res.loginId;
		doms.logintime.innerHTML = formaDate(res.lastLoginTime);
	}
	const intiChatList = async (duartion)=>{
		const res = await fethcFn({
			url:'/chat/history',
			params:{
				page,
				size
			}
		})
		chatTotal = res.chatTotal;
		setContent(res.data,duartion)
	}
	//定义渲染函数
	const setContent = (list,duartion)=>{
		list.reverse()
		//获取到后端提供的历史记录后，将数据渲染到界面中
		const content_body = list.map(node =>{
			return node.from === 'robot' 
			? `<div class="chat-container robot-container">
		                <img src="./img/robot.jpg" alt="">
		                <div class="chat-txt">
		                   ${node.content}
		                </div>
		        </div>`
			: ` <div class="chat-container avatar-container">
		                <img src="./img/avtar.png" alt="">
		                <div class="chat-txt">${node.content}</div>
		        </div>`;
		}).join('')
		if(duartion === 'button'){
			doms.contentBody.innerHTML += content_body;
			//设置滚动条为最低端
			const lastContent = document.querySelectorAll('.chat-container');
			const height = lastContent[lastContent.length - 1].offsetTop
			doms.contentBody.scrollTo(0,height)
		}if(duartion === 'top'){
			doms.contentBody.innerHTML = content_body + doms.contentBody.innerHTML;
			doms.contentBody.scrollTo(0,0)
		}
		
	}
	//定义渲染界面的函数
	const setDatas = async ()=>{
		console.log(doms.inputContent.value)
		if(!doms.inputContent.value){
			window.alert('发送的消息为空！')
			return;
		}
		setContent([{from:'avatar',content:`${doms.inputContent.value}`}],'button')
		const content =doms.inputContent.value;
		doms.inputContent.value = '';
	//发送数据给后端
	console.log('333')
		const res = await fethcFn({
			url: '/chat',
			method: 'POST',
			params: {content}
		})
		
		setContent([{from:'robot',content:res.content}],'button')
		console.log('333')
	}
	init();
})()