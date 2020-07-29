/**
 * 
 *  png动画效果
 */

 
 /***
  *         对于Game类的配置请参考: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
  *         
  *         关于Scene参考:
  *             https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html
  *                 大致关于Scene类, 并且有init(), preload(), create()三个可选方法
  * 
  *             https://photonstorm.github.io/phaser3-docs/Phaser.Types.Scenes.html#.ScenePreloadCallback
  *                 相关方法使用说明
  * 
  *         这里需要说明的是, scene参数是一定要配置的, 不然就是一个黑框。
  * 
  * 
  *         需要注意的是, 开发的时候最好导入的是phaser.js文件, 这样在console.log()的时候可以观察到更详细的信息, 包括是从哪个类来的等
  */

 var config = {
     type: Phaser.AUTO,     // 自动设置渲染, WEBGL|CANVAS
    //  parent: null,            // 指定父元素, 可以继承上面的DOM ID, 画布等信息, 如果没有找到也没有什么, 就用当前的。如果设置为null后什么都没
     width: 800,            // 界面宽度
     height: 600,           // 界面高度
     backgroundColor: "#fbf0e4",        // 设置画布背景颜色, 默认为黑色
     scene: {               // 添加游戏场景, 可以添加到一个或者多个, 如果想添加多个需要Phaser.Scenes.SceneManager#add
        preload: preload,   // 场景的预加载, 之后会回调, 该方法是一个可以选方法。
        create: create      // 场景的创建, 之后会回调, 该方法是一个可以选方法。
     }
 }

 var game = new Phaser.Game(config)     // 创建一个Game对象

 function preload() {

    /**
     * 
     *      LoaderPlugin请参考: https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#path__anchor
     *              
     *              使用Loader需要注意:
     *                  只有在Scene.preload方法调用中自启动, 在Scene.preload方法外调用任何this.load方法, 则需要调用Loader.start()自行启动Loader
     * 
     *      
     *      对于load.path设置基本路径必须要以"/"结尾, 也可以通过setPath来设置, 是一样的效果。
     * 
     * 
     *      对于load.image
     *          load.image不会立即加载。当加载程序启动时，它将添加到准备加载的队列中
     * 
     *      需要注意的是:
     *          Phaser可以加载所有常见的图像类型：png，jpg，gif和浏览器可以原生处理的任何其他格式。
     *          如果您尝试加载动画gif，则只会渲染第一帧。浏览器本身不支持将动画gif播放到Canvas元素。
     * 
     *      load.image中的key可以是string也可以是一个对象, 如果使用对象后面两个可选参数可以不用写
     *          this.load.image({
     *              key: 'logo',
     *              url: 'images/AtariLogo.png',
     *              normalMap: 'images/AtariLogo-n.png'
     *          })
     * 
     *          normalMap: 法线贴图
     * 
     *          这是一种高级配置功能, 参数配置需要参考Phaser.Types.Loader.FileTypes.ImageFileConfig
     *              https://photonstorm.github.io/phaser3-docs/Phaser.Types.Loader.FileTypes.html#.ImageFileConfig
     * 
     *          // 使用数组等价于normalMap
     *          this.load.image('logo', [ 'images/AtariLogo.png', 'images/AtariLogo-n.png' ]);
     * 
     *      
     */

     this.load.path = "../../resources/img/anims/"          // 如果不设置"/"作为结尾, 是找不到文件资源的
    //  this.load.setPath("../../resources/img/anims")     // 如果是使用setPath可以不用"/"结尾
     this.load.image('cat1', 'cat1.png')                  //  对于我们来说, 只是预加载png图像, 所以直接load.image字符即可
     this.load.image('cat2', 'cat2.png')
     this.load.image('cat3', 'cat3.png')
     this.load.image('cat4', 'cat4.png')
 }

 function create() {

    /***
     * 
     *  同样的, create方法也是Scene.create, 找到相关方法查找到anims是Phaser.Animations. AnimationManager
     * 
     *  请参考:
     *          https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html
     * 
     *  anims.create():
     *      创建一个新的动画, 并添加的动画管理器中(Animation Manager)
     *      创建一个动画是全局的, 其它任何地方都可以使用。如果传入的key已存在则直接返回动画, 如果不想使用可以使用remove在从新创建。
     *      
     *      create方法config参数请参考:
     *          https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.Animation
     *      对于frames配置信息请参考:
     *          https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.AnimationFrame
     * 
     *      create方法的key是与我们精关关联的key, 所以会在下方写入play('k1')
     *                                                     sprite.animations.play(key)
     */

     this.anims.create({
         key: 'k1',
         frames: [                  // 一个对象，其中包含用于生成动画帧的数据, 这里包含4帧动画数据

             //    我这里的key可以乱写吗? 当然不行, 要找到preload方法加载时写的key值
             { key: 'cat1' },
             { key: 'cat2' },
             { key: 'cat3' },
             { key: 'cat4' }
         ],
         frameRate: 100,          // 回放的帧速率，以每秒帧数为单位
         repeat: -1             // 重复动画的次数, 设置-1为无穷大
     })

     this.add.sprite(400, 300, 'cat1').play('k1')
 }