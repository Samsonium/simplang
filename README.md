# Simplang
Очень простой язык.

### Правила
1. В языке есть только операции сложения и вычитания.
2. Все переменные пишутся на кириллице с маленькой буквы. В названии переменной возможен символ "_".
3. Вывод в консоль осуществляется оператором "ЛОГ".
4. (Есть скобки!)

### Пример
```
сумма_один = 1 - 3 + (5 - 7);
сумма_два = 11 + 13;

ЛОГ сумма_один;
ЛОГ сумма_два;
ЛОГ сумма_один + сумма_два;
ЛОГ сумма_один - сумма_два;
```

### Зачем?
Данный язык не имеет никакого смысла, кроме как самообучения с целью понимания устройства
работы языка программирования изнутри.

### Как использовать
1. Склонировать или скачать себе код
2. Установить зависимости (`npm install` или `yarn`)
3. Собрать проект (`npm run build` или `yarn build`)
4. Запустить проект (`node ./build/simplang.js <путь к файлу с кодом>`)
