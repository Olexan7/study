window.onload = function(){
    let select_m = document.getElementById("x");
    let select_n = document.getElementById("y");
    selectFilling_M(select_m);
    selectFilling_N(select_n)
}

function selectFilling_N(select) {
    for (let k = 0; k < 20; k++) {
        let option = document.createElement('option');
        option.innerHTML = k+1;
        option.value = k+1;
        select.appendChild(option);
    }
    select.value = 5;
}

function selectFilling_M(select) {
  for (let k = 0; k < 20; k++) {
      let option = document.createElement('option');
      option.innerHTML = k+1;
      option.value = k+1;
      select.appendChild(option);
  }
  select.value = 5;
}
var exam = [[2,1,3,2,90],[2,3,3,1,70],[3,3,2,1,50],[80,60,40,30]]

function generateForms(check){
    document.getElementById('equations').innerHTML = '';
    let obj = getBalance();
    let eq = document.createDocumentFragment();
    let sizeRow = parseInt(document.getElementById("x").value)+2;
    let sizeCell = parseInt(document.getElementById("y").value)+2;
    var table = document.createElement('table');
    for (var i = 0; i < sizeRow; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < sizeCell; j++) {
        if (i == 0 ) {
          var th = document.createElement('th');
          if (j != 0) th.innerHTML = 'α'+'<sub>'+j+'</sub>';
          if (j == sizeCell-1) th.innerHTML = "Запасы";
          tr.appendChild(th);
        }else {
          var td = document.createElement('td');
          if (j == 0) {
            td.id = "Y"
            if (i != 0) td.innerHTML = 'A'+'<sub>'+i+'</sub>';;
            if (i == sizeRow - 1) td.innerHTML = "Потребности";
          }else if (j != sizeCell-1 || i != sizeRow-1) {
            var input = document.createElement('input');
            input.type = "text";
            if(check ==2){
                input.value = getRandomNew();
            }
            else if(check ==1){
                //NOPE
            }
            else if(check ==3){
                input.value = exam[i-1][j-1];
            }
            else if(check ==4){
                if((i==sizeRow-1)&& j!=0){
                    input.value = obj.arr_col[j-1];
                }
                else if((j==sizeCell-1)&& i!=0){
                    input.value = obj.arr_row[i-1];
                }
                else{
                    input.value = getRandomNew();
                }
            }
            td.appendChild(input);
          }
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    eq.appendChild(table);
    document.getElementById('equations').appendChild(eq);
    document.getElementById("calc").style.display = 'block';
}

function getRandom(){
    let min = 1;
    let max = 101;
    return Math.floor(Math.random()*(max-min))+min;
}
function getRandomNew(){
    let min = 0;
    let max = 30;
    return Math.floor(Math.random()*(max-min))+min;
}

function tableMatrix(){
    var table = document.getElementById('equations');
    var th = table.querySelectorAll('th');
    var tr = table.querySelectorAll('tr');
    var td = table.querySelectorAll('td');
    let sizeRow = tr.length;
    let sizeCell = th.length;
    let arr = [];
    for (var i = 0; i < sizeRow; i++) {
      arr[i] = [];
      for (var j = 0; j < sizeCell; j++) {
        let k = j+(i-1)*sizeCell;
        if (i == 0 ) {
          arr[i][j] = th[j].innerHTML;
        }else{
          if(j == 0 || (j == sizeCell-1 && i == sizeRow-1)){
            arr[i][j] = td[k].innerHTML;
          }else  {
            let input = td[k].querySelector('input');
              arr[i][j] = Number(input.value);
            }
        }
      }
    }
    return arr;      
}

function decision(){
    let arr = tableMatrix();
    document.getElementById('step').innerHTML = '';
    var div_main = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);

    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>Начальная таблица:</font>";
    div.appendChild(p);
    div_main.appendChild(div);
    var table = document.createElement('table');
    table.appendChild(conversionStep(arr));
    div_main.appendChild(table);
    let obj = conditionOfSolvability(arr);
    if(obj.check){
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>Задача сбалансирована:" +obj.sum_needs +'=' +obj.sum_stocks +"</font>";
        div.appendChild(p);
        div_main.appendChild(div);
    }
    else{
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>Несбалансированная задача:" + obj.sum_needs +'≠' +obj.sum_stocks + "</font>";
        div.appendChild(p);
        div_main.appendChild(div);
        document.getElementById('step').appendChild(div_main);
        return false
    }
    let bas = basis(arr);
    console.log("Опорный план:", bas.plan, "f = ", bas.sum);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>Опорный план:</font>";
    div.appendChild(p);
    div_main.appendChild(div);
    var table = document.createElement('table');
    table.appendChild(conversionStep(bas.plan));
    div_main.appendChild(table);
    document.getElementById('step').appendChild(div_main);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>f = "+ bas.sum +"</font>";
    div.appendChild(p);
    div_main.appendChild(div);

    var bool = true;
    let iter = 0;
    while(bool){
        iter++;
        if(iter>100){
          throw new Error("stop");
        }
        let arr_ref;
        let elem = 0;
        do{
            elem++;
            arr_ref = optimal(arr, elem);
            console.log("Номер элемента для потенциалов:", elem);
        }while(arr_ref==0);
        if(arr_ref == 100){
          NewDecision()
        }

      p = document.createElement('p');
      p.innerHTML = "<font size = 5> Потенциалы u<sub>i</sub>, v<sub>j</sub>: </font>";
      div.appendChild(p);
      var table = document.createElement('table');
      table.appendChild(conversionStep(arr_ref));
      div.appendChild(table);
      let array = validate(arr_ref);
      //console.log(array);
      if (array.length != 0) {
        console.log("неоптим");
        p = document.createElement('p');
        let max = array[0];

        let def = 0;
        let def_max = 0;
        //let def_max = 1000;  //for min tarif

        for (let k = 0; k < array.length; k++) {
          def = arr_ref[array[k].i][0] + arr_ref[0][array[k].j] - array[k].value;
          if (def_max < def) {
            def_max = def;
            max = array[k];
          }
          p.innerHTML += "<font size = 5>("+array[k].i+","+array[k].j+"): "+ arr_ref[array[k].i][0]+"+" +arr_ref[0][array[k].j]+">"+array[k].value + "    :     |"+ array[k].value +"-"+ "(" + arr_ref[array[k].i][0]+"+" +arr_ref[0][array[k].j]+")| = "+ def +'</font><br>';
        }
        p.innerHTML += "<font size = 5>Максимальная по модулю оценка свободной клетки (" + max.i +"," + max.j + "): " + max.value + "</font>";
        div.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = "<font size = 5> Неоптимальный план </font>";
        div.appendChild(p);
        var table = document.createElement('table');
        let check = permutation(arr,max);
        table.appendChild(conversionStep(check));
        div.appendChild(table); 
      }
      else {
        console.log("оптим");
        p = document.createElement('p');
        p.innerHTML = "<font size = 5>Все потенциалы свободных клеток удовлетворяют условию u<sub>i</sub> + v<sub>j</sub> ≤ c<sub>ij</sub>. План оптимальный</font>";
        div.appendChild(p);
        let sum = 0;
        p = document.createElement('p');
        for (let i = 1; i < arr.length; i++) {
          for (let j = 1; j < arr[0].length; j++) {
            if (arr[i][j].toString().indexOf("[") != -1) {
                let a = parseInt(arr[i][j]);
                let b = parseInt(arr[i][j].substr(arr[i][j].toString().indexOf("[")+1));
                sum += a*b;
            }
          }
        }
        p.innerHTML = "<font size = 5> Минимальные затраты: f = " + sum + "</font>";
        div.appendChild(p);
        bool = false;
    }
  }
  div_main.appendChild(div);
  document.getElementById('step').appendChild(div_main);
}

function optimal(arr, elem){
    let arr_ref = [];
    for (let i = 0; i < arr.length-1; i++) {
        arr_ref[i]=[];
        for (let j = 0; j < arr[1].length-1; j++) {
            if (i != 0 && j !=0) arr_ref[i][j] = arr[i][j];
            else arr_ref[i][j] = null;
        }
    }
    arr_ref[elem][0] = 0;

    var blank = true;
    let iter = 0;
    while(blank || iter>21){
        iter++;
        for (let i = 1; i < arr_ref.length; i++) {
            for (let j = 1; j < arr_ref[0].length; j++) {
                if (arr_ref[i][j].toString().indexOf("[") != -1) {
                    if (arr_ref[i][0] != null) {
                        arr_ref[0][j] = parseInt(arr_ref[i][j]) - arr_ref[i][0];
                    }
                    else if (arr_ref[0][j] != null){
                        arr_ref[i][0] = parseInt(arr_ref[i][j]) - arr_ref[0][j];
                    }
                }
            }
        }
        let count = 0;
        for (let i = 1; i < arr_ref.length; i++) {
            if (arr_ref[i][0] == null) count++;
        }
        for (let i = 1; i < arr_ref[0].length; i++) {
            if (arr_ref[0][i] == null) count++;
        }
        if (count == 0) blank = false;
        console.log("optimal iter ", iter, "arr_ref", arr_ref);
        if(iter>21){
            return 0;
        }
        if(iter>100){
          return 100;
        }
    }
    return arr_ref;
}
function permutation(arr, max){
  console.log("----------------------");
  console.log("arr",arr,"max", max);
    let array = [];
    max.sign = "+";
    array.push(max);
    for (let i = 1; i < arr.length; i++) {
      for (let j = 1; j < arr[0].length; j++) {
        if (arr[i][j].toString().indexOf("[") != -1) {
          let elem = {i: i, j: j, value: parseInt(arr[i][j]), delivery: parseInt(arr[i][j].substr(arr[i][j].toString().indexOf("[")+1))};
          array.push(elem);
        }
      }
    }
    console.log(array);
    let iter =0;
    do{
        iter++;
        for (let i = 1; i < arr.length; i++) {
            let count = 0;
            for (let j = 0; j < array.length; j++) {
                if (array[j].i == i) {
                  count++
                }
            }
            if (count < 2) {
                array = array.filter(n => n.i !== i)
            }
        }
        for (let i = 1; i < arr[0].length; i++) {
            let count = 0;
            for (let j = 0; j < array.length; j++) {
                if (array[j].j == i) {count++}
            }
            if (count < 2) {
                array = array.filter(n => n.j !== i)
            }
        }
        if(iter>100){
            throw new Error("stop");
        }
    }while(iter<80);
    max.delivery = 0;
    iter = 0;
    let el_i = array[0].i;
    let el_j = array[0].j;
    let num = 0;
    let check = 'i';
    let all = 0;
    do{
      if(check == 'i'){
        for(let j = 1; j<array.length; j++){
          if(el_i==array[j].i && num!=j && all ==0){
            if (array[num].sign == "+") {
              array[j].sign = "-";
            }
            else if (array[num].sign == "-") {
              array[j].sign = "+";
            }
            el_j = array[j].j;
            num = j;
            all++;
          }
        }
        all = 0;
        check = 'j';
      }
      else if(check == 'j'){
        for(let j = 1; j<array.length; j++){
          if(el_j==array[j].j && num!=j && all == 0){
            if (array[num].sign == "+") {
              array[j].sign = "-";
            }
            else if (array[num].sign == "-") {
              array[j].sign = "+";
            }
            el_i = array[j].i;
            num = j;
            all++;
          }
        }
        all = 0;
        check = 'i';
      }
      iter++;
    }
    while(iter<array.length);
  
    let min = array[1].delivery;
    for (let i = 1; i < array.length; i++) {
      if (array[i].sign == "-" && min > array[i].delivery) min = array[i].delivery;
    }
  
   for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        for (let k = 0; k < array.length; k++) {
          if (array[k].i == i && array[k].j == j) {
            if (array[k].sign == "+") {
              array[k].delivery += min;
            }else{
              array[k].delivery -= min;
            }
          }
        }
      }
    }
    console.log(array);
    let one = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        for (let k = 0; k < array.length; k++) {
          if (array[k].i == i && array[k].j == j) {
            if (array[k].delivery == 0 && one ==0){
              console.log("2: ",array[k]);
              arr[i][j] = parseInt(arr[i][j]);
              //one++;
            }             
            else{
              console.log("3: ",array[k]);
              arr[i][j] = parseInt(arr[i][j]) + "[" + array[k].delivery + "]";
            }
          }
        }
      }
    }
      
    return arr;
}

