/***
 * 
 *      游戏类基础配置程序
 * 
 *          掌握一些常见的游戏开发配置的参数, 并从该处查看效果
 */

 var seed = 1419463258969;

 var config = {
     type: Phaser.AUTO,
     width: 800,
     height: 600,
     scene: {
         preload: preload,
         create: create
     },
     title: '环球大冒险',           // 设置游戏的标题
     url: 'https://github.com/basebase',        // 配置游戏url
     version: '1.0',               // 设置游戏版本
     seed: [ seed ],        // 随机数生成器, 后期作用
     banner: {                      // 感觉这个banner只有在打开chrome的控制台才能看到颜色, 不知道具体作用, 有点奇怪的功能
         text: '#ffffff',
         background: [
            '#fff200',
            '#38f0e8',
            '#00bff3',
            '#ec008c'
         ],
         hidePhaser: true
     }
 }

 var game = new Phaser.Game(config)
 
 function preload() {
     this.load.path = "../../resources/img/gconfig/"
     this.load.image('pic', 'baal-loader.png')
 }

 function create() {
    /***
     *      add.image方法, 使用的是Phaser.GameObjects. GameObjectFactory类, 请参考:
     *              https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html#image__anchor
     *      创建一个新的图像游戏对象并将其添加到场景中。只有设置了图片资源才可使用, 也就是我们在preload中预加载的资源。
     *      第一个参数是x轴的位置, 第二个参数是y轴的位置, 第三个是我们图片资源的key值。
     */
     this.add.image(400, 300, 'pic')

     /***
      *         创建一个新的文本游戏对象并将其添加到场景中。
      *             参数1:  在X轴的位置
      *             参数2:  在Y轴的位置
      *             参数3:  写入要展示的文本内容, 这里设置为空, 通过setText动态设置想要的文字
      *             参数4:  字体样式, 可选参数
      */
     var titleText = this.add.text(80, 550, '', { font: '16px Courier', fill: '#ffffff' })
     titleText.setText([
         'Game Title: ' + game.config.gameTitle,
         'URL: ' + game.config.gameURL,
         'Version: ' + game.config.gameVersion
     ])

     var shuffleTest = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
     var seedText = this.add.text(80, 200, '', {})
     seedText.setText([
        'RNG',
        '---',
        'Seed: ' + seed,
        '',
        'Between 0 and 50: ' + Phaser.Math.RND.between(0, 50),
        'Between 0 and 1: ' + Phaser.Math.RND.realInRange(0, 1),
        'Normal: ' + Phaser.Math.RND.normal(),
        'UUID: ' + Phaser.Math.RND.uuid(),
        'Angle: ' + Phaser.Math.RND.angle(),
        'Shuffle: ' + Phaser.Math.RND.shuffle(shuffleTest).join(' ')
     ])
 }