class STL {
  constructor(link) {
    this.link = link;

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

    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 50000);
    this.camera.position.z = 1000;
    this.camera.position.y = 1000;
    this.camera.position.x = 1000;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.loader = new THREE.STLLoader();
    this.loader.load(
      this.link,
      (stl) => {
        const material = new THREE.MeshPhongMaterial({ color: 0x61210B });
        this.model = new THREE.Mesh(stl, material);
        this.scene.add(this.model);
        console.log(this.model)
        this.model.position.x = -700;
        this.model.position.y = 0;
        this.model.position.z = 0;

        this.model.rotation.x = 4.5

        this.animate();
      }
    );

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    this.scene.add(this.directionalLight);

    // let material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // let linePoints = [[], [], []];
    // linePoints[0].push(new THREE.Vector3(0, 0, 0))
    // linePoints[0].push(new THREE.Vector3(0, 0, 10000))
    // linePoints[1].push(new THREE.Vector3(0, 0, 0))
    // linePoints[1].push(new THREE.Vector3(0, 10000, 0))
    // linePoints[2].push(new THREE.Vector3(0, 0, 0))
    // linePoints[2].push(new THREE.Vector3(10000, 0, 0))
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
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    // this.model.rotation.x += 0.1;
    requestAnimationFrame(this.animate);
  }

}

const STLModel = new STL('./stl_models/abc.stl');