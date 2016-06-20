//constants
var golden=(1+Math.sqrt(5))/2;
var wWidth=$(window).width()-16;
var wHeight=$(window).height()-16;

function formatDoc(sCmd, sValue) {
    document.execCommand(sCmd, false, sValue);
}

function printDoc(){
    //'','',''
    var myWindow=window.open();
    myWindow.document.open();
    myWindow.document.write('<html><head><link rel="stylesheet" href="style.css"></head><body><div id="container" style="border: 1px solid black;">'+$('#container').html()+'</div></body></html>');
    $(myWindow.document).ready(function(){myWindow.print();});
    myWindow.close();
}

function getTextWidth(text,h){
    var testNode=svg.append("text").attr("id","test").attr("font-size",h).text(text);
    var bbox=document.getElementById("test").getBBox();
    testNode.remove();
    return bbox.width;
}

function getTextHeight(text,w){
    var testNode=svg.append("text").attr("id","test").attr("font-size",1000).text(text);
    var bbox=document.getElementById("test").getBBox();
    testNode.remove();
    return 1000*w/bbox.width;
}

function query(callback,type,subid,objid){
    root=subid;
    $.post("reader.php",{
        type:type,
        subid:subid,
        objid:objid,
    },function(data,status){
        callback(JSON.parse(data));
    });
}

function insertParsedData(data,deepness){
    var first=true;
    for(i in data){
        obj=data[i];
        if(obj.relation=='contains'){
            if(deepness==1&&!first){d3.select('#textBox').append("div").html('<br>');}
            first=false;
            var div=d3.select('#textBox').append("div");
            div.attr("id",obj.objid);
            if(deepness==1){div.attr("class","parent");}
            if(obj.synapses){$(div[0]).text(obj.synapses[0].relation);}
            if(deepness){insertParsedData(obj.synapses,deepness-1);}
        }
    }
}

function parseHeadings(data){
    divs=tbox.children()
    for(var i=0;i<divs.length;i++){
        console.log($(divs[i]).text());
    }
}