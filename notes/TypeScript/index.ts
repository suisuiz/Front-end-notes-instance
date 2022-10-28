// string 字符串类型   number  数字类型
let names: string = 'Runoob'
let years: number = 5
let words: string = `您好，今年是 ${names} 发布 ${years + 1} 周年`
console.log(names, years)
console.log(words)
//
// 这是一个单行注释

/* 
 这是一个多行注释 
 这是一个多行注释 
 这是一个多行注释 
*/
// void 用于标识方法返回值的类型，表示该方法没有返回值。
class Site {
  name(): void {
    console.log('suisui')
  }
  age(): void {
    console.log('18')
  }
}
var obj = new Site()
obj.name()
obj.age()
console.log(obj)

// Array 数组类型      any 任意类型
let arr: Array<number> = [1, 2]
let arr2: Array<any> = [1, '2', true, 'abcd']
console.log(arr)
console.log(arr2)

let arrayList: any[] = [1, false, 'fine']
arrayList[1] = 100
console.log(arrayList)

// enum 枚举
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green
console.log('下标', c)

// never 类型
/**
 * never 是其它类型（包括 null 和 undefined）的子类型，
 * 代表从不会出现的值。
 * 这意味着声明为 never 类型的变量只能被 never 类型所赋值，
 * 在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）
 */
let x: never
let y: number

// // 运行错误，数字类型不能转为 never 类型
// x = 123

// // 运行正确，never 类型可以赋值给 never类型
// x = (() => {
//   throw new Error('exception')
// })()

// // 运行正确，never 类型可以赋值给 数字类型
// y = (() => {
//   throw new Error('exception')
// })()

// // 返回值为 never 的函数可以是抛出异常的情况
// function error(message: string): never {
//   throw new Error(message)
// }

// // 返回值为 never 的函数可以是无法被执行到的终止点的情况
// function loop(): never {
//   while (true) {}
// }
