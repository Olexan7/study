function holeczki(){
    document.getElementById('answer').innerHTML = '';
    document.getElementById('yakob').style.display = 'none';
    document.getElementById('zeid').style.display = 'none';
    var n = parseInt(document.getElementById("Count").value);
    var arrA = calcA();
    var arrB = calcB();
    var arrP = [];
    var arrC = [];

    var k,i,a1,j = 0;
    for(k = 0; k<n; k++){
        arrP[k]=[];
        arrC[k]=[];
        for(i = 0; i<n; i++){
            if(k==i){
                arrC[k][i]=1;
                arrP[k][i]=0;
            }
            else{
                arrC[k][i]=0;
                arrP[k][i]=0;
            }
        }
    }

    for(a1 = 0; a1<n; a1++){
        if(a1==0){
            for(i=0; i<n;i++){
                arrP[i][0]=arrA[i][0];
            }
            for(i = 1; i<n;i++){
                arrC[0][i]=arrA[0][i]/arrP[0][0];
            }
        }
        else{
            k = a1;
            for(i = a1; i<n; i++){
                arrP[i][k]=arrA[i][k];
                for(j=0; j<=k-1; j++){
                    arrP[i][k]=arrP[i][k]-arrP[i][j]*arrC[j][k];
                }
            }
            i = a1;
            for(k = i+1; k<n; k++){
                arrC[i][k]=arrA[i][k];
                for(j=0; j<=i-1; j++){
                    arrC[i][k] = arrC[i][k]-arrP[i][j]*arrC[j][k];
                    arrC[i][k] = arrC[i][k]/arrP[i][i];
                }
            }
        }
    }
    var x1=[];
    var y1=[];
    var x = [];
    var y = [];
    for (var i = 0; i < n; ++i){
        x1[i]=[];
        y1[i]=[];
        for(var j=0; j < n;j++){
            x1[i][j]=0;
            y1[i][j]=0;
        }
    }
    var i,j,k = 0;
    var w,q = 0;

    for(i=0; i<n; i++){
        if(i==0){
            y[i] = arrB[i]/arrP[i][i];
        }
        else{
            w=0;
            for(k=0; k<=i-1; k++){
                y1[i][k] = w+arrP[i][k]*y[k];
                w = y1[i][k];
            }
            y[i]=(arrB[i]-w)/arrP[i][i];
        }
    }
    for(i=n-1; i>=0; i--){
        if(i==n-1){
            x[i]=y[i];
        }
        else{
            q=0;
            for(k=i+1; k<n; k++){
                x1[i][k]=q+arrC[i][k]*x[k];
                q=x1[i][k];
            }
            x[i]=y[i]-q;
        }
    }

    for(var i = 0; i<n; i++){
        for(var j = 0; j<n; j++){
            if(arrP!=0){
                arrP[i][j] = Number(arrP[i][j].toFixed(2));
            }
            if(arrC!=0){
                arrC[i][j] = Number(arrC[i][j].toFixed(2));
            }
        }
    }

    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');

    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);

    var p = document.createElement('p');
    p.innerHTML = "<font size=5>"+ 'Матрица Р:' +"<font size=5>";
    div.appendChild(p);

    var table = document.createElement('table');
    table.appendChild(Step(arrP));
    div.appendChild(table);
    div_main.appendChild(div);

    
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица С:' + "</font>";
    div.appendChild(p);

    var table = document.createElement('table');
    table.appendChild(Step(arrC));
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
    table.className = "tbl_table";
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
      tr.className = "tbl_tr";
      for(var j = 0; j < arr[i].length; j++) {
        if(i == 0){
          var th = document.createElement('td');
          th.className = "tbl_td";
          th.innerHTML = arr[i][j]; 
          tr.appendChild(th);
        }else{
          var td = document.createElement('td');
          td.className = "tbl_tg"
          if (j == 0) { td.id = "Y"}
          td.innerHTML = arr[i][j];
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    return table;
}