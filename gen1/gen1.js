const { match } = require('assert')
const { createCanvas } = require('canvas')
const exp = require('constants')
const fs = require('fs')

var hash = function (s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o
    if (s) {
        a = 0
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h)
            a = (a << 6 & 268435455) + o + (o << 14)
            c = a & 266338304
            a = c !== 0 ? a ^ c >> 21 : a
        }
    }
    return String(a)
}

// http://mrl.nyu.edu/~perlin/noise/
var ImprovedNoise = function () {

    var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10,
        23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87,
        174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
        133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
        89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5,
        202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119,
        248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
        178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
        14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
        93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]

    for (var i = 0; i < 256; i++) {

        p[256 + i] = p[i]

    }

    function fade(t) {

        return t * t * t * (t * (t * 6 - 15) + 10)

    }

    function lerp(t, a, b) {

        return a + t * (b - a)

    }

    function grad(hash, x, y, z) {

        var h = hash & 15
        var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z
        return ((h & 1) == 0 ? u : - u) + ((h & 2) == 0 ? v : - v)

    }

    return {

        noise: function (x, y, z) {

            var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z)

            var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255

            x -= floorX
            y -= floorY
            z -= floorZ

            var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1

            var u = fade(x), v = fade(y), w = fade(z)

            var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z

            return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
                grad(p[BA], xMinus1, y, z)),
                lerp(u, grad(p[AB], x, yMinus1, z),
                    grad(p[BB], xMinus1, yMinus1, z))),
                lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
                    grad(p[BA + 1], xMinus1, y, z - 1)),
                    lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
                        grad(p[BB + 1], xMinus1, yMinus1, zMinus1))))

        }
    }

}

var worldWidth = 64, worldDepth = 64
const canvas = createCanvas(worldWidth, worldDepth)

var ctx = canvas.getContext('2d')

var featureProbability = {
    pier: 0.2,
    lighthouse: 0.1,
    carrier: 0.1,
    hut: 0.6,
    kraken:0.1
}

var highestPoint = 0
var quadsUsed = [];

function createIsland(name) {

    var features = {
        pier: Math.random() < featureProbability.pier,
        lighthouse: Math.random() < featureProbability.lighthouse,
        carrier: Math.random() < featureProbability.carrier,
        hut: Math.random() < featureProbability.hut,
        kraken : false
    }

    if(!features.lighthouse){
        if(!quadsUsed[0])
            features.kraken =  Math.random() < featureProbability.kraken
    }

    var depth = Math.random() * 1 + 0.55

    quadsUsed = [false, false, false, false]

    var data = generateHeight(worldWidth, worldDepth, depth)

    var exportData = {}
    exportData.pal = ["#FDD692", "#80FF72", "#248232", "#474448", "#FFF", "#777"]
    exportData.voxels = []
    exportData.objects = []

    //export heightmap data
    exportData.heightmap = []
    for (var i = 0; i < worldWidth; i++) {
        exportData.heightmap[i] = []
    }

    // determine highest point and set the canvas size
    var highest = 0
    data.forEach((dataItem, i) => {
        exportData.heightmap[i % worldWidth][Math.floor(i / worldWidth)] = dataItem
        if (dataItem > highest) {
            highest = dataItem
        }
    })
    highestPoint = highest
    canvas.height = highest * worldWidth + 64

    if (features.lighthouse) {
        var pos = getOffshoreLocation(3)
        exportData.objects.push({
            object: "lighthouse",
            x: pos.x,
            y: pos.y,
            z: pos.z
        })
    }

    // draw topography
    for (var i = highest; i >= 0; i--) {
        data.forEach((dataItem, j) => {
            if (dataItem > i) {
                //add here
                var w = worldWidth
                var a = worldWidth * worldWidth
                if (data[j] > i + 1 &&
                    data[j - 1] > i &&
                    data[j + 1] > i &&
                    data[j + w] > i &&
                    data[j - w] > i) {
    
                } else {
                    var x = j % worldWidth
                    var y = Math.floor(j / worldWidth) + (highest - i) * worldWidth
                    drawSquare(x, y, i, exportData, features)
                }
            }
        })
    }

    if (features.carrier) {
        var pos = getOffshoreLocation(0)
        drawCarrier(pos.x, pos.y, highest)
        exportData.objects.push({
            object: "carrier",
            x: pos.x,
            y: pos.y,
            z: pos.z
        })
    }

    if (features.kraken) {
        var pos = {x : 4, y : 32, z: 0}
        drawKraken(pos.x, pos.y, highest)
        exportData.objects.push({
            object: "kraken",
            x: pos.x,
            y: pos.y,
            z: pos.z
        })
    }
    
    if (features.lighthouse) {
        var obj = exportData.objects.find(element => element.object === "lighthouse")
        drawLighthouse(obj.x, obj.y, highest)
    }
    
    if (features.hut) {
        var pos = getHutLocation(exportData.heightmap)
        console.log(pos)
        drawHut(pos, highest)
        exportData.objects.push({
            object: "hut",
            x: pos.x,
            y: pos.y,
            z: pos.z
        })
    }

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./' + name + '.png', buffer)
    exportData.name = name

    console.log(exportData.objects)
    return exportData
}

