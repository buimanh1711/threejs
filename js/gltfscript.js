class GLTF {
  constructor(link) {
    this.link = link;

    this.rotating = false;

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

    const control = document.getElementById('rotate');
    control.addEventListener('click', () => {
      this.rotating = !this.rotating;
    })

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.z = 10;
    this.camera.position.y = 5;
    this.camera.position.x = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.loader = new THREE.GLTFLoader();
    this.loader.load(
      this.link,
      (glb) => {
        this.model = glb.scene;
        this.scene.add(this.model);
        this.animate();
      }
    );

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 3);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    this.scene.add(this.directionalLight);

    // let material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // let linePoints = [[], [], []];
    // linePoints[0].push(new THREE.Vector3(0, 0, 0))
    // linePoints[0].push(new THREE.Vector3(0, 0, 10))
    // linePoints[1].push(new THREE.Vector3(0, 0, 0))
    // linePoints[1].push(new THREE.Vector3(0, 10, 0))
    // linePoints[2].push(new THREE.Vector3(0, 0, 0))
    // linePoints[2].push(new THREE.Vector3(10, 0, 0))
    // let lines = [];
    // linePoints.forEach((point, index) => {
    //   let geometry = new THREE.BufferGeometry().setFromPoints(point);
    //   lines[index] = new THREE.Line(geometry, material);
    // })
    // lines.forEach(item => {
    //   this.scene.add(item);
    // })

  }

  animate = () => {
    if(this.rotating) {
      this.model.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this.animate);
  }

}

const GLTFModel = new GLTF('./gltf_models/adamHead.gltf');