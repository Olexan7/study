window.onload = function(){   
    Interface();
}

function Interface() {
    
    let select = document.getElementById('Count');
    
    let btnGenerateTbl = document.getElementById('btn-generate-tbl');
    let btnRandomTbl = document.getElementById('rangomMatrix');
    let btnCheckTbl = document.getElementById('checkMatrix');

    let col,row;

    btnGenerateTbl.onclick = function() {      

        col = +select.value;
        row = +select.value;

        let table = document.getElementById('table');
        table.innerHTML = '';
        
        for (let i = 1; i <= row; i++) {

            let tr = document.createElement('tr'); 
            table.append(tr);
            
            for (let j = 1; j <= col; j++) {
           
                let input = document.createElement('input');
                input.className = 'inputform'; 
                input.id = (i) + '' + (j);
                    
                let td = document.createElement('td'); 
                td.append(input);
                tr.append(td);
            }
        }
        document.getElementById('div_metod').style.display = 'block';
    }

    btnRandomTbl.onclick = function() {      

        col = +select.value;
        row = +select.value;

        let table = document.getElementById('table');
        table.innerHTML = '';
        
        for (let i = 1; i <= row; i++) {

            let tr = document.createElement('tr'); 
            table.append(tr);
            
            for (let j = 1; j <= col; j++) {
           
                let input = document.createElement('input');
                input.className = 'inputform';
                input.value = getRandom(); 
                input.id = (i) + '' + (j);
                    
                let td = document.createElement('td'); 
                td.append(input);
                tr.append(td);
            }
        }
        document.getElementById('div_metod').style.display = 'block';
    }
    var arr1 = [[8,1,1],[-1,4,1],[1,1,25]];
    btnCheckTbl.onclick = function() {      

        col = +select.value;
        row = +select.value;

        let table = document.getElementById('table');
        table.innerHTML = '';
        
        for (let i = 1; i <= row; i++) {

            let tr = document.createElement('tr'); 
            table.append(tr);
            
            for (let j = 1; j <= col; j++) {
           
                let input = document.createElement('input');
                input.className = 'inputform';
                input.value = arr1[i-1][j-1]; 
                input.id = (i) + '' + (j);
                    
                let td = document.createElement('td'); 
                td.append(input);
                tr.append(td);
            }
        }
        document.getElementById('div_metod').style.display = 'block';
    }

    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    let btn4 = document.getElementById('btn4');

    btn1.onclick = function() {
        document.getElementById('div_eps').style.display = 'block';
        document.getElementById('output').innerHTML = '';
        let e = document.getElementById('e').value;
        let matrix = getMatrix(row, col);
        let a = simpleIterations(matrix, e);
    }    
    btn2.onclick = function() {
        document.getElementById('div_eps').style.display = 'block';
        document.getElementById('output').innerHTML = '';
        let e = document.getElementById('e').value;
        let matrix = getMatrix(row, col);
        let a = scalarProducts(matrix, e);

    }
    btn3.onclick = function() {
        document.getElementById('div_eps').style.display = 'none';
        document.getElementById('output').innerHTML = '';
        let e = document.getElementById('e').value;
        let matrix = getMatrix(row, col);
        let result = Danilevsky(matrix, e);

    }
    btn4.onclick = function() {
        document.getElementById('div_eps').style.display = 'none';
        document.getElementById('output').innerHTML = '';
        
        let e = document.getElementById('e').value;
        let matrix = getMatrix(row, col);
        let a = simpleForKrylov(matrix, e);
        let result = Krylov(a, e);
    }
}

function getRandom(){
    var min = -10;
    var max = 10;
    return Math.floor(Math.random()*(max-min))+min;
}

