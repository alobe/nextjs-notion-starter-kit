// import * as THREE from "three"
import { useEffect, Suspense } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Physics, usePlane, useCompoundBody, useSphere } from "@react-three/cannon"
// // import { Environment } from "@react-three/drei"
// import { EffectComposer, SSAO } from "@react-three/postprocessing"

// const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#a0a090", emissive: "red" })
// // const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.9, roughness: 0.1, color: "#8a300f", emissive: "#600000", envMapIntensity: 9 })
// const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
// const baubles = [...Array(50)].map(() => ({ args: [0.6, 0.6, 0.8, 0.8, 1][Math.floor(Math.random() * 5)], mass: 1, angularDamping: 0.2, linearDamping: 0.95 }))

// function Bauble({ vec = new THREE.Vector3(), ...props }) {
//   // const { nodes } = useGLTF("/cap.glb")
//   const [ref, api] = useCompoundBody(() => ({
//     ...props,
//     shapes: [
//       { type: "Box", position: [0, 0, 1.2 * props.args], args: new THREE.Vector3().setScalar(props.args * 0.4).toArray() },
//       { type: "Sphere", args: props.args },
//     ],
//   }))
//   useEffect(() => api.position.subscribe((p) => api.applyForce(vec.set(...p).normalize().multiplyScalar(-props.args * 35).toArray(), [0, 0, 0])), [api]) // prettier-ignore
//   return (
//     <group ref={ref} dispose={null}>
//       <mesh scale={props.args} geometry={sphereGeometry} material={baubleMaterial} />
//       {/* <mesh scale={2.5 * props.args} position={[0, 0, -1.8 * props.args]} geometry={nodes.Mesh_1.geometry} material={capMaterial} /> */}
//     </group>
//   )
// }

// function Collisions() {
//   const viewport = useThree((state) => state.viewport)
//   usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }))
//   usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }))
//   usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }))
//   usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }))
//   const [, api] = useSphere(() => ({ type: "Kinematic", args: 2 }))
//   return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 2.5))
// }

const Baubles = () => (
  // <Suspense fallback={null}>
  //   <Canvas
  //     dpr={1.5}
  //     style={{height: 'calc(100vh)'}}
  //     gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
  //     camera={{ position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
  //     onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
  //     <ambientLight intensity={0.75} />
  //     <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="red" />
  //     <directionalLight position={[0, 5, -4]} intensity={4} />
  //     <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
  //     <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
  //       <Collisions />
  //       {baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */}
  //     </Physics>
  //     {/* <Environment files="/adamsbridge.hdr" /> */}
  //     <EffectComposer multisampling={0}>
  //       <SSAO samples={11} radius={30} intensity={30} luminanceInfluence={0.6} color="red" />
  //       <SSAO samples={21} radius={5} intensity={30} luminanceInfluence={0.6} color="red" />
  //     </EffectComposer>
  //   </Canvas>
  // </Suspense>
  <div></div>
)

export default Baubles;
