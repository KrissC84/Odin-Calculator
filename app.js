//
let numbers =document.querySelector(".numbers");

//additional counter to set numeric buttons 
let num = 11;

// creating numbers buttons
for (let i = 0 ; i<4; i++) {
    let row = document.createElement('div');
    row.className=`row${i}`
    num--;
    for (let j=0;j<3;j++){
        num--;
        if (num == -1 ) {break;}
        let item = document.createElement('button');
        item.className='button';
        item.id= num;
        item.textContent= num ;
        row.appendChild(item);}
        num++;
        numbers.appendChild(row);
        
}

let row_3 = document.querySelector('.row3');    
let operators =document.querySelector(".operators");
let operants = ['/','x','-','+','.','='];
for (let i of operants) {
    let item = document.createElement('button');
    item.className='button';
    item.id= i;
    item.textContent= i ;
    if (i =='.' || i == '=') {
        row_3.appendChild(item)} else {
    operators.appendChild(item);}
;}