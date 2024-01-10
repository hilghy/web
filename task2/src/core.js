//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return n === (n | 0)
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let res = Array(10)
    for(let i = 0; i < 10; ++i){
        res[i] = (1 + i) * 2
    }
    return res;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let res = 0
    for(let i = 0; i < n;){
        res += ++i
    }
    return res
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if(n) return n + recSumTo(n-1)
    return 0
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let res = 1
    for(let i = 1; i <= n; ++i){
        res *= i
    }
    return res
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    let s = n.toString(2)
    let digit = '1';
    let count = s.split(digit).length - 2;
    if(count) return false
    return true
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let a, b, c
    a = b = 1
    for(let i = 2; i < n; ++i){
        c = a
        a = b
        b = c + b
    }
    return b
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    function foo(val){
        if (operatorFn){
            res = operatorFn(initialValue, val)
            initialValue = res
            return res
        }
        return initialValue
    }
    return foo
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    function foo(){
        if (start === undefined) start = 0
        if (step === undefined) step = 1
        let temp = start
        start += step
        return temp
    }
    return foo
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (typeof firstObject !== 'object' || firstObject === null){
        if(isNaN(firstObject) && isNaN(secondObject)){
            return true
        }
        else return firstObject === secondObject
    }
    let equal = true;
    let firstData ='',
        secondData ='';
    if ((Object.keys(firstObject || {}).length != Object.keys(secondObject || {}).length)) return false;
    for(let key in firstObject){
        if (!(key in secondObject)) return false;
        if(typeof firstObject[key] === 'function'){
            firstData += firstObject[key].name;
            secondData += secondObject[key].name;
            equal = equal &&(firstData === secondData)
        }
        else if (typeof firstObject[key] !== 'object' && typeof firstObject[key] !== 'function' ){
            firstData += firstObject[key];
            secondData += secondObject[key];
            equal = equal &&(firstData === secondData)
        }
        else equal = equal && deepEqual(firstObject[key], secondObject[key]);
    }
        return equal;
}


module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
