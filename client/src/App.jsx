import React, { useEffect, useState } from 'react'

const App = () => {

  const [data,setData] = useState({})
  useEffect(async()=>{
      try{
      const getData = await fetch("https://jsonplaceholder.typicode.com/users")
      const res  = await getData.json();
      console.log(res);
      setData(res)
    }catch(err){
      console.log("error",err);
    }
  },[])
  
  return (
    <div>
      <h1>{data}</h1>
    </div>
  )
}

export default App
 