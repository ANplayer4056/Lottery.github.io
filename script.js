var mypixi;
var ScreenWW;
var ScreenHH;
var contentHH = 300;
var contentWW = 310;
var myLoader = new PIXI.Loader();
var myGraphics = new PIXI.Graphics();

window.onload = function () {
    pixiInit();
    drawGame();
}

function pixiInit() {
    ScreenHH = window.innerHeight;
    ScreenWW = window.innerWidth;

    mypixi = new PIXI.Application({ width: contentWW, height: contentHH });
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector(".myContent").appendChild(mypixi.view);
    mypixi.renderer.backgroundColor = 0xffffff;

    mypixi.renderer.view.style = "border: 3px solid #EBD55F ;border-radius: 3px;";

    // 尺寸自動更新
    // mypixi.renderer.autoDensity = true;
    // mypixi.renderer.resize(window.innerWidth, window.innerHeight);
}

function drawGame() {
    myLoader
        .add('contentbg', './image/7PGCQ1b.png')
        .add('symbols', './image/MIdo9nL.png')

        .load((loader, res) => {
            // 資源載入完畢才執行

            /**
             * console.log 自訂樣式
             */
            console.log('%c PixiJS ✩ 圖片載入完畢 ✩ ', 'color:rgb(255, 86, 114);width:300px;height:80px;background-size:100%;background-color:#000;padding: 5px;border-left: 14px solid rgb(250, 94, 172); border-right: 14px solid rgb(250, 94, 172);')

            /**
             * console.log 警告樣式
             * 
             * console.warn('PixiJS Resource: ', '圖片載入完畢');
             */

            //  畫刮開底圖
            var myContentBG = new PIXI.Sprite(res.contentbg.texture);
            mypixi.stage.addChild(myContentBG);

            // 圖案
            var mySymbols = new PIXI.Sprite(res.symbols.texture);
            mySymbols.x = contentWW / 2 - 50;
            mySymbols.y = contentHH / 2 - 80;
            mypixi.stage.addChild(mySymbols);

            // 中獎文字
            let myWin = `恭 喜 中 獎  ${Math.floor(Math.random() * 100) + 1} 點`;
            let message = new PIXI.Text(myWin, {
                fontFamily: "Arial",
                fontSize: 20,
                strokeThickness: 1
            });
            message.x = contentWW / 4;
            message.y = contentHH / 2 + 25;
            mypixi.stage.addChild(message);


            // 純css 模擬刮刮區 
            var cancanVas = document.getElementById("myCanvas");
            var canWW = cancanVas.width;
            var canHH = cancanVas.height;

            var cxt = cancanVas.getContext("2d");
            cxt.fillStyle = "lightgray";
            cxt.fillRect(0, 0, canWW, canHH);
            // 'destination-out'只保留新、舊圖形非重疊的舊圖形區域，其餘皆變為透明。
            cxt.globalCompositeOperation = 'destination-out';
            cxt.lineWidth = '30';
            cxt.lineCap = 'round';

            cancanVas.onmousedown = function (event) {
                var ev = ev || window.event;
                var lastw = ev.clientX - cancanVas.offsetLeft;//獲取鼠標相對於canvas畫布的x,y值
                var lasth = ev.clientY - cancanVas.offsetTop;//
                cxt.lineTo(lastw, lasth);
                cxt.beginPath();
                cancanVas.onmousemove = function (event) {
                    var ev = ev || window.event;
                    var lastw = ev.clientX - cancanVas.offsetLeft;
                    var lasth = ev.clientY - cancanVas.offsetTop;
                    cxt.lineTo(lastw, lasth);
                    cxt.stroke();
                }
                cancanVas.onmouseup = function (event) {
                    cancanVas.onmousemove = null;
                }
            }

            cancanVas.ontouchstart = function (event) {
                var ev = ev || window.event;
                var lastw = ev.targetTouches[0].clientX - cancanVas.offsetLeft;//獲取鼠標相對於canvas畫布的x,y值
                var lasth = ev.targetTouches[0].clientY- cancanVas.offsetTop;//

                cxt.lineTo(lastw, lasth);
                cxt.beginPath();
                cancanVas.ontouchmove = function (event) {
                    var ev = ev || window.event;
                    var lastw = ev.targetTouches[0].clientX - cancanVas.offsetLeft;
                    var lasth = ev.targetTouches[0].clientY - cancanVas.offsetTop;
                    cxt.lineTo(lastw, lasth);
                    cxt.stroke();
                }
                cancanVas.ontouchend = function (event) {
                    cancanVas.ontouchmove = null;
                }
            }
        })
}