function validate(arr_ref){
    let arr = [];
    for (let i = 1; i < arr_ref.length; i++) {
      for (let j = 1; j < arr_ref[0].length; j++) {
        if (arr_ref[i][j].toString().indexOf("[") == -1) {
          if (arr_ref[i][j] < arr_ref[0][j]+arr_ref[i][0]) {
            let elem = {i: i, j: j, value: arr_ref[i][j]};
            arr.push(elem);
          }
        }
      }
    }
    return arr;
}
function basis(arr){
    let count = arr.length + arr[0].length - 5;
    let arr_reference = [];
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    let min_i = 0;
    let min_j = 0;
    for (let i = 1; i < number_rows+1; i++) {
      arr_reference[i] = [];
      for (let j = 1; j < number_columns+1; j++) {
        if ((i == number_rows || j == number_columns) && (i != number_rows || j != number_columns)) {
          arr_reference[i][j] = arr[i][j];
        }
      }
    }
    
    arr_reference = newproblem(arr);
    let sum_arr = sumArray(arr, arr_reference);
    let plan = basicPlan(arr, arr_reference);

    let obj = {plan:plan, sum:sum_arr};
    return obj;
}

function newproblem(arr){
    let arr_reference = [];
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    for (let i = 1; i < number_rows+1; i++) {
      arr_reference[i] = [];
      for (let j = 1; j < number_columns+1; j++) {
        if ((i == number_rows || j == number_columns) && (i != number_rows || j != number_columns)) {
          arr_reference[i][j] = arr[i][j];
        }
      }
    }
    let el = Min_El(arr, arr_reference, 0, 0); //шаг1
    let arr_i = el.arr_i;
    let arr_j = el.arr_j;
    let min_i = arr_i;
    let min_j = arr_j;
    let check_a = 0;
    let check_b = 0;
    let iter = 0;
    //console.log(el);
    do{
        check_a = 0;
        check_b = 0;
        iter++;
        //console.log("iter",iter);

        arr_reference = CalcDiff(arr, arr_reference,arr_i, arr_j); //шаг2, шаг3

        if(arr_reference[arr_i][number_columns] == 0){ //шаг4
          check_a = CheackA(arr_reference, number_rows, number_columns);
            if(check_a == 1){
              return arr_reference;
            }
            else{
              el = Min_El(arr, arr_reference, 0, arr_j); //шаг8
              //console.log(el);
              arr_i = el.arr_i;
              arr_j = el.arr_j;
            }
        }
        else{
          check_b = CheackA(arr_reference, number_rows, number_columns); //шаг5
          if(check_b == 1){
            return arr_reference;
          }
          else{
            el = Min_El(arr, arr_reference, arr_i, 0); //шаг6
            arr_i = el.arr_i;
            arr_j = el.arr_j;
          }
        }
        if(iter>50){
            throw new Error ("stop");
        }
    } while(1);
}

