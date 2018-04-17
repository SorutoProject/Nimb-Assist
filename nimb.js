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
	//nimb データ取得開始
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "txtdb/" + mencode + ".txt", true);
  xhr.onreadystatechange = function(){
    // 本番用
    if (xhr.readyState === 4 && xhr.status === 200){
      analysis(xhr.responseText,datas,ans);
    }
    // ローカルファイル用
    if (xhr.readyState === 4 && xhr.status === 0){
      analysis(xhr.responseText,datas,ans);
    }
  };
  xhr.send(null);
};


}
function analysis(nimbdata,datas,ans){
	var nimbsplit = nimbdata.split("|");//nimb データを配列に分割する
	var length = nimbsplit.length;
	/*
	nimb データ配列
	URLのみの形式: [0]:nimbの発言 [1]:開くURL 総配列数:1
	検索エンジン込み形式: [0]:検索ワードがあるときの発言(*を検索キーワードに置き換え) [1]:←のときに使う検索URL [2]:検索ワードがカラのときの発言 [3]:←のときに開くURL 総配列数:3
	*/
	
	//nimbデータがURL形式のとき
	if(length == 1){
		ans.innerHTML = nimbsplit[0];
		window.setTimeout("MovePage('" + nimbsplit[1] +"')",500);
	}
	//nimbデータが検索エンジン込み形式のとき
	else if(length == 3){
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