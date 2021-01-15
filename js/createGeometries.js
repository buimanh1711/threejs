class Geometry {
  constructor(vertices) {
    this.vertices = vertices;

    this.model = null;
    this.scene = null;
    this.camera = null;
    this.render = null;
    this.control = null;
    this.loader = null;
    this.ambientLight = null;
    this.directionalLight = null;

    this.init();
  }

  init = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    this.camera = new THREE.PerspectiveCamera(60, 1000 / 500, 1, 5000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(1000, 500);
    document.body.appendChild(this.renderer.domElement);

    let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshLambertMaterial({ color: 0x000000})
    
    // let geometry = new THREE.Geometry();
    // let vector3s = this.vertices.map((item) => new THREE.Vector3(item[0], item[1], item[2]));
    // console.log(vector3s)
    // geometry.vertices.push(
    //   vector3s[0],
    //   vector3s[1],
    //   vector3s[2],
    //   vector3s[3],
    //   vector3s[4],
    // );

    // geometry.faces.push(
    //   new THREE.Face3(0, 1, 2, null, new THREE.Color(0xFF0000)),
    //   new THREE.Face3(0, 2, 3, null, new THREE.Color(0xFF2200)),
    //   new THREE.Face3(0, 1, 3, null, new THREE.Color(0xFF5511)),
    //   new THREE.Face3(2, 1, 3, null, new THREE.Color(0x00ff11)),
    // )

    // let material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }),
    
    this.model = new THREE.Mesh(geometry, material);
    this.scene.add(this.model);
    // console.log(this.scene)

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.animate();
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.scene.add(this.ambientLight);

    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set( 10, 10, 10 );

    this.scene.add(this.spotLight);

  }

  animate = () => {
    this.model.rotation.x += 0.01;
    this.model.rotation.z += 0.01;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

}

const Geo = new Geometry([[1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 2, 3], [2, 2, 1]]);