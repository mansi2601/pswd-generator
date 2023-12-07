import { useState, useCallback, useEffect,useRef} from 'react'



function App() {
 const[length,setLength]=useState(8);
 const[numberAllowed, setNumberAllowed]= useState(false)
 const[charAllowed, setCharAllowed]= useState(false)
 const[password, setPassword] =useState("");


 const  passwordGenerator= useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPPQRSTUVWXYZabcdefghijklnopqrstuvwxyz"
  if(numberAllowed){
    str=str+"0123456789"
  }
  if(charAllowed){
    str=str+"!@#$%^&*()_+~:<>" 
  }
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()* str.length +1)
    pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])

 function copyPasswordToClipboard(){
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,99);
  window.navigator.clipboard.writeText(password);
 }

const passwordRef= useRef(null);

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
 return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-5 py-5 my-20 text-orange-800 bg-slate-800'>
    <h1 className='text-white text-center my-2 '>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type='text'placeholder='Password' 
    className='outline-none w-full py-1 px-3'
    value={password} 
    readOnly
     ref={passwordRef}></input>
    <button  onClick={copyPasswordToClipboard}
    className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
    </div>
    <div className='flex test-sm gap-x-2'>
      <div className='flex-items-center gap-x-1 '></div>
      <input type='range'
      min={6}
      max={100}
      value={length} className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}></input>
      <label>Length:{length}</label>

<div className='flex items-center gap-x-1'>
  <input type='checkbox'
  defaultChecked={numberAllowed}
  id="numberInput" onChange={()=>{
    setNumberAllowed((prev)=>!prev);
  }}></input><label htmlFor='numberInput'>Numbers</label>
</div>
<div className='flex items-center gap-x-1'>
  <input type='checkbox'
  defaultChecked={charAllowed}
  id="charInput" onChange={()=>{
    setNumberAllowed((prev)=>!prev);
  }}></input><label htmlFor='charInput'>Characters</label>
</div></div>
    </div>
  </>  
  )
}

export default App
