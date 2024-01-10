import { createRoot } from 'react-dom/client';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './styles.css'
import { App as Canvas } from './Canvas'
import Overlay from './Overlay'
import Custom from './Custom';


createRoot(document.getElementById('root')).render(
  <>
    <Overlay/>
  
   
  </>
)
