//封装一个千分位分割函数，传入一个类型为number的num，得到一个类型为string的输出
// function formatNumberToThousands(num:number):string{
//     if(isNaN(num)||(typeof(num)!='number')){
//         throw new Error("必须是一个有效数字")
//     }

//     const [integePart,decimalPart] = num.toString().split(".") //1234.7
    
//     let formatterInteger = ""

//     for(let i = integePart.length - 1;i>=0;i--){
//         formatterInteger = integePart[i] + formatterInteger
//         if((integePart.length-i)%3===0&&i!==0){
//             formatterInteger=","+formatterInteger
//         }
//     }

//     return decimalPart?`${formatterInteger}.${decimalPart}`:formatterInteger
// }
function thousandSeparator(num: number | string): string {
    num = num.toString();
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export default thousandSeparator