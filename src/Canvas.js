import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'

import {
  useGLTF,
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls
} from '@react-three/drei'

import { useSnapshot } from 'valtio'
import { state } from './store'

export const App = ({ position = [0, 0, 2.5], fov =25 }) => (

 <Canvas
 shadows
 camera={{ position, fov}}
 eventSource={document.getElementById('root')}
 eventPrefix="client">
 <ambientLight intensity={0.5} />
 <Environment preset='city'/> 

 
  
   <Center>
     <Shirt scale={[0.002,0.002,0.002]} />
   </Center>
   <OrbitControls />

</Canvas>

)

function Shirt(props) {
  const snap = useSnapshot(state)

  //const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  const { nodes, materials } = useGLTF("/glbf/shoe.glb");

  useFrame((state, delta) =>
    //easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta)
    easing.dampC(materials.entity_3.color, snap.selectedColor, 0.25, delta)
  )

  //materials.entity_3.color = new THREE.Color('cc0000');

  return (
    <mesh
      castShadow
      // geometry={nodes.T_Shirt_male.geometry}
      // material={materials.lambert1}
      geometry={nodes.entity_2.geometry}
      material={materials.entity_3}
      material-roughness={1}
      {...props}
      dispose={null}></mesh>
  )
}

function Backdrop() {
  const shadows = useRef()

  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  )

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta)
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}

//useGLTF.preload('/shirt_baked_collapsed.glb')
useGLTF.preload("/glbf/shoe.glb");