function simpleIterations(matrix, e){
    
    // Создадим массив для хранения X, чтобы с его помощью 
    // в дальнейшем решить полную проблему
    let AllX = [];

    // Определяем массивы X c индексами i+1 и i
    let currentX, lastX = [];

    // Заполняем массив Х с индексом 0, начальное приближение
    for (let i = 0; i < matrix.length; i++) {
        lastX[i] = 1;
    }
    AllX.push(lastX);

    let iterations = 0;
    let deviation, lambda;

    do {
        iterations++;

        // Находим Х с индексом i+1, при первом проходе с индексом 1
        currentX = multiplyMatrixByVector(matrix, lastX);

        // Добавим массив Х в массив с массивами :)
        AllX.push(currentX);
       
        // Инициализируем массив со значениями лямбда и заполняем его
        lambda = [];
        for (let i = 0; i < lastX.length; i++) {
            lambda[i] = currentX[i]/lastX[i];
        }
        
        // Обновляем переменную предыдущего Х
        lastX = currentX;
        
        // Найдем наибольшую разность между элементами лямбда
        deviation = Math.max(...lambda) - Math.min(...lambda);
    } while (deviation >= e);

    // Находим собственное значение, найдя среднее значение лямбда
    let summ = 0;
    for (let i = 0; i < lambda.length; i++) {
        summ += lambda[i];
    }
    lambda = Math.abs(summ/lambda.length);

    // Находим ||х||
    let arrX = [];
    for (let i = 0; i < currentX.length; i++) {
        arrX[i] = Math.abs(currentX[i]);
    }
    numX = Math.max(...arrX);

    // Находим y
    let y = [];
    for (let i = 0; i < currentX.length; i++) {
        y[i] = currentX[i]/numX;
    }

    let output = document.getElementById("output");
    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение частной проблемы:";
    div_main.appendChild(h2);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Количество иттераций: ' + iterations + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Среднее λ: ' + lambda.toFixed(3) + ' ± ' + e +"</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Собственный вектор: ' +'[' + Vector(y) + ']'+ "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    output.appendChild(div_main);

    // Создаем объект и возвращаем его со всеми выводными данными
    let result = {
        n: matrix.length,
        eigenvalue: lambda,
        eigenvector: y,
        AllX: AllX,
        iter: iterations
    };
	
    return result;
}
function Vector (arr){
    let arrNew = [];
    for(var i = 0; i<arr.length; i++){
        arrNew[i] = arr[i].toFixed(3);
    }
	
    return arrNew;
}

function scalarProducts(matrix, e) {

    // Создадим массив для хранения X, чтобы с его помощью 
    // в дальнейшем решить полную проблему
    let AllX = [];

    // Получаем транспонированную матрицу для ур-я y^(i+1) = A'y^(i)
    let transpMatrix = transpose(matrix);
    
    // Определяем массивы X и Y c индексами i+1 и i
    let currentX, lastX = [];
    let currentY, lastY = [];

    // Заполняем массивы Х и Y с индексом 0, начальное приближение
    for (let i = 0; i < matrix.length; i++) {
        lastX[i] = 1;
        lastY[i] = 1;
    }
    AllX.push(lastX);

    let iterations = 0;
    let deviation, currentLambda, lastLambda = 0;
    let output = document.getElementById("output");
    var div_main = document.createDocumentFragment();
    var div = document.createElement('div');
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение частной проблемы:";
    div_main.appendChild(h2);
    
    do {
        iterations++;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Итерация: ' + iterations + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        
        // Находим Х и Y с индексом i+1, при первом проходе с индексом 1
        currentX = multiplyMatrixByVector(matrix, lastX);
        currentY = multiplyMatrixByVector(transpMatrix, lastY);
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'X: ' +'[' + currentX + ']'+ "</font>" + '</br>' +
        "<font size=5>" + 'Y: ' +'[' + currentY + ']'+ "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        
        // Добавим массив Х в массив с массивами :)
        AllX.push(currentX);
        
        // Cчитаем значение лямбда и переменных
        // для скалярных произведений векторов x и у
        let a, b;
        a = scalarProductOfVectors(currentX, lastY);
        b = scalarProductOfVectors(lastX, lastY);
        currentLambda = a/b;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'λ'+'<sub>'+ iterations +'</sub>'+': ' + currentLambda.toFixed(3) + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        
        //Найдем разность между элементами лямбда
        deviation = currentLambda - lastLambda;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Δλ: ' + deviation.toFixed(3) + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);

        // Обновляем переменные предыдущего Х,Y и лямбда
        lastX = currentX;
        lastY = currentY;
        lastLambda = currentLambda;
        
    } while (deviation >= e);

    // Находим ||х||
    let arrX = [];
    for (let i = 0; i < currentX.length; i++) {
        arrX[i] = Math.abs(currentX[i]);
    }
    numX = Math.max(...arrX);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + '||х||: ' + numX.toFixed(3) + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    // Находим y - собственный вектор
    let y = [];
    for (let i = 0; i < currentX.length; i++) {
        y[i] = currentX[i]/numX;
    }
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Собственный вектор: ' +'['+ Vector(y) + ']'+ "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    // Создаем объект и возвращаем его со всеми выводными данными
    let result = {
        n: matrix.length,
        eigenvalue: currentLambda,
        eigenvector: y,
        AllX: AllX,
        iter: iterations
    };

    output.appendChild(div_main);

    return result;
    
}