var numIslands = 1
var islands = []

for(var i = 0; i < numIslands; i++){
    islands.push(createIsland(String(i).padStart(4, '0')))
}

try {
    const data = fs.writeFileSync('./data.txt', JSON.stringify(islands))
} catch (err) {
    console.error(err)
}

function getOffshoreLocation(dist) {
    var corner = Math.floor(Math.random() * 4)
    var xmod = Math.floor(Math.random() * 3 + dist)
    var ymod = Math.floor(Math.random() * 3 + dist)
    if(quadsUsed[corner] == true){
        console.log("recursion")
        return getOffshoreLocation(dist);
    }
    
    quadsUsed[corner] = true
    if (corner == 0) {
        return { x: 16 + xmod, y: 16 + ymod, z: 0 }
    } else if (corner == 1) {
        return { x: 16 + xmod, y: 56 - ymod, z: 0 }
    } else if (corner == 2) {
        return { x: 56 - xmod, y: 16 + ymod, z: 0 }
    } else if (corner == 3) {
        return { x: 56 - xmod, y: 56 - ymod, z: 0 }
    }
}

function getHutLocation(data) {
    for (var i = 1; i < data.length - 1; i++) {
        for (var j = 1; j < data[i].length - 1; j++) {
            var height = data[i][j]
            if (height > 1) {
                if (data[i + 1][j] == height &&
                    data[i - 1][j] == height &&
                    data[i][j + 1] == height &&
                    data[i][j - 1] == height) {
                    return {
                        x: i,
                        y: j,
                        z: height
                    }
                }
            }
        }
    }
}

function drawHut(pos, highest) {
    ctx.fillStyle = "#aa6746"
    ctx.fillRect(pos.x, pos.y + (highest - pos.z) * worldWidth, 2, 2)
    ctx.fillRect(pos.x, pos.y - 64 + (highest - pos.z) * worldWidth, 1, 1)
}

function drawKraken(x, y, highest) {
    var yOffset = highest * 64
    ctx.fillStyle = "#33ff33"
    ctx.fillRect(x-2+1, y + yOffset - 2, 2, 4)
    ctx.fillRect(x-2, y + yOffset+1 - 2, 4, 2)
    ctx.fillRect(x-2, y + yOffset - 2 + 5, 1, 1)
    ctx.fillRect(x-2, y + yOffset - 2 + 8, 1, 1)
    ctx.fillRect(x-2+5, y + yOffset - 2, 1, 1)

    yOffset -= 64
    ctx.fillRect(x-2, y + yOffset - 2, 4, 4)
    ctx.fillRect(x-2, y + yOffset - 2 + 6, 1, 1)
    ctx.fillRect(x-2, y + yOffset - 2 + 7, 1, 1)
    ctx.fillRect(x-2+5, y + yOffset - 2, 1, 1)

    yOffset -= 64
    ctx.fillRect(x-2, y + yOffset - 2, 4, 4)
    ctx.fillRect(x-2+5, y + yOffset - 2, 1, 1)
    ctx.fillStyle = "#fff"
    ctx.fillRect(x-2+3, y + yOffset - 2+1, 1, 2)
    
    ctx.fillStyle = "#33ff33"
    yOffset -= 64
    ctx.fillRect(x-2+1, y + yOffset - 2, 2, 4)
    ctx.fillRect(x-2, y + yOffset+1 - 2, 4, 2)
    ctx.fillRect(x-2+6, y + yOffset - 2, 1, 1)
}

