let jsonArr = [
  {
    Еда: {
      January: 20000,
      February: 5000.0,
      March: 25000,
      April: 23000,
      May: 34000,
      June: 34000,
      July: 35000,
      August: 23000,
      September: 22000,
      October: 35000,
      November: 24000,
      December: 24000,
    },
  },
  {
    Одежда: {
      January: 20000,
      February: 5000.0,
      March: 25000,
      April: 23000,
      May: 34000,
      June: 34000,
      July: 35000,
      August: 23000,
      September: 22000,
      October: 35000,
      November: 24000,
      December: 24000,
    },
  },
  {
    Развлечения: {
      January: 20000,
      February: 5000.0,
      March: 25000,
      April: 23000,
      May: 34000,
      June: 34000,
      July: 35000,
      August: 23000,
      September: 22000,
      October: 35000,
      November: 24000,
      December: 24000,
    },
  },
  {
    ЖКХ: {
      January: 10000,
      February: 2000.0,
      March: 15000,
      April: 13000,
      May: 24000,
      June: 24000,
      July: 25000,
      August: 13000,
      September: 12000,
      October: 25000,
      November: 23000,
      December: 14000,
    },
  },
];
let test = jsonArr.map((item) => Object.keys(item));
let test2 = jsonArr.map((item, index) =>
  Object.values(jsonArr[index][test[index]])
);
let test3 = jsonArr.map((item, index) =>
  Object.keys(jsonArr[index][test[index]])
);
console.log(test3);
let result = [];
function parseJson() {
  let count = 0;
  let arrCount = 0;
  let item = 0;

  while (count < test2[1].length) {
    for (let i = 0; i < test2.length; i++) {
      item += test2[i][count];
    }
    item /= 100;
    result.push(item);
    item = 0;
    count++;
    arrCount++;
  }
}
parseJson();
console.log(result);
let percentResult = [];
function createPercentArr() {
  let count = 0;
  let percentItem = 0;
  let percentMonth = [];
  while (count < test2[0].length) {
    for (let i = 0; i < test2.length; i++) {
      percentItem = (test2[i][count] / result[count]).toFixed(2);
      percentMonth.push(percentItem);
      percentItem = 0;
      //       console.log(percentMonth)
    }
    percentResult.push(percentMonth);
    percentMonth = [];
    count++;
  }
}
createPercentArr();
console.log(percentResult);
let allCategories = [];
function setArrStructure() {
  let count = 0;
  let category = [];
  while (count < percentResult[count].length) {
    for (let i = 0; i < percentResult.length; i++) {
      category.push(percentResult[i][count]);
    }
    allCategories.push(category);
    category = [];
    count++;
  }
}
setArrStructure();
console.log(allCategories);
// let test4 = jsonArr.map((item,index) => item[index])
let newJsonArr = [];
function createNewJson() {
  let count = 0;

  let obj = {};
  let item = {};
  for (let i = 0; i < test.length; i++) {
    for (let j = 0; j < test3[i].length; j++) {
      item = test[i].toString();

      Object.assign(obj, { [test3[i][j]]: allCategories[i][j] });

      //       obj[item] = Object.assign(obj, {[test3[i][j]]: allCategories[i][j]})
    }
    newJsonArr.push(obj);
    obj = {};
    item = {};
  }

  //   count++
}

createNewJson();
console.log(newJsonArr);