function Krylov(obj, e) {

    // Объявим и найдем вектор b и матрицу А для решения полной проблемы
    let vectorB, matrixA = [];
    
    // Элементы Х получим из решения частичной проблемы
    for (let i = obj.n; i >= 0; i--) {
        if (i == obj.n) {
            vectorB = obj.AllX[obj.n];
        }else{
            matrixA.push(obj.AllX[i]);
        }
    }
    // Транспонируем полученную матрицу из-за особенностей
    // устройства массивов в js \[T]/
    matrixA = transpose(matrixA);

    // Решим полученную систему с помощью метода квадратных корней,
    // которую мы реализовали в лабораторной номер 5
    let x = squareRoots(matrixA, vectorB);
    
    // Составляем и решаем получившееся уравнение
    // методом половинного деления
    let lambda = solveEquation(x);
    
    // Находим собственные вектора по формулам
    let y = [];
    for (let i = 0; i < lambda.length; i++) {
        let arr = [];
        for (let j = 0; j < lambda.length; j++) {
            if (0 == j) arr[j] = 1;
            else arr[j] = (+arr[j-1]) * (+lambda[i]) - (+x[j-1]);
        }  
        var array;
        for (let k = 0, n = arr.length; k < arr.length; k++, n--) {
            if (0 == k) array = multiplyVectorByNumber(obj.AllX[n-1], arr[k]);
            else{
                let vec = multiplyVectorByNumber(obj.AllX[n-1], arr[k]);
                array = addVectors(vec, array); 
            }  
        }
        
        // Нормируем вектора
        let norm = 0;
        for (let l = 0; l < array.length; l++) {
            norm += Math.pow(array[l], 2);
        }
        norm = Math.sqrt(norm);
        for (let k = 0; k < array.length; k++) {
            array[k] = array[k]/norm;
        }
        y.push(array);
    }
    
    let result = {
        y:y,
        lambda:lambda
    };

    var output = document.getElementById("output");
    var div_main = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение полной проблемы:";
    div_main.appendChild(h2);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Система вида Ax=b для решения полной проблемы: ' + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица A: ' + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.appendChild(Step(matrixA));
    div.appendChild(table);
    div_main.appendChild(div);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Вектор b: ' +'[' + Vector(vectorB) + ']'+ "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Решение системы: ' +'[' + Vector(x) + ']'+ "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Корни харктеристического уравнения: '+ "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    for(var i = 0; i<lambda.length; i++){
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>"+ "λ"+'<sub>' + (i+1)+'</sub>' + '=' + lambda[i].toFixed(3) +"</font>" + '</br>';
        div.appendChild(p);
        div_main.appendChild(p);
    }
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Собственные вектора:' + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    for(var i = 0; i<y.length; i++){
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>"+ "y"+'<sub>' + (i+1)+'</sub>' + '=' + '[' + Vector(y[i]) + ']'+"</font>" + '</br>';
        div.appendChild(p);
        div_main.appendChild(p);
    }
    output.appendChild(div_main);

    return result;
}
function simpleForKrylov(matrix, e){
    let AllX = [];
    let currentX, lastX = [];
    for (let i = 0; i < matrix.length; i++) {
        lastX[i] = 1;
    }
    AllX.push(lastX);
    let iterations = 0;
    let deviation, lambda;
    do {
        iterations++;
        currentX = multiplyMatrixByVector(matrix, lastX);
        AllX.push(currentX);
        lambda = [];
        for (let i = 0; i < lastX.length; i++) {
            lambda[i] = currentX[i]/lastX[i];
        }
        lastX = currentX;
        deviation = Math.max(...lambda) - Math.min(...lambda);
    } while (deviation >= e);
    let summ = 0;
    for (let i = 0; i < lambda.length; i++) {
        summ += lambda[i];
    }
    lambda = Math.abs(summ/lambda.length);
    let arrX = [];
    for (let i = 0; i < currentX.length; i++) {
        arrX[i] = Math.abs(currentX[i]);
    }
    numX = Math.max(...arrX);
    let y = [];
    for (let i = 0; i < currentX.length; i++) {
        y[i] = currentX[i]/numX;
    }
    let result = {
        n: matrix.length,
        eigenvalue: lambda,
        eigenvector: y,
        AllX: AllX,
        iter: iterations
    };
    return result;
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

function Danilevsky(matrix, e) {
    document.getElementById('div_eps').style.display = 'none';
    
    // Находим вспомогательные матрицы и получаем матрицу Данилевского
    let Ms = [];
    for (let i = (matrix.length-2); i >= 0 ; i--) {
        
        let m1 = getDanilevskyMatrix(matrix, i);
        Ms.push(m1);
        let m2 = inverseMatrix(m1);
        
        matrix = multiplyMatrices(matrix, m1);
        matrix = multiplyMatrices(m2, matrix);
    }
    // Округляем значения из-за погрешности вычислений в 0.0000000000001
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            matrix[i][j] = Math.round(matrix[i][j]);
        }
    }
    var output = document.getElementById("output");
    var div_main = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение полной проблемы:";
    div_main.appendChild(h2);

    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Матрица:' + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);

    var div = document.createElement('div');
    var table = document.createElement('table');
    table.appendChild(Step(matrix));
    div.appendChild(table);
    div_main.appendChild(div);

    // Находим корни уравнения
    let x = matrix[0];
    let lambda = solveEquation(x);

    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'Корни характеристического уравнения:' + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    for(var i = 0; i<lambda.length; i++){
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>"+ "λ"+'<sub>' + (i+1)+'</sub>' + '=' +  lambda[i].toFixed(3) + "</font>" + '</br>';
        div.appendChild(p);
        div_main.appendChild(p);

    }
    // Считаем собственные вектора
    let y = [];

    for (let i = 0; i < matrix.length; i++) {
        let arr = [];
        for (let j = 0; j < matrix.length; j++) {
            arr.unshift(Math.pow(lambda[i], j));
        }
        y.push(arr);
    }

    for (let j = 0; j < matrix.length; j++) {
        let X;
        for (let i = (matrix.length-2); i >= 0 ; i--) {
            y[j] = multiplyMatrixByVector(Ms[i], y[j]);
        }
    }
    for(var i = 0; i<y.length; i++){
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>"+ "y"+'<sub>' + (i+1)+'</sub>' + '=' + '[' + Vector(y[i]) + ']'+"</font>" + '</br>';
        div.appendChild(p);
        div_main.appendChild(p);
    }
    let result = {
        y:y,
        lambda:lambda
    };
    output.appendChild(div_main);
    return result;

}

