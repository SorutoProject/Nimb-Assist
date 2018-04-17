/*Soruto Japanese word spliter
*(c)2018 Soruto Project.
*/
var sjws = new Object;
//Main
sjws.split = function(st){
var stl = st.toLowerCase();
if(stl.match(/をけんさくして/)){stl=stl.slice(0,-7);}
if(stl.match(/で検索して|を検索して|をけんさく/)){stl=stl.slice(0,-5);}
if(stl.match(/検索して|を教えて|を調べて/)){stl=stl.slice(0,-4);}
if(stl.match(/で検索|を検索|教えて|調べて/)){stl=stl.slice(0,-3);}
if(stl.match(/ひらいて|を開いて/)){stl=stl.slice(0,-4);}
if(stl.match(/開いて/)){stl=stl.slice(0,-3);}
var name = new Array(1);
var index = stl.indexOf("で");
var index2 = stl.indexOf(":");
var index3 = stl.indexOf("を");
//サービス名が文頭にあるとき(~で~)
if(index !=-1){
	name[0]=stl.slice(0,index);
	name[1] = stl.slice(index + 1);
	}
//:が含まれるとき(http://~)
else if(index2 !=-1){
	name[0]=stl.slice(0,index2);
	name[1] = stl.slice(index2 + 1);
}
//検索ワードが文頭にあるとき(~を~)
else if(index3 != -1){
	name[0] = stl.slice(index3+1);
	name[1] = stl.slice(0,index3);
	}
else{
name[0] = stl;
name[1] = false;
}
//サービス名の空白を消す
var targetStr = "　" ;
var regExp = new RegExp( targetStr, "g" ) ;
name[0] = name[0].replace( regExp , "" ) ;

var targetStr = " " ;
var regExp = new RegExp( targetStr, "g" ) ;
name[0] = name[0].replace( regExp , "" ) ;

return name;
}