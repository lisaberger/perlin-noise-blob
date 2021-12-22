import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const metallicTexture = textureLoader.load('textures/metallic.jpg')

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereGeometry(1, 128, 128)

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uMouseDentro: { type: 'bool', value: 'false'},
        uTime: { type: '1f', value: 0 },
        uColor: { type: 'vec3', value: new THREE.Color(0x160dd1) },
        uColor1: { type: 'vec3', value: new THREE.Color(0xFFFFFF) },
        
        //uTexture: { value: metallicTexture }

    },
    transparent: true,
})


// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

console.log(sphere.geometry)
/**
 * Lights
 */

//  const directionalLight = new THREE.DirectionalLight('#ffffff',1.0)
//  directionalLight.position.set(0, 3, 0);
//  scene.add(directionalLight)

//  const spotLight = new THREE.SpotLight('#ffffff', 1.0, 5)
//  scene.add(spotLight)
 

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Sphere
    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()