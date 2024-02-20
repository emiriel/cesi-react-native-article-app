function myFunc(name, age) {
  console.log(name);
  console.log(age);
}

function myFunc2(name, age) {
  console.log(name + "!");
  console.log(age + 1);
}

const myObj = {
  myFunc: myFunc,
  myFunc2: myFunc2,
};

// myFunc("Sven")

const test = myObj.myFunc2.bind(this, "Sven", 35);

test();

const myArray = [1, 2, 3, 4, 5, 6];
const myArray2 = [7, 8, 9, 10];

const myArray3 = myArray2;

console.log(myArray3);

const myObjArray = [
  { name: "car", id: 1 },
  { name: "boat", id: 2 },
];

const idx = myObjArray.findIndex((article) => article.id === 1);
console.log(idx);
