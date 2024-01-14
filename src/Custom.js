import React,{ useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import './styles.css'



const state = proxy({
  current: null,
  items: { laces: "#fff", mesh: "#fff", caps: "#fff", inner: "#fff", sole: "#fff", stripes: "#fff", band: "#fff", patch: "#fff" },
})



export default function Custom() {

    return (
       <div>
       <Canvas shadows camera={{ position: [0, 0, 6], fov: 65 }} >
       <ambientLight intensity={0.7} />
       <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
       <Shoe />
       <Environment preset="city" />
       <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
       <OrbitControls minPolarAngle={Math.PI/2 } maxPolarAngle={Math.PI } enableZoom={true} enablePan={true} />
       </Canvas>
       <Picker/>
      
       </div>
      )
  }

  function Shoe() {
    const ref = useRef()
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF("glbf/HV_Loafer_Shoe.glb")
    const [hovered, set] = useState(null)
  
    // useFrame((state) => {
    //   const t = state.clock.getElapsedTime()
    //   ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
    //   ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    // })
  
    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
        return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
      }
    }, [hovered])
  
    return (
      <group
        ref={ref}
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (state.current = null)}
        onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
   
        >
        <PerspectiveCamera
        makeDefault={false}
        far={4.38}
        near={0}
        fov={34.52}
        position={[4.11, 3.47, 10.83]}
        rotation={[-0.31, 0.36, 0.11]}
      />


    <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Vamp_L.geometry}
    material={materials.Vamp}
    material-color={snap.items.Vamp}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Vamp_R.geometry}
    material={materials.Vamp}
    material-color={snap.items.Vamp}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Heel_L.geometry}
    material={materials.Heel}
    material-color={snap.items.Heel}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Heel_R.geometry}
    material={materials.Heel}
    material-color={snap.items.Heel}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Lace.geometry}
    material={materials.Lace}
    material-color={snap.items.Lace}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Lace_R.geometry}
    material={materials.Lace}
    material-color={snap.items.Lace}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Sole_L.geometry}
    material={materials.Sole}
    material-color={snap.items.Sole}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Sole_R.geometry}
    material={materials.Sole}
    material-color={snap.items.Sole}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Body_L.geometry}
    material={materials.Body}
    material-color={snap.items.Body}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Mesh_Body_R.geometry}
    material={materials.Body}
    material-color={snap.items.Body}
  />
       
      </group>
    )
  }

  
  
  function Picker() {
    const snap = useSnapshot(state);
   const presetColors = ["#000000", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

    return (
      <div style={{ display: snap.current ? "block" : "none" }} className="picker2">
       <HexColorPicker 
       className="react-colorful"
       color={snap.items[snap.current]} 
       onChange={(color) => (state.items[snap.current] = color)}
       
    />
        <div className="picker__swatches">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="picker__swatch"
            style={{ background: presetColor }}
            onClick={(color) => (state.items[snap.current] = presetColor)}
          />
        ))}
      </div>
  
      </div>
    )
  }
  

  