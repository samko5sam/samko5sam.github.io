var myWord;
function listResult(myWord){
    var engine_01=document.getElementById("engine_01d").innerHTML;
    var engine_02=document.getElementById("engine_02d").innerHTML;
    var engine_03=document.getElementById("engine_03d").innerHTML;
    var engine_04=document.getElementById("engine_04d").innerHTML;
  
    var engine01_a=engine_01+myWord;
    document.getElementById("engine_a01").innerHTML=engine01_a;
    document.getElementById("engine_a01").href=engine01_a;
  
    var engine02_a=engine_02+myWord;
    document.getElementById("engine_a02").innerHTML=engine02_a;
    document.getElementById("engine_a02").href=engine02_a;
    
    var engine03_a=engine_03+myWord;
    document.getElementById("engine_a03").innerHTML=engine03_a;
    document.getElementById("engine_a03").href=engine03_a;
    
    var engine04_a=engine_04+myWord;
    document.getElementById("engine_a04").innerHTML=engine04_a;
    document.getElementById("engine_a04").href=engine04_a;
}
function openAllTab(){
    var myWord=document.getElementById("myKeyWord").innerHTML;
    
    if (myWord === "無") {
        alert("請填入要查詢的字串");
        return false;
    }
                
    var engine04_a='https://www.dictionary.com/browse/'+myWord;
    window.open(engine04_a);
    
    var engine03_a='https://www.ldoceonline.com/dictionary/'+myWord;
    window.open(engine03_a);
    
    var engine02_a='https://www.merriam-webster.com/dictionary/'+myWord;
    window.open(engine02_a);
    
    var engine01_a='https://dictionary.cambridge.org/us/dictionary/english/'+myWord;
    window.open(engine01_a);
}
function openAllFrame(){
    var myWord=document.getElementById("myKeyWord").innerHTML;
    var engine_01=document.getElementById("engine_a01").innerHTML;
    var engine_02=document.getElementById("engine_a02").innerHTML;
    //var engine_03=document.getElementById("engine_a03").innerHTML;
    var engine_04=document.getElementById("engine_a04").innerHTML;
    
    document.getElementById("iframe01").src=engine_01;
    document.getElementById("iframe02").src=engine_02;
    //document.getElementById("iframe03").src=engine_03;
    document.getElementById("iframe04").src=engine_04;
}
function reloadAllFrame(){
    document.frames("iframe01").location.reload();
    document.frames("iframe02").location.reload();
    //document.frames("iframe03").location.reload();
    document.frames("iframe04").location.reload();
}
function searchAndValidateForm() {
    var myWord=document.getElementById("enterMyWord").value;
    if (myWord === "") {
        alert("請填入要查詢的字串");
        return false;
    }
    document.getElementById("myKeyWord").innerHTML=myWord;
    document.getElementById("myKeyWord02").innerHTML=myWord;
    document.title=myWord + '-ALSONOW';
    listResult(myWord);
    openAllFrame();
}