function CheackA(arr_reference, number_rows, number_columns){
  let check_a = 0;
  for(let h = 1; h < number_columns; h++){ // шаг7
    if(arr_reference[h][number_columns]==0){
        check_a++;
    }
  }
  if(check_a == (number_rows-1)){
    return 1;
  }
  else{
    return 0;
  }
}

function CheackB(arr_reference, number_rows, number_columns){
  let check_b = 0;
  for(let h = 1; h < number_columns; h++){ //шаг5
    if(arr_reference[number_rows][h]==0){
        check_b++;
    }
  }
  if(check_b == (number_columns-1)){
    return 1;
  }
  else{
    return 0
  }
}

function CalcDiff(arr, arr_reference,arr_i, arr_j){
  let diff = Min_X(arr, arr_reference, arr_i, arr_j);
  let number_rows = arr.length-1;
  let number_columns = arr[0].length-1;
  arr_reference[arr_i][number_columns] -= diff;
  arr_reference[number_rows][arr_j] -= diff;
  arr_reference[arr_i][arr_j] = diff;
  return arr_reference;
}

function Min_El(arr, arr_reference, arr_i, arr_j){
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;

    if(arr_i==0 && arr_j==0){
        let arr_min = 1000;
        let arr_i = number_rows;
        let arr_j = number_columns;
        for (let i = 1 ; i < number_rows; i++) {
            for (let j = 1 ; j < number_columns; j++) {
                if (arr[i][j] < arr_min) { 
                    arr_i = i;
                    arr_j = j;
                    arr_min = arr[i][j];
                }
            }
        }
        let el = {arr_i:arr_i, arr_j:arr_j};
        return el;
    }
    else if(arr_i!=0 && arr_j==0){
        let arr_min = 1000;
        let arr_j = number_columns;
        for (let j = 1 ; j < number_columns; j++) {
            if (arr[arr_i][j] < arr_min && arr_reference[number_rows][j] != 0) {
              arr_j = j;
              arr_min = arr[arr_i][j];
            }
        }
        let el = {arr_i:arr_i, arr_j:arr_j};
        return el;
    }
    else if(arr_i==0 && arr_j!=0){
        let arr_min = 1000;
        let arr_i = number_rows;
        for (let i = 1 ; i < number_rows; i++) {
            if (arr[i][arr_j] < arr_min && arr_reference[i][number_columns] != 0) { 
                arr_i = i;
                arr_min = arr[i][arr_j];
            }
        }
        let el = {arr_i:arr_i, arr_j:arr_j};
        return el;
    }
}

