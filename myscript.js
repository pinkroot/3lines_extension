isLogin = null;

req = new XMLHttpRequest();

$(function(){

	req.open("GET", "http://3lines.info/api/islogin", true);

	req.onreadystatechange = function(){

		var isLoginJson = req.responseText;
		
		var isLoginJsonParse = JSON.parse(isLoginJson);
		
		isLogin = isLoginJsonParse.isLogin;

		if (req.readyState == 4){

			isLogin = isLoginJsonParse.isLogin;
			req.onload = judgeLogin();
		}
		
	
	};

	req.send(null);
	

	$("#submit_button").click(function(){
		console.log("submit button was clicked");

		var data = {page_url: $('#page_url').val(), row1 : $('#row1').val(), row2 : $('#row2').val(), row3 : $('#row3').val()};
 		
 		if ((data['row1'].length == 0) || (data['row2'].length == 0) || (data['row3'].length == 0)){
 			var showText = "<div id='draw_error'><p>入力漏れがあります</p></div>";
 			$('#draw_error').replaceWith(showText);
	
 		}
 		else {
			console.log("submit");

			var showText = "<div id='draw_area'><p>投稿中です...</p></div>";
			$("#draw_area").replaceWith(showText);
			showText = "<div id='draw_error'></div>";
			$("#draw_error").replaceWith(showText);
			req = new XMLHttpRequest();

			req.onreadystatechange = function()
			{
				console.log("onready");
			    var READYSTATE_COMPLETED = 4;
			    var HTTP_STATUS_OK = 200;

			    if( this.readyState == READYSTATE_COMPLETED && this.status == HTTP_STATUS_OK ){

			    	if (this.status == HTTP_STATUS_OK){
				        var showText = "<div id='draw_area'>";
						showText = showText + "<p>投稿が完了しました</p>";
						showText = showText + "<a href='http://3lines.info' target='_blank'>3linesを確認する</a></div>";

						$("#draw_area").replaceWith(showText);
					}
					else {
						var showText = "<div id='draw_error'><p>エラーが発生しました</p></div>";
						
						$("#draw_error").replaceWith(showText);
						
					}

			    }
			}
		}

		req.open( 'POST', 'http://3lines.info/add_matome' );

		// サーバに対して解析方法を指定する
		req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

		// データをリクエスト ボディに含めて送信する
		req.send( EncodeHTMLForm( data ) );

		return false;
	});

});




function judgeLogin(){

	console.log(isLogin);
	if (!isLogin){
		console.log('not login');
		var linkText = "<div id='draw_area'><a href='http://3lines.info' target='_blank'><img id='login_button' src='login.gif' alt='ログインする'></a></div>";
		$("#draw_area").replaceWith(linkText);

	}
	else {
		console.log('login');
	}
}

// HTMLフォームの形式にデータを変換する
function EncodeHTMLForm( data )
{
    var params = [];

    for( var name in data )
    {
        var value = data[ name ];
        var param = encodeURIComponent( name ).replace( /%20/g, '+' )
            + '=' + encodeURIComponent( value ).replace( /%20/g, '+' );

        params.push( param );
    }

    return params.join( '&' );
}

function getPageUrl(){
	document.getElementById("page_url").value = location.href;
	console.log(document.getElementById("page_url").value);
}

chrome.tabs.getSelected(function(tab){
	console.log(tab);
	console.log(document.getElementById("page_url"));
	document.getElementById("page_url").value = tab.url;
});


