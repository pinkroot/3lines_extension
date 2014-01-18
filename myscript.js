isLogin = null;

$(function(){
	var req = new XMLHttpRequest();


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
		
		var data = {page_url: $('#page_url').val(), row1 : $('#row1').val(), row2 : $('#row2').val(), row3 : $('#row3').val()};
 		
		$.ajax({
            type: "post",
            url: "http://3lines.info/add_matome",
            data: data,                
            success: function(data, dataType)
            {
                alert("まとめを投稿しました！");
                var showText = "<div id='draw_area'>";
				showText = showText + "<p>投稿が完了しました</p>";
				showText = showText + "<a href='http://3lines.info' target='_blank'>3linesを確認する</a></div>";

				$("#draw_area").replaceWith(showText);

				return false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                //エラーメッセージの表示
                alert('Error : ');
            }
        });

        //サブミット後、ページをリロードしないようにする
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


chrome.tabs.getSelected(function(tab){
	console.log(tab);
	console.log(document.getElementById("page_url"));
	document.getElementById("page_url").value = tab.url;
});


