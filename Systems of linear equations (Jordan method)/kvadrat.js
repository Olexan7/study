function kvadrat(){
    document.getElementById('answer').innerHTML = '';
    document.getElementById('yakob').style.display = 'none';
    document.getElementById('zeid').style.display = 'none';
    var n = parseInt(document.getElementById("Count").value);
    var arrA = calcA();
    var arrB = calcB();
    var arrU = simmetr(arrA);
    if (arrU==false){
        arrAT = TransMatrix(arrA);
        arrA= MultiplyMatrixA(arrAT,arrA);
        arrB = MultiplyMatrixB(arrAT,arrB);
    }
    var arrT = [];
    for(var i=0; i<n; i++){
        arrT[i]=[];
        for(var j=0; j<n; j++){
            arrT[i][j]=0;
        }
    }

    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            if(i==0){
                if(j==0){
                    arrT[0][0] = Math.sqrt(arrA[0][0]); 
                }
                else{
                    arrT[0][j]=arrA[0][j]/arrT[0][0];
                }
            }
        }
    }
    
    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            if(i==j & i!=0 & j!=0){
                let sum=0;
                for(var k=0; k<=i-1; k++){

                    sum += arrT[k][i]*arrT[k][i];
                    arrT[i][i]=Math.sqrt(arrA[i][i]-sum);
                }
            }
            else{
                let sum = 0;
                for(var k=0; k<=i-1; k++){
                    sum += arrT[k][i]*arrT[k][j];
                    arrT[i][j]=(arrA[i][j]-sum)/arrT[i][i];
                }
            }   
        }
    }
    
    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            arrT[i][j] = arrT[i][j] || 0 ;
        }
    }

    var y = [];
    var  x = [];
    for( var i=0; i<n; i++){
        if (i==0){
            y [0]=arrB[0]/arrT[0][0];
        }
        else{
            var sum=0;
            for(var k =0; k <= i-1; k++){
                sum += arrT[k][i]*y[k];
                y[i] = (arrB[i]-sum)/arrT[i][i];
            }
        }
    }

    for(var i=n-1; i>=0; i--){
        if(i==n-1){
            x[i]=y[i]/arrT[i][i];
        }
        else{
            sum=0;
            for(var k=i+1; k<n; k++){
                sum += arrT[i][k]*x[k];
                x[i] = (y[i]-sum)/arrT[i][i];
            }
        }
    }

    for(var i = 0; i<n; i++){
        for(var j = 0; j<n; j++){
            if(arrT[i][j]!=0){
                arrT[i][j] = arrT[i][j].toFixed(2);
            }
        }
    }

    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');

    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);
    
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица T:' + "</font>";
    div.appendChild(p);

    var table = document.createElement('table');
    table.appendChild(Step(arrT));
    div.appendChild(table);
    div_main.appendChild(div);
    document.getElementById('answer').appendChild(div_main);

    var h2 = document.createElement('h2');
    h2.innerHTML = "Ответ:";
    div_main.appendChild(h2);

    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    for( var i=0; i<n; i++){
        h3.innerHTML += "x"+'<sub>' + (i+1)+'</sub>' + '=' + x[i]+ '</br>';
        div.appendChild(h3);
    }
    div_main.appendChild(div);
    document.getElementById('answer').appendChild(div_main);
}

function Step(arr){
    var table = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
      for(var j = 0; j < arr[i].length; j++) {
        if(i == 0){
          var th = document.createElement('td');
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

function simmetr(arr){
    var n = parseInt(document.getElementById("Count").value);
    for(var i=0; i<n;i++){
        for(var j=0; j<n; j++){
            if(arr[i][j]!=arr[j][i]){
                return false;
            }
        }
    }
    return true;
}

function TransMatrix(A){
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
     }
    return AT;
}

function MultiplyMatrixB(A,B){
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = 1,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++)
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) {
            t += A[ i ][j]*B[j];
            C[ i ] = t;
          }
        }
    }
    return C;
}

function MultiplyMatrixA(A,B){
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[ i ] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[ i ][j]*B[j][k];
          C[ i ][k] = t;
        }
     }
    return C;
}