window.onload = function(){
	document.getElementById("ut").focus();
}
function sMenu(){
	document.getElementById("menu").style.display = "block";
}
function cMenu(){
	document.getElementById("menu").style.display = "none";
}
function reply(){
	var ut = document.getElementById("ut").value;//ユーザーの発言を取得
	var utencode = encodeURI(ut);//utをURLエンコード
	var mencode = utencode.toLowerCase();
	var encode = mencode.replace(/%/g , "");
	var ans = document.getElementById("ans");//Nimb 返答エリアのエレメントを取得
	var datas = sjws.split(ut);//Soruto Spliterを使って、サービス名、検索ワードを取得
	var snameurl = encodeURI(datas[0]).toLowerCase().split("%").join("");
	if(ut=="" || datas[0] == ""){
		ans.innerHTML="申し訳ありませんが、もう少し詳しく入力してください。";
	}else{
	ans.innerHTML = "考え中...";
	//nimb データ取得開始
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "txtdb/" + snameurl + ".txt", true);
  xhr.onreadystatechange = function(){
    // 本番用
    if (xhr.readyState === 4 && xhr.status === 200){
      analysis(xhr.responseText,datas,ans);
    }
    // ローカルファイル用
    if (xhr.readyState === 4 && xhr.status === 0){
      analysis(xhr.responseText,datas,ans);
    }
    // 404エラー時(データベースにないとき)
    if (xhr.readyState === 4 && xhr.status === 404){
      ans.innerHTML = "申し訳ありませんが、<br>私には\"" + ut + "\"を理解できませんでした";
    }
  };
  xhr.send(null);
  
	}
}
function analysis(nimbdata,datas,ans){
	var nimbsplit = nimbdata.split("|");//nimb データを配列に分割する
	var length = nimbsplit.length;
	/*
	nimb データ配列
	URLのみの形式: [0]:nimbの発言 [1]:開くURL 総配列数:2
	検索エンジン込み形式: [0]:検索ワードがあるときの発言(*を検索キーワードに置き換え) [1]:←のときに使う検索URL [2]:検索ワードがカラのときの発言 [3]:←のときに開くURL 総配列数:4
	*/
	
	//nimbデータがURL形式のとき
	if(length == 2){
		ans.innerHTML = nimbsplit[0];
		window.setTimeout("MovePage('" + nimbsplit[1] +"')",500);
	}
	//nimbデータが検索エンジン込み形式のとき
	else if(length == 4){
		//ユーザーの検索キーワードがあるとき
		if(datas[1]!=false){
			ans.innerHTML = nimbsplit[0].split("*").join('"' + datas[1] + '"');
			var swurl = encodeURI(nimbsplit[1] + datas[1]);
			window.setTimeout("MovePage('" + swurl +"')",500);
		}
		//検索キーワードがないとき
		else{
			ans.innerHTML = nimbsplit[2];
			window.setTimeout("MovePage('" + nimbsplit[3] +"')",500);
		}
	}
	
}
function MovePage(url){
	location.href=url;
}
function Key_on(event){
	if(event.keyCode==13){
		reply();
	}
}