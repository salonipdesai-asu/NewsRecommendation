$(document).ready(function(){
	var tabUrl1;
	var userAction;
	var userInfo1;
	$('#postCheck').hide();
	
	
	$('#recommended').click(function(){
		window.open('Recom.html', '_blank');
	});
	
	chrome.identity.getProfileUserInfo(function(userInfo){
		userInfo1=userInfo;
		chrome.tabs.getSelected(null, function(tab) {
			sendRequestLike(tab.url);
		});
		function sendRequestLike(tabUrl){
			tabUrl1=tabUrl;
			$.ajax({
				url : 'http://localhost:5001',
				type: 'post',
				data: JSON.stringify({'url' : tabUrl, 'email': userInfo.email}),
				dataType : 'json',
				contentType : 'application/json',
				success : function(response){
					console.log(response.rating);
					if (response.rating=='-10')
						$('#dislikeImg').attr("src","liked.png");
					else if (response.rating=='10')
						$('#likeImg').attr("src","liked.png");
				},
				error : function(e){
					console.log(e);
				}
			});
		}
	});
	
	$('#like').click(function(){
		userActionNew(10);
		$('#likeImg').attr("src","liked.png");
		$('#dislikeImg').attr("src","like.png");
	});
	
	$('#dislike').click(function(){
		userActionNew(0);
		$('#likeImg').attr("src","like.png");
		$('#dislikeImg').attr("src","liked.png");
	});
	
	function userActionNew(userAction){
		$.ajax({
			url : 'http://localhost:5002',
			type: 'post',
			data: JSON.stringify({'url' : tabUrl1, 'email': userInfo1.email, 'rating' : userAction}),
			dataType : 'json',
			contentType : 'application/json',
			success : function(response){
				if (response.rating != userActionNew)
					console.log("error: changes not made");
			},
			error : function(e){
				console.log(e);
			}
		});
	}
	
	$('#button').click(function(){
		chrome.tabs.getSelected(null, function(tab) {
			sendRequest(tab.url);
		});
		function sendRequest(tabUrl) {
			$.ajax({
				url : 'http://localhost:5000',
				type: 'post',
				data : JSON.stringify({'url' : tabUrl}),
				dataType: 'json',
				contentType: 'application/json',
				success : function(response){
					$('#outputRIBar').html("<h5 class='w3-text-black'>"+response.RI+"%</h5>").attr("style","width:"+response.RI+"%");
					
					if ((response.PI) > 0)
					{	
						PI_percent = (response.PI)*100;
						PI_percent = PI_percent.toPrecision(3);
						$('#outputPIBar').html("<h5 class='w3-text-black'>Positive..."+PI_percent+"%</h5>").attr("style","width:"+PI_percent+"%");
						$('#outputPIBar').attr("class","w3-green w3-opacity");
					}
					else if ((response.PI) < 0)
					{	
						PI_percent = (response.PI)*(-100);
						PI_percent = PI_percent.toPrecision(3);
						$('#outputPIBar').html("<h5 class='w3-text-black'>Negative..."+PI_percent+"%</h5>").attr("style","width:"+PI_percent+"%");
						$('#outputPIBar').attr("class","w3-red w3-opacity");
					}
					else if ((response.PI) == 0)
						$('#outputPIBar').html("<h5 class='w3-text-black'>Neutral</h5>");
					
					SI_percent = response.SI*100;
					SI_percent = SI_percent.toPrecision(3);
					$('#outputSIBar').html("<h5 class='w3-text-black'>"+SI_percent+"%</h5>").attr("style","width:"+SI_percent+"%");
					
					$('#postCheck').show();
					$('#button').hide();
					$('#link1').hide().attr("href",tabUrl);
				},
				error : function(e){
					console.log(e);
				}
			});
		}
	});
});

