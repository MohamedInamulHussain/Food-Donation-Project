import React, { createContext, useEffect, useMemo, useRef, useState } from 'react'


export const Data=createContext();

export const Testing = () => {
  let [count, setCount] = useState(0);
  let [value, setValue] = useState();
  let [dark, setDark] = useState(1);

  // console.log("re rendering")
  const theme = useMemo(() => {

    return {
      color: dark ? "red" : "blue",
      backgroundColor: dark ? "black" : "white"
    }
  }, [dark]);
  useEffect(() => {
    console.log("theme changerd");
  }, [theme]);

  return (
    <Data.Provider value={{age:20}}>
      <h2>useMemo</h2>
      <button onClick={() => { setDark((c) => !c) }}>toggle switch</button>
      <div style={theme}>this coolor</div>
      <div>count is {count}</div>
      <button onClick={() => setCount(++count)}>click me</button>
     <h1>testing</h1>
     
    </Data.Provider>
  )
}
