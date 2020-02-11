function CalcTrapezion(f, a, b, m, eps){
    let h;
    let iter = 0;
    let sum = 0;
    let sum1 = 0;
    let I, two_I, two_m, two_h, eps_m;
    var div_main = document.createDocumentFragment();
    var h2 = document.createElement('h2');
    h2.innerHTML = "Решение:";
    div_main.appendChild(h2);
    do{
        sum = 0;
        sum1 = 0;
        h = (b-a)/m;
        iter++;
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = "<font size=5>" + 'Иттерация №: ' + iter + "</font>";
        div.appendChild(p);
        div_main.appendChild(p);
        for(let i=1; i < m ; i++){
            let xi = a + i*h;
            sum += h*f(xi);
        }
        let xm = a + m*h;
        I = ((f(a) + f(xm))/2)*h + sum;

        two_m = 2*m;
        two_h = (b-a)/two_m;
        for(let i=1; i < two_m ; i++){
            let xi = a + i*two_h;
            sum1 += two_h*f(xi);
        }
        xm = a + two_m*two_h;
        two_I = ((f(a) + f(xm))/2)*two_h + sum1;
        
        eps_m = Math.abs(I-two_I)/3;
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
