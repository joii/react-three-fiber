import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

export default function App() {
  const gltf = useLoader(GLTFLoader, '/models/shirt.glb')

  return (
   <div className='content-area'>
   <Canvas camera={{ position: [0, 0, 2] }} 
   size={[`1000px`,`1000px`]}
   style={{width: `100%`, height: `auto`, position: `relative` }}>
     
   <primitive
     object={gltf.scene}
     position={[0, 0, 0]}
     children-0-castShadow
   />
   
   <OrbitControls target={[0, 1, 0]} />
   <axesHelper args={[20]} />
   <Stats />
 </Canvas>
   </div>
  )
}