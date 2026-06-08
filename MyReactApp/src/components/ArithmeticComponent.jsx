import { useState } from "react"

function ArithmeticComponent(){
    let n1 = 4
    let n2 = 5
    let [result, setResult] = useState(); // result = undefined -- useState react Hook 
//for rerendering purpose we will use states
    const operation = (op)=>{
        switch(op){
            case 'SUM' :
                // alert(op)
                setResult(n1+n2)
                //console.log(result)
                break  
            case 'SUB':
                // alert(op)
                setResult(n1-n2)
                //console.log(result)
                break
            case 'MUL':
                // alert(op)
                setResult(n1*n2)
                //console.log(result)
                break
            case 'DIV':
                // alert(op)
                setResult(n1/n2)
                //console.log(result)
                break
            default:
                break
        }
    }
    return(
        <div>
            //this section is normally doing operations on two numbers.but in react without braces everythings i considered as just a varible
            <h1>Arithmetic Component</h1>
            <p>Sum is: {n1+n2}</p>
            <p>Sub is: {n1-n2}</p>
            <p>Mul is: {n1*n2}</p>
            <p>Div is: {n1/n2}</p>
            
            <hr />//creates a horizontal row
            <div>
                <p>Result of (n1=4 & n2=5) is: {result}</p> 
                //() telling that this func has no parameters.here sum is an argument ..normally onclick{}
                <p><button onClick={()=>operation('SUM')}>SUM</button></p>//onclick is event handler.operation is an function here calling that
                <p><button onClick={()=>operation('SUB')}>SUB</button></p>
                <p><button onClick={()=>operation('MUL')}>MUL</button></p>
                <p><button onClick={()=>operation('DIV')}>DIV</button></p>
                //<p> </p>- is used to form a new row which means go to the next row
            </div>

        </div>
    )
}

export default ArithmeticComponent
