import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {

    const [extended , setExtended] = useState(false)
    const {onSent, prevPrompts, setRecentPrompt, newChat, setPrevPrompts} = useContext(Context)
    const navigate = useNavigate();

    const loadPrompt  = async (prompt)=>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    } 

    const deletePrompt = (index) => {
      setPrevPrompts((prevPrompts) => prevPrompts.filter((_, i) => i !== index))
      newChat()
  }

  return (
    <>
    <div className='sidebar'>
      <div className="top">
         <img onClick={()=>setExtended(prev=>!prev)} className='menu Newchart' src={assets.menu_bar} alt=''/>
         <div onClick={()=>{newChat(); navigate('/')}} className="new-chat">
            <img className='Newchart' src={assets.plus_icon} alt=''/>
            {extended ? <p>New Chat</p> : null}
         </div>
         {extended ? 
           <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index)=>
               (
                <div className='v-item'> 
               <div onClick={()=>loadPrompt(item)} key = {index} className="recent-entry">
                 {/* <img src={assets.message_icon}/> */}
                 <p>{item.slice(0,18)}...</p>
                 
               </div>
               <img className='remove' src={assets.remove} onClick={()=>deletePrompt(index)}/>
               </div>
             )
            )}
          
        </div>
        : null}
        
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={()=>navigate('/help')}>
            <img src={assets.question_icon} alt=''/>
            {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry" onClick={()=>navigate('/activity')}>
            <img src={assets.history_icon} alt=''/>
            {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry" onClick={()=>navigate('/settings')}>
            <img src={assets.setting_icon} alt=''/>
            {extended ? <p>Settings</p> : null}
        </div>
      </div>
      </div> 
    </>
  )
}

export default Sidebar