$(document).ready(function(){
	chrome.identity.getProfileUserInfo(function(userInfo){
		$('#email').html(userInfo.email);
		sendRecomm(userInfo);
		function sendRecomm(userInfo){
			$.ajax({
				url : 'http://localhost:5003',
				type: 'post',
				data: JSON.stringify({'email': userInfo.email}),
				dataType : 'json',
				contentType : 'application/json',
				success : function(response){
						
						$('#r1').attr("href",response.url1);
						$('#img1').attr("src",response.img1);
						$('#title1').html(response.title1);
						$('#source1').html(response.source1);
						$('#summary1').html(response.summary1);
						
						$('#r2').attr("href",response.url2);
						$('#img2').attr("src",response.img2);
						$('#title2').html(response.title2);
						$('#source2').html(response.source2);
						$('#summary2').html(response.summary2);
						
						$('#r3').attr("href",response.url3);
						$('#img3').attr("src",response.img3);
						$('#title3').html(response.title3);
						$('#source3').html(response.source3);
						$('#summary3').html(response.summary3);
						
						$('#r4').attr("href",response.url4);
						$('#img4').attr("src",response.img4);
						$('#title4').html(response.title4);
						$('#source4').html(response.source4);
						$('#summary4').html(response.summary4);
						
						$('#r5').attr("href",response.url5);
						$('#img5').attr("src",response.img5);
						$('#title5').html(response.title5);
						$('#source5').html(response.source5);
						$('#summary5').html(response.summary5);
				},
				error : function(e){
					console.log(e);
					$('#Loading').hide();
				}
			});
		}
	});
});