function generateForms(){
    document.getElementById('forms').innerHTML = '';
    var tbl = document.createElement('table');
    tbl.className = 'table_new';
    var n = parseInt(document.getElementById("Count").value)+1;
    var m = parseInt(document.getElementById("Count").value) ;
    tbl.insertRow().insertCell();
    for (var i=1; i <= m; i++){
        tbl.insertRow().insertCell().innerHTML = '';
        tbl.className='table_new';
        for (var j = 1; j<= n; j++)	{
            if(j ==n){
                var input = document.createElement('input');
                input.type = "text";
                input.className = 'inputform';
                tbl.tBodies[0].rows[i].insertCell().innerHTML = '=';
                tbl.tBodies[0].rows[i].insertCell().appendChild(input);
                tbl.tBodies[0].rows[i].className = 'table_new';
            }
            else{
                var input = document.createElement('input');
                input.type = "text";
                input.className = 'inputform';
                tbl.tBodies[0].rows[i].insertCell().appendChild(input);
                tbl.tBodies[0].rows[i].insertCell().innerHTML ='x' + '<sub>'+ j;
                tbl.tBodies[0].rows[i].className = 'table_new';
                if(j<n-1){
                tbl.tBodies[0].rows[i].insertCell().innerHTML = '+';
                tbl.tBodies[0].rows[i].className = 'table_new';
              }
            }

        }
        
    }
    document.getElementById("forms").appendChild(tbl);
    document.getElementById('div_1').style.display = 'block';
}

function randomTable(){
    document.getElementById('forms').innerHTML = '';
    var tbl = document.createElement('table');
    tbl.className = 'table_new';
    var n = parseInt(document.getElementById("Count").value)+1;
    var m = parseInt(document.getElementById("Count").value) ;
    tbl.insertRow().insertCell();
    for (var i=1; i <= m; i++){
        tbl.insertRow().insertCell().innerHTML = '';
        tbl.className='table_new';
        for (var j = 1; j<= n; j++)	{
            if(j ==n){
                var input = document.createElement('input');
                input.type = "text";
                input.className = 'inputform';
                input.value = getRandom();
                tbl.tBodies[0].rows[i].insertCell().innerHTML = '=';
                tbl.tBodies[0].rows[i].insertCell().appendChild(input);
                tbl.tBodies[0].rows[i].className = 'table_new';
            }
            else{
                var input = document.createElement('input');
                input.type = "text";
                input.className = 'inputform';
                input.value = getRandom();
                tbl.tBodies[0].rows[i].insertCell().appendChild(input);
                tbl.tBodies[0].rows[i].insertCell().innerHTML ='x' + '<sub>'+ j;
                tbl.tBodies[0].rows[i].className = 'table_new';
                if(j<n-1){
                tbl.tBodies[0].rows[i].insertCell().innerHTML = '+';
                tbl.tBodies[0].rows[i].className = 'table_new';
              }
            }

        }
        
    }
    document.getElementById("forms").appendChild(tbl);
    document.getElementById('div_1').style.display = 'block';
}

var arr1 = [[-4,1,1],[1,-9,3],[1,2,-16]];
var arr2 = [2, 5, 13];
function checkTable(){
  document.getElementById('forms').innerHTML = '';
  var tbl = document.createElement('table');
  tbl.className = 'table_new';
  var n = parseInt(document.getElementById("Count").value)+1;
  var m = parseInt(document.getElementById("Count").value) ;
  tbl.insertRow().insertCell();
  for (var i=1; i <= m; i++){
      tbl.insertRow().insertCell().innerHTML = '';
      tbl.className='table_new';
      for (var j = 1; j<= n; j++)	{
          if(j ==n){
              var input = document.createElement('input');
              input.type = "text";
              input.className = 'inputform';
              input.value = arr2[i-1];
              tbl.tBodies[0].rows[i].insertCell().innerHTML = '=';
              tbl.tBodies[0].rows[i].insertCell().appendChild(input);
              tbl.tBodies[0].rows[i].className = 'table_new';
          }
          else{
              var input = document.createElement('input');
              input.type = "text";
              input.className = 'inputform';
              input.value = arr1[i-1][j-1];
              tbl.tBodies[0].rows[i].insertCell().appendChild(input);
              tbl.tBodies[0].rows[i].insertCell().innerHTML ='x' + '<sub>'+ j;
              tbl.tBodies[0].rows[i].className = 'table_new';
              if(j<n-1){
              tbl.tBodies[0].rows[i].insertCell().innerHTML = '+';
              tbl.tBodies[0].rows[i].className = 'table_new';
            }
          }

      }
      
  }
  document.getElementById("forms").appendChild(tbl);
  document.getElementById('div_1').style.display = 'block';
}

function getRandom(){
    var min = -10;
    var max = 10;
    return Math.floor(Math.random()*(max-min))+min;
}

function calcMass(){
    var n = parseInt(document.getElementById("Count").value)+1;
    var m = parseInt(document.getElementById("Count").value);
    var myArr = document.forms.inputField;
    var arr = [];   
    var k = 0; var i = 0; var j = 0;
    length = parseInt(myArr.length);
    while(k < (length)){
        while(i < m){
            arr[i] = [];
            while(j < n){
                var Control = myArr[k];
                arr[i][j] = Control.value;
                k += 1;
                j += 1;
            }
        i += 1;
        j = 0;   
        }
    }
    for(var x=0; x<m; x++){
      for(var y=0; y<n; y++){
        arr[x][y]=Number(arr[x][y]);
      }
    }
    var arrNew = [];
    for(var i =0; i<m; i++){
      arrNew[i] = [];
      for(var j =0 ; j<n; j++){
        arrNew[i][j] = 0;
      }
    }
    for(var i = 0; i<m; i++){
      arrNew[i][0] = arr[i][n-1];
    }
    for(var i=0; i<m; i++){
      for(var j = 1; j<n; j++){
        arrNew[i][j] = arr[i][j-1];
      }
    }
    return arrNew;
}

function calcB (){
    var m = parseInt(document.getElementById("Count").value)+1;
    var n = parseInt(document.getElementById("Count").value);
    var arr = calcMass();
    var arrB = [];
    for(var i=0; i<n; i++){
        arrB[i] = arr[i][0];
    }
    return arrB;
}

function calcA(){
    var n = parseInt(document.getElementById("Count").value);
    var m = parseInt(document.getElementById("Count").value);
    var arr = calcMass();
    var arrA=[];
    var k=0;
    for(var i=0; i<m; i++){
        arrA[i]=[];
        for(var j=0; j<n; j++){
            k=k+1;
            arrA[i][j] = arr[i][k];
        }
    k=0;
    }
    return arrA;
}