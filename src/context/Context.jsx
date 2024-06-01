import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = ()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    console.log(prompt);

    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);

      // Check if the prompt is already in the previous prompts array
      if (!prevPrompts.includes(prompt)) {
        setPrevPrompts((prev) => [...prev, prompt]);
      }
    } else {
      // Check if the input is already in the previous prompts array
      if (!prevPrompts.includes(input)) {
        setPrevPrompts((prev) => [...prev, input]);
      }
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");

    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 !== 0) {
        newResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        newResponse += responseArray[i];
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

// import { createContext, useState } from "react";
// import run from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const delayPara = (index, nextWord) => {
//     setTimeout(() => {
//       setResultData((prev) => prev + nextWord);
//     }, 75 * index);
//   };

//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     let response;
//    console.log(prompt)
//     if(prompt !== undefined){
//      response = await run(prompt)
//      setRecentPrompt(prompt);
     
  
//     }
//     else{
//         setPrevPrompts(prev=>[...prev,input])
//         setRecentPrompt(input);
//         response = await run(input);
//     }
   
    
//     let responseArray = response.split("**");

//     let newResponse = "";
//     for (let i = 0; i < responseArray.length; i++) {
//       if (i % 2 !== 0) {
//         newResponse += "<b>" + responseArray[i] + "</b>";
//       } else {
//         newResponse += responseArray[i];
//       }
//     }

//     let newResponse2 = newResponse.split("*").join("</br>")
//     let newResponseArray = newResponse2.split(" ")
//     for(let i=0; i<newResponseArray.length; i++){
//         const nextWord = newResponseArray[i]
//         delayPara(i,nextWord+" ")
//     }

   
//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;