function Min_X(arr, arr_reference, arr_i, arr_j){
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    let diff = 0;
    if (arr_reference[number_rows][arr_j] < arr_reference[arr_i][number_columns]) {
        diff = arr_reference[number_rows][arr_j];
    }else{
        diff = arr_reference[arr_i][number_columns];
    }
    return diff;
}

function transportationProblem(arr,arr_reference){
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    let arr_min = 1000;
    let arr_i = number_rows;
    let arr_j = number_columns;
    let zero = 0;
    for (let i = 1 ; i < number_rows; i++) {
      for (let j = 1 ; j < number_columns; j++) {
        if (arr[i][j] < arr_min && arr_reference[i][j] == null && arr_reference[number_rows][j] != 0 && arr_reference[i][number_columns] != 0 ) { 
            arr_i = i;
            arr_j = j;
            arr_min = arr[i][j];
        }
      }
    }
    let diff;
    if (arr_reference[number_rows][arr_j] < arr_reference[arr_i][number_columns]) {
        diff = arr_reference[number_rows][arr_j];
    }else{
        diff = arr_reference[arr_i][number_columns];
    }
    arr_reference[arr_i][number_columns] -= diff;
    arr_reference[number_rows][arr_j] -= diff;
    arr_reference[arr_i][arr_j] = diff;
    return arr_reference;
}

