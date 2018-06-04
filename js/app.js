mui('.chat_header').on('tap','.chat_header_right',function(){
	var url = this.getAttribute('url');
	if(url){
		mui.openWindow({
			id: url,
			url: url,
			styles: {
				popGesture: "none"
			},
			show: {
				aniShow: 'none'
			},
			waiting: {
				autoShow: false
			}
		});
	}
});

mui('.chat_header').on('tap','.chat_header_left',function(){
	mui.back();
});
