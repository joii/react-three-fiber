import {Routes, Route, useNavigate} from 'react-router-dom';
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import Custom from './Custom';



export default function Overlay() {
  const snap = useSnapshot(state)

  return (
    <div className="container">
      <header>
        <img src="/logo.png" width="80" />
        
        <div>
        {snap.intro ? <AiOutlineShopping size="3em" />: <p></p>}
        </div>
        
      </header>

      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  )
}

function Intro() {
 
  return (
    <section key="main">
      <div className="section--container">
        <div>
          <h1>HEAVY by YOU</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
            Design your own shoes and take your style one step further, blending fashion and sport performance with a touch of your unique flair.
            </p>
            <button
              style={{ background: 'black' }}
              onClick={() => (state.intro = false)}>
              CUSTOMIZE IT 
            </button>
          
          </div>
        </div>
      </div>
    </section>
  )
}

function Customizer() {
  const snap = useSnapshot(state)

  const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934']
  const decals = ['react', 'three2', 'pmndrs']

  return (
    <div >
      <Custom/>
      <button
      className="exit"
      style={{ background: snap.selectedColor }}
      onClick={() => (state.intro = true)}>
      GO BACK
      <AiOutlineArrowLeft size="1.3em" />
    </button>
    </div>
  )
}

function CustomizerBak() {
  const snap = useSnapshot(state)

  const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934']
  const decals = ['react', 'three2', 'pmndrs']

  return (
    <section >
    
    
        
      <div className="customizer">
        
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}></div>
          ))}
        </div>
       
        <button className="share" style={{ background: snap.selectedColor }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </section>
  )
}
