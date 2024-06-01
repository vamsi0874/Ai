import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  return (
    <>
     <div className="main ">
        <div className="nav">
          <p style={{color:'black'}}>AI</p>
          <img src={assets.vamsi} alt=''/>
        </div>
        <div className="main-container ">

            {!showResult?
            <>
           <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today</p>
            </div>
             <div className="cards">
                <div className="card">
                    <p>Suggest Beautiful Places</p>
                    <img src={assets.compass_icon} alt=''/>
                </div>
                <div className="card">
                    <p>Work</p>
                    <img src={assets.bulb_icon} alt=''/>
                </div>
                <div className="card">
                    <p>Planning</p>
                    <img src={assets.message_icon} alt=''/>
                </div>
                <div className="card">
                    <p>Improve</p>
                    <img src={assets.code_icon} alt=''/>
                </div>
            </div> 
            </>
         : <div className='result'>
              <div className="result-title">
                <img src={assets.vamsi}/>
                <p>{recentPrompt}</p>
              </div>
              <div className='result-data'>
                <img src={assets.gemini_icon}/>
                {loading ? 
              <div className="loader">
                <hr/>
                <hr/>
                <hr/>
              </div>
              : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
                
              </div>
           </div> 
        }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon}/>
                        <img src={assets.mic_icon}/>
                        <img onClick={()=>onSent(input)} src={assets.send_icon}/>
                    </div>
                </div>
                <p className="bottom-info">
                    Ai may display inaccurate info. so please double check
                </p>
            </div>
        </div>
     </div>
    </>
  )
}

export default Main