function basicPlan(arr, arr_reference){
    let iter = 0;
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    for (let i = 1; i < number_rows; i++) {
      for (let j = 1; j < number_columns; j++) {
        if (arr_reference[i][j] != null){
             arr[i][j] = parseInt(arr[i][j]) + "["+arr_reference[i][j]+"]";
            iter++;
        }
        else if (arr_reference[i][j] == null && arr[i][j].toString().indexOf("[") != -1) {arr[i][j] = arr[i][j]}
      }
    }
    return arr;
}
function conversionStep(arr){
    let table = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
      for(let j = 0; j < arr[i].length; j++) {
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

function conditionOfSolvability(arr){
    let sum_stocks = 0;
    let sum_needs = 0;
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    for (let i = 1; i < number_rows; i++) {
      sum_stocks += arr[i][number_columns];
    }
    for (let i = 1; i < number_columns; i++) {
      sum_needs += arr[number_rows][i];
    }
    let check = (sum_needs == sum_stocks);
    obj = {sum_needs:sum_needs, sum_stocks:sum_stocks, check:check};
    return obj;
}
function sumArray(arr, arr_reference){
    let number_rows = arr.length-1;
    let number_columns = arr[0].length-1;
    let sum_arr = 0;
    for(let i=1; i<number_rows+1; i++){
        for(let j = 1; j< number_columns+1; j++){
            if(arr_reference[i][j]>0){
                sum_arr += arr[i][j]*arr_reference[i][j];
            }
        }
    }
    return sum_arr;
}
function getBalance(){
    let sizeRow = parseInt(document.getElementById("x").value);
    let sizeCell = parseInt(document.getElementById("y").value);
    let arr_row=[];
    let arr_col = [];
    let sum1 = 0; 
    let sum2 = 0;
    let iter = 0;
    do{
        iter++;
        sum1 = 0;
        sum2 = 0;
        for(let i=0; i<sizeRow; i++){
            arr_row[i] = getRandom();
            sum1 += arr_row[i];
        }
        for(let i=0; i<sizeCell; i++){
            arr_col[i] = getRandom();
            sum2 += arr_col[i];
        }
    }while(sum1!=sum2);
    let obj = {arr_row:arr_row, arr_col:arr_col};
    return obj;
}
