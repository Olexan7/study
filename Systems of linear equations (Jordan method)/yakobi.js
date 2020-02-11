function epsJakob (){
    document.getElementById('answer').innerHTML = '';
    document.getElementById('zeid').style.display = 'none';
    document.getElementById('yakob').style.display = 'block';
}

function jakobian (){
    var n = parseInt(document.getElementById("Count").value);
    var eps = Number((document.getElementById('count_eps').value));
    var arr1 = calcA();//A
    var arr2 = calcB();//B
    var arrA = [];
    var arrB = [];
    var sum = 0;
    var q = [];

    for(var i = 0; i<n; i++){
        var sum = 0;
        for(var j = 0; j<n; j++){
            if(i!=j){
                sum += Math.abs(arr1[i][j]);
            } 
        }
        if(Math.abs(arr1[i][i])<sum){
            var div_main = document.createDocumentFragment();
            var h2 = document.createElement('h2');
            h2.innerHTML = "Решение:";
            div_main.appendChild(h2);
            div_main.appendChild(h2);
            document.getElementById('answer').appendChild(div_main);
            var div = document.createElement('div');
            var h3 = document.createElement('h3');
            h3.innerHTML += "Отсутствует диагонаьное преобладание";
            div.appendChild(h3);
            div_main.appendChild(div);
            document.getElementById('answer').appendChild(div_main);
            return false;
        }
    }
    
    for(var i=0; i<n;i++){
        arrA[i]=[];
        arrB[i] = arr2[i]/arr1[i][i];
        for(var j=0; j<n;j++){
            if(i!=j){
                arrA[i][j] = -(arr1[i][j]/arr1[i][i]);
            }
            else{
                arrA[i][j]=0;
            }
        }
    }

    for(var i = 0; i<n; i++){
        var sum = 0;
        for(var j = 0; j<n; j++){
            sum += Math.abs(arrA[i][j]);
        }
        q[i] = sum;
    }
    var qMax= Math.max(...q);

    calcYacob(arrA, arrB, n, eps, qMax);
}

function calcYacob(arrA, arrB, n, eps, q){
    var lastX = [];
    var X = [];
    var iter = 0;
    var mod = [];
    var check;

    for (let i = 0; i < n; i++) {
        lastX[i] = 0;
    }
    iter++;
    X = lastX;
    iter = 0;

    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');

    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);

    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица B:' + "</font>";
    div.appendChild(p);
    var table = document.createElement('table');
    table.appendChild(Step(arrA));
    div.appendChild(table);
    div_main.appendChild(div);
    document.getElementById('answer').appendChild(div_main);

    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица d:' + "</font>";
    div.appendChild(p);
    var table = document.createElement('table');
    table.appendChild(StepTwo(arrB));
    div.appendChild(table);
    div_main.appendChild(div);
    document.getElementById('answer').appendChild(div_main);
    var h2 = document.createElement('h2');
    h2.innerHTML = "Итеррационный процесс:";
    div_main.appendChild(h2);
    

    do{
        iter++;
        lastX = X;
        X = SumMatrix(MultiplyMatrix(arrA,X), arrB);
        mod = RasnMatrix(X, lastX);
        check = Math.max(...mod);

        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Итерация №:'+ iter + "</font>" + '</br>'+ "<font size=5> Матрица X:</font>";
        div.appendChild(p);
        var table = document.createElement('table');
        table.appendChild(StepTwo(X));
        div.appendChild(table);
        div_main.appendChild(div);
        document.getElementById('answer').appendChild(div_main);
    }while(check>(eps*(q/(1-q))));
    var h2 = document.createElement('h2');
    h2.innerHTML = "Ответ:";
    div_main.appendChild(h2);

    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    for( var i=0; i<n; i++){
        h3.innerHTML += "x"+'<sub>' + (i+1)+'</sub>' + '=' + X[i]+ " ± "+ eps + '</br>';
        div.appendChild(h3);
    }
    div_main.appendChild(div);
    document.getElementById('answer').appendChild(div_main);

}

function StepTwo(arr){
    var table = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
        if(i == 0){
          var th = document.createElement('td');
          th.innerHTML = arr[i]; 
          tr.appendChild(th);
        }else{
          var td = document.createElement('td');
          td.innerHTML = arr[i];
          tr.appendChild(td);
        }
      table.appendChild(tr);
    }
    return table;
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
          td.innerHTML = arr[i][j];
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    return table;
}


function MultiplyMatrix(A,B){
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

function SumMatrix(A,B)       //На входе двумерные массивы одинаковой размерности
{   
    var m = A.length,  C = [];
    for (var i = 0; i < m; i++)
        C[i] = A[i] + B[i];
    return C;
}

function RasnMatrix(A,B)       //На входе двумерные массивы одинаковой размерности
{   
    var m = A.length,  C = [];
    for (var i = 0; i < m; i++)
        C[i] = Math.abs(Math.abs(A[i]) - Math.abs(B[i]));
    return C;
}
