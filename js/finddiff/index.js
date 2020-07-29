var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 957,
    title: '来找茬',
    url: 'https://github.com/basebase',
    version: '1.0',
    scene: {
        preload: preload,
        create: create
    }
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
    this.load.image('eye', 'lance-overdose-loader-eye.png')
    this.load.image('lb1', 'lb1.jpeg')
    this.load.image('lb2', 'lb2.jpg')
    this.load.image('lb3', 'lb3.jpg')

    this.load.image('sc1', 'sc1.jpg')
}

var spriteArray = []

function create() {

    this.add.image(500, 510, 'sc1')

    // let i = 0
    // let x = 1
    // let y = 1
    // while (i < 6) {

    //     if (x * 100 + 100 >= 800) {
    //         y = y * 2.5
    //         x = 1
    //         let tmpSprite = this.add.sprite(x * 100, y * 140, 'lb1').setInteractive()
    //     } else {
    //         let tmpSprite = this.add.sprite(x * 120, y * 140, 'lb1').setInteractive()
    //         tmpSprite.setDisplaySize(100, 200)
    //         tmpSprite.setName("K" + i)
    //         spriteArray.push(tmpSprite)
    //         x ++
    //     }

    //     i ++
    // }

    // let count = 0
    // let diffImageArray = []

    // spriteArray.forEach(function(sprite, index) {
    //     sprite.on('pointerdown', function(pointer) {
    //         this.setTint(0xff0000)
    //         count ++
    //         diffImageArray.push(sprite)
    //     })

    //     sprite.on('pointerup', function(pointer) {
    //         if (count == 2) {
    //             console.log("sprite array ", spriteArray)
    //             // console.log("sprite array ", ...spriteArray)
    //             let spriteV1 = diffImageArray[0]
    //             let spriteV2 = diffImageArray[1]
    //             state = diffImage(diffImageArray)
    //             if (state) {
    //                 spriteV1.destroy()
    //                 spriteV2.destroy()

    //                 spriteArray.splice(spriteArray.indexOf(diffImageArray[0]), 1)
    //                 spriteArray.splice(spriteArray.indexOf(diffImageArray[1]), 1)
    //             } else {
    //                 spriteV1.clearTint()
    //                 spriteV2.clearTint()
    //             }

    //             diffImageArray = []
    //             count = 0
    //         }
    //     })
    // })    
}


function diffImage(diffImageArray) {
    let spriteV1 = diffImageArray[0]
    let spriteV2 = diffImageArray[1]

    let v1Name = spriteV1.name
    let v2Name = spriteV2.name

    let state = false

    if (diffBuff[v1Name] === null && diffBuff[v2Name] === null) {
        state = false
    } 

    let v1KeyValue = diffBuff[v1Name]
    let v2KeyValue = diffBuff[v2Name]

    if (v1KeyValue !== null && v1KeyValue === v2Name) {
        state = true
    }

    if (v2KeyValue !== null && v2KeyValue === v1Name) {
        state = true
    }

    return state
}