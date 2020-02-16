import React from "react";
import * as THREE from "three";

const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
  if (!canvas) {
    return;
  }
  const [width, height] = [canvas.clientWidth, canvas.clientHeight];
  // シーンを作成
  const scene = new THREE.Scene();
  // ジオメトリーを作成
  const geometry = new THREE.IcosahedronGeometry(100, 1);
  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({
    color: 0xa6b5d7,
    wireframe: true
  });
  // メッシュを作成
  const cube = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(cube);
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, +600);
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // renderer.render(scene, camera);
  //回転のアニメーション
  tick();
  function tick() {
    renderer.render(scene, camera); //この部分はtickの中に移動させる
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    requestAnimationFrame(tick);
  }
};

const App = () => {
  const [width, height] = [window.innerWidth, window.innerHeight];
  return (
    <div>
      <canvas ref={onCanvasLoaded} height={height} width={width} />
    </div>
  );
};

export default App;
