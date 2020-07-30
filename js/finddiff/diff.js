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
}


var clickCount = 0
var circles = []
var graphics
var radius = 30

function create() {
    
    let sprite = this.add.sprite(500, 510, 'sc1')
    graphics = this.add.graphics({ fillStyle: { color: 0xff0000 }, lineStyle: { width: 2, color: 0x00ff00 } })
    sprite.inputEnabled = true
    sprite.setInteractive()

    sprite.on('pointerdown', function(pointer) {
        console.log("click pointer ", pointer)
        let circle = new Phaser.Geom.Circle(pointer.x, pointer.y, radius)
        circle.name = 'DELETE'
        graphics.strokeCircleShape(circle)
        circles.push(circle)
        clickCount ++
        console.log("pointerdown clickCount ", clickCount)
    })

    sprite.on('pointerup', function(pointer) {

        console.log("pointerup clickCount ", clickCount)
        
        if (clickCount == 2) {
            if (checkClickPointerIsDiffPoint(circles)) {
                console.log("开始处理成功时候的程序")
                circles.forEach(function(circle) {
                    circle.name = 'SAVE'
                })

                console.log("匹配成功后, 开始绘制...")
            } else {
                console.log("开始处理失败时候的程序")
                circles.forEach(function(circle) {
                    if (circle.name = 'DELETE') {
                        circle = circle.setEmpty()
                    }
                })
            }

            redraw()
            
            clickCount = 0
            
        }

        
    })
}


function redraw() {

    console.log("删除之前: ", circles)
    graphics.clear()
    for(let i = 0; i < circles.length; i ++) {
        if (!circles[i].isEmpty()) {
            // graphics.strokeCircleShape(circles[i])
        } else {
            circles.splice(circles.indexOf(circles[i]), 1)
        }
    }

    console.log("删除之后: ", circles)

    for(let i = 0; i < circles.length; i ++) {
        graphics.strokeCircleShape(circles[i])
    }
}




function checkClickPointerIsDiffPoint(circles) {
    let click1 = circles[0]
    let click2 = circles[1]

    let keys = Object.keys(coordinateMap)
    let values = []

    for (let i = 0; i < keys.length; i ++) {
        let key = keys[i]
        if (click1.x === key) {
            values = coordinateMap[click1.x]
            break
        } else if (click1.x < key && click1.x + radius >= key) {
            for (let i = click1.x + radius ; i <= key; i ++) {
                if (i == key) {
                    values = coordinateMap[i]
                    break
                }
            }

            break
        } else if (click1.x > key && (click1.x - radius <= key )) {
            for (let i = click1.x - radius ; i <= key; i --) {
                if (i == key) {
                    values = coordinateMap[i]
                    break
                }
            }

            break
        }
    }

    console.log("values ", values)

    if (values.length === 0) {
        return false
    }

    if (click1.y !== values[0] && !(click1.y > values[0] && click1.y - radius <= values[0]) && !(click1.y < values[0] && click1.y + radius >= values[0])) {
        return false
    }

    if (click2.x !== values[1] && !(click2.x > values[1] && click2.x - radius <= values[1]) && !(click2.x < values[1] && click2.x + radius >= values[1])) {
        return false
    }

    if (click2.y !== values[2] && !(click2.y > values[2] && click2.y - radius <= values[2]) && !(click2.y < values[2] && click2.y + radius >= values[2])) {
        return false
    }

    return true

    console.log("checkClickPointerIsDiffPoint x ", x , " y ", y)
}

function update() {
    let x = this.input.activePointer.x
    let y = this.input.activePointer.y
    console.log("curr x pointer ", x, " curr y pointer ", y)
}