function  CalcSimpson(f, a, b, m, eps){
    let iter = 0;
    let I, two_I, two_m, h, two_h, eps_m;
    var div_main = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);
    do{
        iter++;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Иттерация №: ' + iter + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        let sum = 0;
        let sum1 = 0;
        let sum_two = 0;
        let sum_two1 = 0;

        h = (b-a)/m;
        
        for(let i=1; i < m ; i++){
            let xi = a + i*h;
            sum += (h/3)*f(xi);
        }
        for(let i=1; i < m ; i++){
            let xi = a + i*h;
            let check = parseFloat((xi+(h/2)));
            sum1 += (2*h/3)*f(check);
        }
        let xm = a + m*h;
        I = ((f(a) + f(xm))/6)*h + sum + sum1;

        two_m = 2*m;
        two_h = (b-a)/two_m;

        for(let i=1; i < two_m ; i++){
            let xi = a + i*two_h;
            sum_two += (two_h/3)*f(xi);
        }
        for(let i=1; i < two_m ; i++){
            let xi = a + i*two_h;
            let check = parseFloat((xi+(h/2)));
            sum_two1 += (2*two_h/3)*f(check);
        }
        xm = a + two_m*two_h;
        two_I = ((f(a) + f(xm))/6)*two_h + sum_two + sum_two1;

        eps_m = Math.abs(I-two_I)/15;
        m = two_m;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'I: ' + I.toFixed(3) + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'I'+'<sub>'+'m'+'</sub>'+': ' + two_I.toFixed(3) + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
    } while(!(eps_m <= eps));

    var h2 = document.createElement('h2');
    h2.innerHTML = "Ответ:";
    div_main.appendChild(h2);
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "<font size=5>" + 'I = ' + two_I.toFixed(3) +' ± '+ eps + "</font>";
    div.appendChild(p);
    div_main.appendChild(p);
    document.getElementById('answer').appendChild(div_main);
}