function getDanilevskyMatrix(matrix, k) {
    
    let m = [];

    // Создаем единичную матрицу для удобства заполнения
    for (let i = 0; i < matrix.length; i++) {
        let arr = [];
        for (let j = 0; j < matrix.length; j++) {
            if (i == j) {
                arr[j] = 1;
            }else{
                arr[j] = 0;
            }
        }
        m.push(arr);
    }
    
    // Изменяем элементы единичной матрицы по формулам
    for (let j = 0; j < matrix.length; j++) {
        if (k == j) {
            m[k][k] = 1/matrix[k+1][k];
        }else{
            m[k][j] = - (matrix[k+1][j]/matrix[k+1][k]);
        }
    }
    
    return m;
}

function solveEquation(arr,a = - 500, b = 500, e = 0.001) {
        
    //Зададим интервал поиска [a, b]
    let equation = [];
    let degree = +arr.length;
    
    // Заполним массив коэффициентов уравнения
    for (let i = 0; i <= arr.length; i++) {
        if (i == 0) equation[i] = 1;
        else equation[i] = -Math.round(+arr[i-1]);
    }

    // Найдем корень уравнения
    let c, S;
    let iter = 0;
    let x = [];
    // Разбиваем отрезок на 500 частей
    for (let i = 1; i < 500; i++) {
        let A, B, l;
        A = a+i*(b-a)/500;
        B = a+(i+1)*(b-a)/500;
        // Проверяем находятся ли нули на интервале
        let f1, f2;
        f1 = getEquationValue(equation, A, degree);
        f2 = getEquationValue(equation, B, degree);
        if ( f1*f2 > 0) continue;
        
        // Метод Ньютона
        do {
            iter++;
            c = (A+B)/2;
            f1 = getEquationValue(equation, A, degree);
            f2 = getEquationValue(equation, c, degree);
            S  = f1*f2; 
            if (S<0) B = c;
            else A = c;
            l = (B-A)/2;
            if (iter>1000) break;
        } while (!(l < e));
        x.push(c);
    }
    
    return x;

}

