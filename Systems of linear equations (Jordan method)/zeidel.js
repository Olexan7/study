function epsZeid (){
    document.getElementById('answer').innerHTML = '';
    document.getElementById('yakob').style.display = 'none';
    document.getElementById('zeid').style.display = 'block';
}

function zeidel (){
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
    calcZeid(arrA, arrB, n, eps);
}

function calcZeid(arrA, arrB, n, eps){
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

    do{
        iter++;
        lastX = X;
        X = SumMatrix(MultiplyMatrix(arrA,X), arrB);
        mod = RasnMatrix(X, lastX);
        check = Math.max(...mod);
        var div_main = document.createDocumentFragment();
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Итерация №:'+ iter + "</font>" + '</br>'+ "<font size=5> Матрица X:</font>";
        div.appendChild(p);
        var table = document.createElement('table');
        table.appendChild(StepTwo(X));
        div.appendChild(table);
        div_main.appendChild(div);
        document.getElementById('answer').appendChild(div_main);
    }while(check>(eps));
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

