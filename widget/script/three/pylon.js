var renderer;
var mesh;
var camera;
var scene;
var light;
var t = 0;

//初始化画布
function initThree(id) {
    width = document.getElementById(id).clientWidth;
    height = document.getElementById(id).clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById(id).appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

//初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 10000);
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 10, 1000  )
    camera.position.x = 200;
    camera.position.y = 200;
    camera.position.z = 200;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(0,0,0);
}

//初始化场景
function initScene() {
    scene = new THREE.Scene();
}

//初始化灯光
function initLight() {
    /* light = new THREE.AmbientLight(0xBEBEBE);
     light.position.set(100, 100, 200);
     scene.add(light);*/

    light = new THREE.DirectionalLight(0xFF0000,1);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light.position.set(1,0,0);
    scene.add(light);

    /*light = new THREE.PointLight(0x00FF00);
    light.position.set(300, 0,0);
    scene.add(light);*/
}

//初始化对象
function initObject(data) {
    //立方体
    var cubeGeometry;
    //材质
    var material = new THREE.MeshBasicMaterial({color:0x919191,wireframe : true,skinning:true});
    for(var p in data){//遍历json对象的每个key/value对,p为key

       switch (p){
           case 'tabula':
               for(var i in data[p]){
                   //横隔
                   cubeGeometry = new THREE.PlaneGeometry();
                   cubeGeometry.vertices = eval("("+data[p][i]['vertices']+")");
                   cubeGeometry.faces = eval("("+data[p][i]['faces']+")");
                   mesh = new THREE.Mesh( cubeGeometry,material );
               }
               
               break;
           case 'bottom':
               for(var i in data[p]){
                   //立方体
                   cubeGeometry = new THREE.Geometry();
                   cubeGeometry.vertices = eval("("+data[p][i]['vertices']+")");
                   cubeGeometry.faces = eval("("+data[p][i]['faces']+")");
                   mesh = new THREE.Mesh( cubeGeometry,material );
               }
               
               break;
           case 'body':
               for(var i in data[p]){
                   //立方体
                   cubeGeometry = new THREE.Geometry();
                   cubeGeometry.vertices = eval("("+data[p][i]['vertices']+")");
                   cubeGeometry.faces = eval("("+data[p][i]['faces']+")");
                   mesh = new THREE.Mesh( cubeGeometry,material );
               }
               break;
           case 'header':
               for(var i in data[p]){
                   //立方体
                   cubeGeometry = new THREE.Geometry();
                   cubeGeometry.vertices = eval("("+data[p][i]['vertices']+")");
                   cubeGeometry.faces = eval("("+data[p][i]['faces']+")");
                   mesh = new THREE.Mesh( cubeGeometry,material );
               }
               break;
           case 'header_other':
               for(var i in data[p]){
                   //立方体
                   cubeGeometry = new THREE.Geometry();
                   cubeGeometry.vertices = eval("("+data[p][i]['vertices']+")");
                   cubeGeometry.faces = eval("("+data[p][i]['faces']+")");
                   mesh = new THREE.Mesh( cubeGeometry,material );
               }
               break;
       }
    }
}

function threeStart(id,data) {
    initThree(id);
    initCamera();
    initScene();
    initLight();
    initObject(data);
    animation();
}

//动漫效果
function animation(){
    //renderer.clear();
    cameraRotate();
    renderer.render(scene, camera);

    loopAnimal =  requestAnimationFrame(animation);
}

//摄像头旋转
function cameraRotate(){
    camera.position.z = 300*Math.sin(t);
    camera.position.x = 300*Math.cos(t);
    camera.position.y = 200;
    camera.lookAt(0,0,0);
    t = t+0.01;
}

