function getEquationValue(arr, num, degree) {
    
    // Подставить в уравнение число и найти значение
    let summ = 0;
    
    for (let i = 0, j = degree; i <= degree; i++, j--) {
        summ += arr[i] * Math.pow(num , j);
    }
    
    return summ;
}

function adjugateMatrix(A) {
    
    let N = A.length, adjA = [];
    
    for (let i = 0; i < N; i++){ 
        
        adjA[i] = [];
        
        for (let j = 0; j < N; j++){ 
            
            let B = [], sign = ((i+j) % 2 == 0) ? 1 : -1;
            
            for (let m = 0; m < j; m++){ 
                B[m] = [];
                for (let n = 0; n < i; n++)   B[m][n] = A[m][n];
                for (let n = i+1; n < N; n++) B[m][n-1] = A[m][n];
            }
            
            for (let m = j+1; m < N; m++){ 
                B[m-1] = [];
                for (let n = 0; n < i; n++)   B[m-1][n] = A[m][n];
                for (let n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
            }
            adjA[i][j] = sign * determinant(B);
        }
    }
    return adjA;
}

function determinant(A) {
  
    let N = A.length, B = [], denom = 1, exchanges = 0;
    
    for (let i = 0; i < N; ++i){ 
        
        B[ i ] = [];
        for (let j = 0; j < N; ++j){
            B[ i ][j] = A[ i ][j];
        }
    }
    
    for (let i = 0; i < N-1; ++i){ 
        
        let maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       
        for (let j = i+1; j < N; ++j){ 
            let value = Math.abs(B[j][ i ]);
            if (value > maxValue){ maxN = j; maxValue = value; }
        }
        if (maxN > i)
        { let temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
        else { if (maxValue == 0) return maxValue; }
        
        let value1 = B[ i ][ i ];
        
        for (let j = i+1; j < N; ++j){
            let value2 = B[j][ i ];
            B[j][ i ] = 0;
            for (let k = i+1; k < N; ++k){
                B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
            }   
        } 
        denom = value1;
    }
    
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function inverseMatrix(A) {   
        
    let det = determinant(A);                
    if (det == 0) return false;
        
    let N = A.length;
    A = adjugateMatrix(A);       
    for (let i = 0; i < N; i++){  
        for (let j = 0; j < N; j++) 
            A[i][j] /= det; 
    }
        
    return A;
}

function squareRoots (matrix, b) {
    
    let matrTrans = transpose(matrix);
    let modMatrix =  multiplyMatrices(matrTrans, matrix);
    let modB = multiplyMatrixByVector(matrTrans, b);

    let t = [];
    
    for (let i = 0; i < modMatrix.length; i++) {
        let arr = [];
        for (let j = 0; j < modMatrix[i].length; j++) {
            if (i == 0 && j == 0) {
                arr[j] = Math.sqrt(modMatrix[i][j]);
            }else if (i>j) {
                arr[j] = 0;
            }else if (i == 0) {
                arr[j] = modMatrix[i][j]/arr[i];
            }else if (i == j) {        
                let summ = 0;
                for (let k = 0; k <= i-1; k++) {
                    summ += Math.pow(t[k][i], 2);
                }
                arr[j] = Math.sqrt(modMatrix[i][i] - summ);
            }else{
                let summ = 0;
                for (let k = 0; k <= i-1; k++) {
                    summ += t[k][i] * t[k][j];
                }
                arr[j] = (modMatrix[i][j] - summ)/arr[i];
            }
        }
        t.push(arr);
    }

    let y = [];

    for (let i = 0; i < b.length; i++) {
        if (i==0) {
            y[0] = modB[0]/t[0][0];
        }else{
            let summ = 0;
            for (let k = 0; k <= i-1; k++) {
                summ += t[k][i] * y[k];
            }
            y[i] = (modB[i] - summ)/t[i][i];
        }
    }
    
    let x = [];

    for (let i = b.length-1; i >= 0; i--) {
        if (i == (b.length-1)) {
            x[i] = y[i]/t[i][i];
        }else{
            let summ = 0;
            for (let k = i+1; k < b.length; k++) {
                summ += t[i][k] * x[k];
            }
            x[i] = (y[i] - summ)/t[i][i];
        }
    }

    return x;
}

function scalarProductOfVectors(vector1, vector2) {
    
    if (vector1.length != vector2.length) return false;

    let scalarProduct = 0;

    for (let i = 0; i < vector1.length; i++) {
        scalarProduct += vector1[i] * vector2[i];
    }

    return scalarProduct;
}

function transpose(matrix) {
   
    const rows = matrix.length, cols = matrix[0].length;
    const grid = [];
   
    for (let j = 0; j < cols; j++) {
      grid[j] = Array(rows);
    }
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[j][i] = matrix[i][j];
      }
    }
    
    return grid;
}

function divideVectorByNumber(vector, number) {
    
    let C = [];

    for (let i = 0; i < vector.length; i++) {
        C[i] = vector[i]/number;
    }

    return C;
}

function multiplyVectorByNumber(vector, number) {
    
    let C = [];

    for (let i = 0; i < vector.length; i++) {
        C[i] = vector[i]*number;
    }

    return C;
}

function multiplyMatrixByVector(matrix, vector) {
    
    let C = [];
  
    for (let i = 0; i < matrix.length; i++) {
        let summ = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            summ +=matrix[i][j] * vector[j];
        }
        C[i] = summ;
    }
    return C;
}

function multiplyMatrices(m1, m2) {

    let result = [];
    
    for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    
    return result;
}

function addVectors(vector1, vector2) {
    let C = [];

    for (let i = 0; i < vector1.length; i++) {
        C[i] = (+vector1[i]) + (+vector2[i]);
    }

    return C;
}

function selectFilling(select) {
    
    for (let k = 3; k <= 10; k++) {
        let option = document.createElement('option');
        option.innerHTML = k;
        option.value = k;
        select.append(option);
    }
}

function getMatrix(row, col) {
    
    let arrValue = [];
    
    for(let i = 1; i <= row; i++){
        let arr = [];
        for(let j = 1; j <= col; j++){
            let valueInput = document.getElementById(i + "" + j);   
            arr.push(valueInput.value);
        }
        arrValue.push(arr);
    }
    return arrValue;
}
