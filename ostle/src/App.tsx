import React from "react";
import * as THREE from "three";

// ----------
// TODO 白石・黒石の位置
// ----------

const createLathe = ({ color = 0xa6b5d7, pointn = 10 } = {}) => {
  const points = [];
  for (var i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
  }
  var geometry = new THREE.LatheBufferGeometry(points);
  var material = new THREE.MeshBasicMaterial({ color });
  var lathe = new THREE.Mesh(geometry, material);
  return lathe;
};

const createPoints5x5 = () => {
  // @see Three.jsで大量のパーティクルを表示する方法 https://ics.media/tutorial-three/points/
  const size = 300;
  const normalCoordinate = { x: -size / 2, y: -size / 2 }; // 左下の点の位置
  const space = size / (5 - 1);
  // 形状データを作成
  const geometry = new THREE.Geometry();

  const vertices = [...Array(5)]
    .map(i => [...Array(5)])
    .map((line, x) =>
      line.map((col, y) => [
        normalCoordinate.x + x * space,
        normalCoordinate.y + y * space
      ])
    )
    .flat()
    .map(coordinate => new THREE.Vector3(...coordinate));
  geometry.vertices = [...geometry.vertices, ...vertices];

  const material = new THREE.PointsMaterial({
    size: 10, // 一つ一つのサイズ
    color: 0xffffff // 色
  });

  const mesh = new THREE.Points(geometry, material);

  return mesh;
};

const createInitialKomas = () => {
  const komaGeometry = new THREE.BoxGeometry(1, 1, 1);

  const koma1Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const koma2Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const koma1meshes = [...Array(5)].map(
    i => new THREE.Mesh(komaGeometry.clone(), koma1Material.clone())
  );
  const koma2meshes = [...Array(5)].map(
    i => new THREE.Mesh(komaGeometry.clone(), koma1Material.clone())
  );
  koma1meshes[0].position;
};

const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
  if (!canvas) {
    return;
  }
  const [width, height] = [canvas.clientWidth, canvas.clientHeight];
  // シーンを作成
  const scene = new THREE.Scene();
  // ----------------------------------------------
  // ジオメトリーを作成
  // const geometry = new THREE.IcosahedronGeometry(100, 1);
  const geometry = new THREE.PlaneBufferGeometry(200, 200, 200, 100);
  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({
    color: 0xa6b5d7,
    wireframe: true
  });
  // メッシュを作成
  const cube = new THREE.Mesh(geometry, material);
  const lathe = createLathe();
  const points = createPoints5x5();
  console.log(points);
  // 3D空間にメッシュを追加
  // scene.add(lathe);
  // scene.add(cube);
  scene.add(points);
  // ----------------------------------------------
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, +600);
  // ----------------------------------------------
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x999999, 0.5); //レンダラーの背景色と、透明度
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  //回転のアニメーション
  // tick();
  function tick() {
    renderer.render(scene, camera); //この部分はtickの中に移動させる
    lathe.rotation.x += 0.005;
    lathe.rotation.y += 0.01;

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
