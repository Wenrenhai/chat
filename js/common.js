(function(w){
	var openw=null,waiting=null,as='none',ws=null;
	as='fade-in';
	function plusReady(){
		ws=plus.webview.currentWebview();
		plus.key.addEventListener('backbutton',function(){
			back();
		},false);
	}
	if(w.plus){
		plusReady();
	}else{
		document.addEventListener('plusready',plusReady,false);
	}
	/**
	 * 点击跳转新窗口
	 * @param  {[type]} id url
	 * @param  {[type]} wa 是否显示等待
	 * @param  {[type]} ns 是否自动显示
	 * @param  {[type]} ws 视图数据
	 * @return {[type]}    当前视图
	 */
	w.clicked=function(id,script_str,wa,ns,ws){
		
		if(openw){
			return null;
			
		}
		
		if(w.plus){
			wa&&(waiting=plus.nativeUI.showWaiting());
			ws=ws||{};
			
			ws.scrollIndicator||(ws.scrollIndicator='none');
			ws.scalable||(ws.scalable=false);
		    var pre='';//'http://140.143.3.30';
			openw=plus.webview.create(pre+id,id,ws);
			script_str&&openw.evalJS(script_str);
			ns||openw.addEventListener('loaded',function(){
				openw.show(as);
				closeWaiting();
			},false);
			openw.addEventListener('close',function(){//页面关闭后可再次打开
				openw=null;
			},false);
			return openw;
		}else{
			w.open(id);
			
		}
		return null;
	}

	/**
	 * 关闭等待动画
	 * @return {[type]} [description]
	 */
	w.closeWaiting=function(){
		waiting&&waiting.close();
		waiting=null;
	}

	/**
	 * 跳转上一个
	 * @param  {[type]} hide [description]
	 * @return {[type]}      [description]
	 */
	w.back=function(fun,hide){
	if(w.plus){
		ws||(ws=plus.webview.currentWebview( ));
		if(hide||ws.preate){
			ws.hide('auto');
		}else{
			ws.close('auto');
		}
	}else if(history.length>1){
		history.back();
	}else{
		w.close();
	}
	if(fun){
		fun();	
	}
	
};

})(window);
