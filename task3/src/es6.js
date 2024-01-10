"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    fio = fio.split(" ");
    return `${fio[1]} ${fio[0]}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return [...new Set(array)];
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    return array.length === 0 ? false : array.reduce((acc,item) => acc < item ? item : acc,0) / Math.min(...array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor(){
        this.dict = new Map();
    }
    add(key, value){
        if(typeof(key) === 'string' && typeof(value) === 'string'){
            this.dict.set(key.toLowerCase(), value.toLowerCase());
        }
        else console.log('Keys and Values must be String');
    }
    getValue(key){
        if(typeof(key) === 'string' && this.dict.has(key.toLowerCase())) {
            return this.dict.get(key.toLowerCase());
        }
        else return"No Such Key";
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
