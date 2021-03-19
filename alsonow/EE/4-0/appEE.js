//#資料
//https://cyfangnotepad.blogspot.com/2013/09/javascripthtml.html
//https://www.codegrepper.com/code-examples/c/javascript+page+is+loaded

//變數
//字典 0 name 1 homepage 2 searchpage(!q會被單字替換) 3 word url (自動生成)
var Dic = [];
Dic[0] = [
    "cambridge",
    "https://dictionary.cambridge.org/",
    "https://dictionary.cambridge.org/us/dictionary/english/!q"
];

Dic[1] = [
    "merriam webster",
    "https://www.merriam-webster.com/",
    "https://www.merriam-webster.com/dictionary/!q"
];

Dic[2] = [
    "dictionary.com",
    "https://www.dictionary.com/",
    "https://www.dictionary.com/browse/!q"
];

Dic[3] = [
    "cambridge 繁中",
    "https://dictionary.cambridge.org/",
    "https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/!q"
];

//Config 方法 myWord fo(frame open) cdic(custom dic) to mode
var Config = {
    myWord: "" ,
    cdic: "" ,
    fo: "" ,
    to: "" ,
    mode: ""
};

//流程
window.onload = (event) => {
    generateLocationQRCODE();
    splitMyUrl();
    makeDicLink();
    fillinMyWord();
    addAllatag();
    fillinMyWordUrl();
    myModeIs();
    
    addAllFrame();
    openAllFrame();
    myModeIs();
};

//function
function splitMyUrl(){//related:addCustomUrl() decodeMyWord()
    //slipturl and make dictionary link, frame
    var temp = location.href.split("?");
    if (temp[1] != "" ){
        var temp = temp[1].split("&");
        for (var i = 0; i < temp.length; i++) {
            var config = temp[i].split("=");
            if (config[1] != ""){
                var value = config[1];
            }else{
                var value = "未設定";
            }
            console.log(config[0] +" 值為 "+ value);
            
            //參數 方法 fo(frame open) cdic(custom dic)
            if (config[0] == "myWord"){
                var myWord = decodeMyWord(config[1]);
                console.log("解碼："+myWord);
                Config.myWord = myWord;
            }else if (config[0] == "cdic"){
                if (config[1] != ""){
                    document.getElementById("cdic").value = "";
                    var x = config[1];
                    var x = decodeURIComponent(x);
                    console.log(x);
                    var x = x.split(",");
                    for (var f = 0; f < x.length; f++){
                        var url = addCustomUrl(x[f]);
                        Config.cdic = url;
                    }
                }
            }else if (config[0] == "fo"){
                if (config[1] == "y"){
                    Config.fo = "y";
                    document.getElementById("fo").checked = "true";
                }else{
                    document.getElementById("fo").checked = "false";
                }
            }else if (config[0] == "to"){//addtobtn() gotoconfigto()
            	if (config[1] != ""){
            		Config.to = config[1] ;
                	document.getElementById("to").value = Config.to ;
                	gotoconfigto();
                	addtobtn();
            	}
            }else if (config[0] == "mode"){//not in form
                if (config[1] == "anki"){
                    Config.mode = "anki";
                }
            }
        };
    }
}//end

function addtobtn(){
    var x = document.getElementById("addtobtn");
    x.innerHTML = '<a href="javascript:;" onclick="gotoconfigto()"> TO'+Config.to+'</a>';
}

function gotoconfigto(){
    $('html, body').animate({scrollTop: Config.to}, 100);
}

function makeDicLink(){
    if (Config.myWord != ""){
        var word = Config.myWord;
        for (var i = 0; i < Dic.length; i++){
            var dicUrlSplit = Dic[i][2].split("!q");
            var dicUrl = dicUrlSplit[0]+word+dicUrlSplit[1];
            Dic[i].push(dicUrl);
        }
    }
}//end

function fillinMyWord(){
    if (Config.myWord != ""){
        document.title=Config.myWord + " | alsonow";
        $(".fillinMyWord").html(Config.myWord);//class fillinMyWord
    }
}//end