function drawCarrier(x, y, highest) {
    var yOffset = highest * 64
    //water
    ctx.fillStyle = "#aaaaFF"
    ctx.fillRect(x, y + yOffset + 3, 1, 1)
    ctx.fillRect(x, y + yOffset + 4, 1, 1)
    ctx.fillRect(x, y + yOffset + 5, 1, 1)
    ctx.fillRect(x, y + yOffset + 6, 1, 1)

    //hull
    yOffset -= 64
    ctx.fillStyle = "#A20021"
    ctx.fillRect(x - 1, y + yOffset - 3, 3, 7)

    //deck
    yOffset -= 64
    ctx.fillRect(x - 1, y + yOffset - 3, 3, 7)

    //top
    yOffset -= 64
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(x, y + yOffset + 3, 1, 1)
    ctx.fillRect(x + 1, y + yOffset + 3, 1, 1)
    ctx.fillRect(x - 1, y + yOffset + 3, 1, 1)
    ctx.fillRect(x, y + yOffset + 2, 1, 1)
}

function drawLighthouse(x, y, highest) {
    var yOffset = highest * 64
    ctx.fillStyle = "#aaaaaa"

    //base
    ctx.fillRect(x - 1, y + yOffset, 1, 1)
    ctx.fillRect(x + 1, y + yOffset, 1, 1)
    ctx.fillRect(x + 4, y + yOffset, 1, 1)
    ctx.fillRect(x, y + yOffset + 1, 1, 1)
    ctx.fillRect(x, y + yOffset - 1, 1, 1)
    ctx.fillRect(x, y + yOffset - 3, 1, 1)
    ctx.fillRect(x, y + yOffset - 2, 1, 1)

    yOffset -= 64
    ctx.fillStyle = "#A20021"
    ctx.fillRect(x, y + yOffset, 1, 1)

    yOffset -= 64
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(x, y + yOffset, 1, 1)

    yOffset -= 64
    ctx.fillStyle = "#A20021"
    ctx.fillRect(x, y + yOffset, 1, 1)

    yOffset -= 64
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(x, y + yOffset, 1, 1)

    yOffset -= 64
    ctx.fillStyle = "#A20021"
    ctx.fillRect(x, y + yOffset, 1, 1)
}

function drawSquare(x, y, height, exportData, features, rocks=false) {
    var offset = Math.floor(Math.random() * 5)
    var colorHeight = height
    if (height != 1) {
        colorHeight += offset
    }
    var palIndex

    if (colorHeight < 5) {
        if(rocks){
            palIndex = 5
        } else{

            palIndex = 0
        }

        if(palIndex == 0 && features.lighthouse){
            var obj = exportData.objects.find(element => element.object === "lighthouse")
            // console.log(getDistance(x,Math.floor(y / height),obj.x, obj.y))
            var dist = getDistance(x,Math.floor(y / (highestPoint-height)),obj.x, obj.y)
            if(dist < Math.random() * 10 + 45){
                palIndex = 5
            }
        }

    } else if (colorHeight < 7) {
        palIndex = 1
    } else if (colorHeight < 12) {
        palIndex = 2
    } else if (colorHeight < 18) {
        palIndex = 3
    } else {
        palIndex = 4
    }

    if(colorHeight < 3 && Math.random() < 0.1){
        var q = getQuadrant(x, Math.floor(y / (highestPoint - height)))
        drawSquare(Math.floor(Math.random() * 5 * q.x) + x, Math.floor(Math.random() * 5 * q.y) + y, 0, exportData, features, true)
    }
    exportData.voxels.push({
        x: x,
        y: Math.floor(y / (highestPoint - height)),
        z: height,
        i: palIndex
    })
    ctx.fillStyle = exportData.pal[palIndex]
    ctx.fillRect(x, y, 1, 1)
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) )
}

function getQuadrant(x,y){
    if(x < worldWidth/2){
        if(y < worldWidth/2){
            return {x:-1, y:-1} //nw
        } else {
            return {x:-1, y:+1} //sw
        }
    } else{
        if(y < worldWidth/2){
            return {x:+1, y:+1} //ne
        } else {
            return {x:-1, y:-1} //se
        }
    }
}

function generateHeight(width, height, depth) {
    var size = width * height, data = new Uint8Array(size),
        perlin = new ImprovedNoise(), quality = 0.2, z = Math.random() * 100
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < size; i++) {
            var x = i % width, y = ~ ~(i / width)
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75)
            // data[i] = 10
            if (j == 3) {
                var distance = Math.sqrt(Math.pow(Math.abs(x - width * .5), 2) + Math.pow(Math.abs(y - width * .5), 2)) / width
                var power = 10
                // var height =  Math.pow(0.5 + 0.5 * Math.cos(Math.PI * distance), power)*depth
                var height = 1 / (distance * 3 + 1)
                height = height * Math.pow(0.5 + 0.5 * Math.cos(Math.PI * distance), power)
                data[i] = (data[i] * (height * depth))
            }
        }
        quality *= 5

    }
    return data
}
