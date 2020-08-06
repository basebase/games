var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 957,
    title: '来找茬',
    url: 'https://github.com/basebase',
    version: '1.0',
    scene: {
        preload: preload,
        create: create,
        // update: update
    }
}


/**
 *  图片中不同元素的坐标位置信息, x-y的组合
 */
var coordinateMap = {
    "55": [320, 60, 805],
    "135": [470, 110, 890],
    "280": [385, 270, 810],
    "355": [450, 320, 860],
    "465": [430, 472, 860],
    "520": [310, 525, 740],
    "570": [330, 550, 760],
    
}

var game = new Phaser.Game(config)

/***
 *     只有和我们队列中的元素一致, 才能消除
 */
var diffBuff = {
    'K1': 'K5',
}

function preload() {
    this.load.path = "../../resources/img/finddiff/"
    this.load.image('sc1', 'sc1.jpg')
    this.load.image('bg', 'bg.jpeg')
    this.load.image('mask', 'mask1.png')
}


var black
var spotlight
var circles = []
var circlesTmp = []
var graphics
var radius = 30
var scoreText
var retryText
var gameOverText
var score = 0
var retry = 3

function create() {

    
    
    scoreText = this.add.text(200, -4, '分数: ' + score, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '30px'})
    retryText = this.add.text(600, -4, '次数: ' + retry, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '30px'})
    
    let sprite = this.add.sprite(500, 510, 'sc1')
    graphics = this.add.graphics({ fillStyle: { color: 0xff0000 }, lineStyle: { width: 2, color: 0x00ff00 } })
    // sprite.inputEnabled = true
    sprite.setInteractive()

    black = this.add.sprite(815, 745, 'bg')
    black.setDisplaySize(350, 235)
    black.setInteractive()

    black.on('pointerout', function(pointer) {
        black.destroy()
    })


    sprite.on('pointerdown', function(pointer) {
        let circle = new Phaser.Geom.Circle(pointer.x, pointer.y, radius)
        graphics.strokeCircleShape(circle)
        circles.push(circle)
        circlesTmp.push(circle)
        console.log("鼠标点击了 ", circles)
    })

    sprite.on('pointerup', function(pointer) {
        if (circlesTmp.length === 2) {
            if (!checkClickPointerIsDiffPoint(circlesTmp)) {
                retry -= 1
                if (retry <= 0) {
                    sprite.disableInteractive()
                }
                
                retryText.setText("次数: " + retry)

                circlesTmp.forEach(function (circle) {
                    circle.setEmpty()
                })
            } else {
                // 这里更新我们的分数
                score += 10
                scoreText.setText("分数: " + score)
            }

            circlesTmp = []
            redraw()
        }
    })

    function redraw() {
        graphics.clear()
        for(let i = 0; i < circles.length; i ++) {
            graphics.strokeCircleShape(circles[i])
        }
    }


    
}







function checkClickPointerIsDiffPoint(circles) {
    console.log("刚开始进来")
    let click1 = circles[0]
    let click2 = circles[1]

    let keys = Object.keys(coordinateMap)
    let values = []

    console.log("到keys")

    keys.sort()


    
    let m = click1.x

    console.log("当前点击的x位置为: ", m, " 往左推算为: ", m - radius, " 往右推算为: ", m + radius)

    if (keys.indexOf(m) != -1 || keys.indexOf(m - radius) != -1 || keys.indexOf(m + radius) != -1) {
        values = coordinateMap[m]
    } else {
        arrLK = selectLeftPointer(m, radius, keys)
        arrRK = selectRightPointer(m, radius, keys)

        if (arrLK !== -1 || arrRK !== -1) {
            
            if (arrLK !== -1) {
                values = coordinateMap[arrLK]
            } else if (arrRK !== -1) {
                values = coordinateMap[arrRK]
            } else {
            
                if ( (x - arrLK) < (x - arrRK) ) {
                    values = coordinateMap[arrLK]
                } else {
                    values = coordinateMap[arrRK]
                }
            }
        }
    }


    function selectRightPointer(x, r, keys) {
        let k = -1
        for (let i = 0; i < keys.length; i ++) {
            if (keys[i] > x && keys[i] < x + r) {
                k = keys[i]
                break
            }
        }

        return k
    }

    function selectLeftPointer(x, r, keys) {
        let k = -1
        for (let i = 0; i < keys.length; i ++) {
            if (keys[i] < x && keys[i] > x - r) {
                k = keys[i]
                break
            }
        }

        return k
    }

    console.log("循环结束")

    
    if (values.length === 0) {
        return false
    }

    console.log("第一次x比较")

    if (click1.y !== values[0] && !(click1.y > values[0] && click1.y - radius <= values[0]) && !(click1.y < values[0] && click1.y + radius >= values[0])) {
        return false
    }

    console.log("第一次y比较")

    if (click2.x !== values[1] && !(click2.x > values[1] && click2.x - radius <= values[1]) && !(click2.x < values[1] && click2.x + radius >= values[1])) {
        return false
    }

    console.log("第二次x比较")

    if (click2.y !== values[2] && !(click2.y > values[2] && click2.y - radius <= values[2]) && !(click2.y < values[2] && click2.y + radius >= values[2])) {
        return false
    }

    console.log("第二次y比较")

    return true

    // console.log("checkClickPointerIsDiffPoint x ", x , " y ", y)
}

function update() {
    let x = this.input.activePointer.x
    let y = this.input.activePointer.y
    console.log("curr x pointer ", x, " curr y pointer ", y)
}