function addAllatag(){
    if (Config.myWord != ""){
        var DicLink = document.getElementById("myDicLink");
        DicLink.innerHTML  = '<button type="button" onclick="openAllTab()" class="myButton ankimode-none">彈出所有視窗</button><br>';
        
        for (var i = 0; i < Dic.length; i++) {
            var dicname = Dic[i][0];
            DicLink.innerHTML += '<a id="engine-a-'+i+'" href="" target="_blank" rel="nofollow" class="DicLink ankimode-none">'+dicname+'</a><br>';
        };
        DicLink.innerHTML += '<p>在這裡開啟</p><hr>';
        for (var i = 0; i < Dic.length; i++) {
            var dicname = Dic[i][0];
            DicLink.innerHTML += '<a id="engine-a-frame-'+i+'" href="" target="Diciframe" rel="nofollow" class="DicLink">'+dicname+'</a><br>';
        };
        DicLink.innerHTML += '<br><iframe src="" id="Diciframe" name="Diciframe" class="Diciframe"></iframe><br>';
    }
}//end

function fillinMyWordUrl(){
    var DicLink = document.getElementById("myDicLink");
    if (Config.myWord != ""){
        for (var i = 0; i < Dic.length; i++) {
            var nowDic = "engine-a-"+i;
            var nowaFrame = "engine-a-frame-"+i;
            var nowDicUrl = Dic[i][3];
            document.getElementById(nowDic).href = nowDicUrl;
            document.getElementById(nowaFrame).href = nowDicUrl;
        };
    }
}//end

function addAllFrame(){
    if (Config.fo == "y"){
        var DicFrame = document.getElementById("myDicFrame");
        DicFrame.innerHTML = '<p>內嵌視窗</p><hr><button type="button" onclick="reloadAllFrame()" class="myButton">重新整理內嵌視窗</button><br><br>';
        for (var i = 0; i < Dic.length; i++) {
            var nowFrame = "iframe-"+i;
            DicFrame.innerHTML += '<iframe src="" title="" id="'+nowFrame+'" name="'+nowFrame+'" class="Diciframe"></iframe><br>';
        };
    }
}//end

function openAllFrame(){
    if (Config.fo == "y"){
        var DicFrame = document.getElementById("myDicFrame");
        for (var i = 0; i < Dic.length; i++) {
            var nowFrame = "iframe-"+i;
            var nowDicUrl = Dic[i][3];
            document.getElementById(nowFrame).src = nowDicUrl;
            document.getElementById(nowFrame).title = Dic[i][0];
        };
        //$('html, body').animate({scrollTop: 1095}, 1000);
    }
}//end

function openAllTab(){
    for (var i = 0; i < Dic.length; i++) {
        window.open(Dic[i][3]);
    };
}//end

function reloadAllFrame(){
    for (var i = 0; i < Dic.length; i++){
        var nowFrame = "iframe-"+i;
        document.frames(nowFrame).location.reload();
    };
}//end

function scrolltotop(){
    $('html, body').animate({scrollTop: 0}, 100);
}//end

function addCustomUrl(url) {
    var dec = decodeURIComponent(url);
    Dic.unshift([]);
    console.log("解碼："+dec);
    Dic[0].unshift(dec);
    Dic[0].unshift("custom");
    Dic[0].unshift("custom");
    var cdic = document.getElementById("cdic");
    if (cdic.value != ""){
        cdic.value += ",";
    }
    cdic.value += dec;
    return dec ;
}//end

function decodeMyWord(url){
    var dec = decodeURIComponent(url);
    var temp = dec.split("+");
    var myWord = temp.join(" ");
    return myWord;
}

function listAllDic(){
    var x = "有"+Dic.length+"個字典：\n";
    for (var i = 0; i < Dic.length; i++) {
        var x = x+"---\n";
        var x = x+Dic[i][0]+"："+Dic[i][1]+"\n";
    };
    alert(x);
}//end

function generateLocationQRCODE(){//related myLocationis()
    var mylocation = myLocationis();
    console.log("本頁網址："+mylocation);
    document.getElementById("locationQRCODElink").href = mylocation;
    $('#locationQRCODE').qrcode({
        width: 120,
        height: 120,
        text: mylocation
    });
}//end

function myLocationis(){
    return location.href;
}//end

function myModeIs(){
    if (Config.mode == "anki"){
        ankimode();
    }
}//end

function ankimode(){
	var noneitem = document.getElementsByClassName("ankimode-none");
	for (var i = 0; i < noneitem.length; i++){
		noneitem[i].style = "display:none;";
	}
    var footer = document.getElementById("footer");
    var alsonow = document.getElementById("alsonowandmyword");
    footer.style = "margin-top:1.5em;";
    alsonow.innerHTML = '加油！卡片快做完了 <a href="https://alsonow.neocities.org/EE/">alsonow英英</a>'
}//end
