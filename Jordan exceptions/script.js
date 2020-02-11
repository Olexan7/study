function generateForms(){
    document.getElementById('forms').innerHTML = '';
    var tbl = document.createElement('table');
    tbl.className = 'table_new';
    var n = parseInt(document.getElementById("rowCount").value)+1;
    var m = parseInt(document.getElementById("colCount").value);
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
    console.log(tbl);
}

function randomTable(){
  document.getElementById('forms').innerHTML = '';
  var tbl = document.createElement('table');
  tbl.className = 'table_new';
  var n = parseInt(document.getElementById("rowCount").value)+1;
  var m = parseInt(document.getElementById("colCount").value) ;
  tbl.insertRow().insertCell();
  for (var i=1; i <= m; i++){
      tbl.insertRow().insertCell().innerHTML = '';
      tbl.className='table_new';
      for (var j = 1; j<= n; j++)	{
          if(j ==n){
              var input = document.createElement('input');
              input.value = getRandom();
              input.type = "text";
              input.className = 'inputform';
              tbl.tBodies[0].rows[i].insertCell().innerHTML = '=';
              tbl.tBodies[0].rows[i].insertCell().appendChild(input);
              tbl.tBodies[0].rows[i].className = 'table_new';
          }
          else{
              var input = document.createElement('input');
              input.type = "text";
              input.value = getRandom();
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

function getRandom(){
  var min = -10;
  var max = 10;
  return Math.floor(Math.random()*(max-min))+min;
}

function calcMass(){
    document.getElementById('alterMatrix').innerHTML = '';
    var n = parseInt(document.getElementById("rowCount").value)+1;
    var m = parseInt(document.getElementById("colCount").value);
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

    for(var y=0; y<m; y++){
      if (arrNew[y][0]<0){
        for(var i=0; i<n;i++){
          arrNew[y][i]=-arrNew[y][i];
        }
      }
    }

return arrNew;
}

function getA (){
  var n = parseInt(document.getElementById("rowCount").value)+1;
  var m = parseInt(document.getElementById("colCount").value);
  var arr = calcMass();
  var arrA = [];
  for(var i = 0; i<m; i++){
    arrA[i] = [];
    for(var j = 1; j<n; j++){
      arrA[i][j-1] = arr[i][j];
    }
  }
  return arrA;
}

function createTable() {
    var arr = calcMass();
    document.getElementById('table').innerHTML = '';
    var table = document.createDocumentFragment();
    var arrTable = [];
    var m = parseInt(document.getElementById("rowCount").value)+1;
    var n = parseInt(document.getElementById("colCount").value)+1;
    for (var i = 0; i < n; i++) {
      var tr = document.createElement('tr');
      arrTable[i] = [];
      for(var j = 0; j < m+1; j++) {
        if(i == 0){
          var th = document.createElement('th');
          if (j == 1)
            th.innerHTML = arrTable[i][j] = "1";
          else if (j != 0)
           th.innerHTML = arrTable[i][j] = "-x" + '<sub>'+ (j-1);
          tr.appendChild(th);
        }else{
          var td = document.createElement('td');
          if (j == 0) { td.id = "Y"}
          if (j != 0){
            td.appendChild(document.createTextNode(arr[i-1][j-1]));
          }else {
              td.innerHTML = arrTable[i][j] = "0 =";
          }
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    document.getElementById('table').appendChild(table);
    document.getElementById('step').style.display = 'block';
    return arrTable;
}

function calc(){
    document.getElementById('decision').innerHTML = '';
    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');
    var n = parseInt(document.getElementById("colCount").value);

    var arr = tableMatrix();
    var rank = MatrixRank(arr);
    var arrA = getA(); var rankA = MatrixRank(arrA);
    var arrAB = calcMass(); var rankAB = MatrixRank(arrAB);

    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);

    var p = document.createElement('p');
    p.innerHTML = "<font size=5>"+"Сделаем "+ 'rank = '+ rank + ' шагов Жордановых исключений'+"<font size=5>";
    div.appendChild(p);
  
    var table = document.createElement('table');
    table.appendChild(conversionStep(arr));
    div_main.appendChild(div);
    var arr_ae = [];
  
    for (var i = 1; i <= rank; i++) {
      var div = document.createElement('div');
      div.id = "decision_" + i;
      var p = document.createElement('p');
      var j = allowEntry(arr[i], arr_ae);
      p.innerHTML = "<font size=5>" + "Шаг: "+ i + ". Разрешающий элемент: " + "["+i+"]"+ "["+j+"]"+" = " + arr[i][j] + "</br>"+"</br>" +"Результат:" + "</font>";
      div.appendChild(p);
      arr_ae.push(j);
      arr = JordanovaException(arr, i, j);
  
      var table = document.createElement('table');
      table.appendChild(conversionStep(arr));
      div.appendChild(table);
      div_main.appendChild(div);
    }
    
    document.getElementById('decision').appendChild(div_main);
    getEguations(arr,rank);
}

function NoAnswer(r){
  var div_main = document.createDocumentFragment();
  var h2 = document.createElement('h2');
  h2.innerHTML = "Ранг матрицы A не равен рангу расширенной матрицы A|b" + '</br>' + 'Система не имеет решения';
  div_main.appendChild(h2);
  document.getElementById('decision').appendChild(div_main);
}

function allowEntry(arr, arr_ae){
    var n = 0;
    for (var i = 2; i < arr.length; i++) {
      for (var j = 0; j < arr_ae.length; j++) {
        if (i == arr_ae[j]) {
          n++;
        }
      }
      if (n==0 && arr[i]!=0) {
        return i;
      }else{
        n=0;
      }
    }
}

function conversionStep(arr){
  var table = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var tr = document.createElement('tr');
    for(var j = 0; j < arr[i].length; j++) {
      if(i == 0){
        var th = document.createElement('th');
        th.innerHTML = arr[i][j]; 
        tr.appendChild(th);
      }else{
        var td = document.createElement('td');
        if (j == 0) { td.id = "Y"}
        td.innerHTML = arr[i][j];
        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  }
  return table;
}

function getEguations(arr, rank){
    var n = parseInt(document.getElementById("rowCount").value)+1;
    var m = parseInt(document.getElementById("colCount").value);
    document.getElementById('answer').innerHTML = '';
    var div = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Ответ: ";
    div.appendChild(h2);
    for (var i = 1; i <= rank; i++){
      var sum = 0;
      var ex = "";
      if (!isFinite(arr[i][0])) {
        h3 = document.createElement('h3');
        h3.innerHTML += arr[i][0];
        for(var j = 1; j < arr[i].length; j++) {
          if (isFinite(arr[0][j])) {
            sum += arr[i][j]*arr[0][j]; // check
          }else{
            if (arr[i][j] != 0 ) {
              if (arr[i][j] > 0){
                  ex += "-" + arr[i][j]+"x"+'<sub>' + (j-1) + '</sub>';
              }else {
                  ex += "+" + Math.abs(arr[i][j])+"x"+'<sub>' + (j-1) + '</sub>';
              }
            }
          }
        }
        if (ex != "" && sum != 0) {
          h3.innerHTML += +sum.toFixed(2) + ex;
        } else if (ex == "") {
            h3.innerHTML += +sum.toFixed(2);
        } else {
            h3.innerHTML += ex ;
        }
        div.appendChild(h3);
      }
    }
    document.getElementById('decision').appendChild(div);
}

function JordanovaException(arr, i_ae, j_ae){
    var allow_entry = arr[i_ae][j_ae];
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        array[i] = [];
      for (var j = 0; j < arr[i].length; j++) {
        if (i == i_ae && j == j_ae) {
          array[i][j] = +(1/allow_entry).toFixed(3);
        }else if (i == i_ae && j != 0) {
          array[i][j] = +(-arr[i][j]/allow_entry).toFixed(3);
        }else if (j == j_ae && i != 0){
          array[i][j] = +(arr[i][j]/allow_entry).toFixed(3);
        }else if (i == 0) {
          if (j == j_ae) {
            array[i][j] = 0;
          }else {
            array[i][j] = arr[i][j];
          }
        }else if (j == 0 ) {
          if (i == i_ae) {
            array[i][j] = "x" + '<sub>' + (i_ae) + '</sub>'+ "= ";
          }else {
            array[i][j] = arr[i][j];
          }
        }else{
          array[i][j] = +((arr[i][j]*allow_entry - arr[i][j_ae]*arr[i_ae][j])/allow_entry).toFixed(3);
        }
      }
    }
    return array;
}

function tableMatrix(){
    var table = document.getElementById('table');
    var th = table.querySelectorAll('th');
    var tr = table.querySelectorAll('tr');
    var td = table.querySelectorAll('td');
    var arr1 = calcMass();
    var sizeRow = tr.length;
    var sizeCell = th.length;
    var arr = [];
    for (var i = 0; i < sizeRow; i++) {
      arr[i] = [];
      for (var j = 0; j < sizeCell; j++) {
        var k = j+(i-1)*sizeCell;
        if (i == 0 ) {
          arr[i][j] = th[j].innerHTML;
        }else{
              if(j == 0){
                arr[i][j] = td[k].innerHTML;
              }else{
                arr[i][j] = arr1[i-1][j-1];
              }
        }
      }
    }
    return arr; 
}

function  MatrixRank(A) {
    var m = A.length, n = A[0].length, k = (m < n ? m : n), r = 1, rank = 0;
    while (r <= k){ 
      var B = [];
      for (var i = 0; i < r; i++) 
        B[i] = [];
      for (var a = 1; a < m-r+1; a++){ 
        for (var b = 2; b < n-r+1; b++){ 
          for (var c = 0; c < r; c++){ 
            for (var d = 0; d < r; d++) 
              B[c][d] = A[a+c][b+d]; 
          }
          if (Determinant(B) != 0) 
            rank = r;
        }
      }
      r++;
    }
    return rank;
}

function Determinant(A)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}