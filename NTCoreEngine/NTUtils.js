/* Created by Nikhil Peter on 2/11/2018 */

import NTSprite from "./2D/NTSprite";
import NTButton from "./2D/NTButton";
import NTSwitch from "./2D/NTSwitch";
import NTText from "./2D/NTText";
import NTMultiText from "./2D/NTMultiText";
import NTEngine from "./NTEngine";
import NTEventHandler from "./NTEventHandler";
import NTSpine from "./2D/NTSpine";
import NTBitMapText from "./2D/NTBitMapText";
import NTButtonUI from "./2D/NTButtonUI";
import NTSwitchUI from "./2D/NTSwitchUI";
import NTPIXIParticleContainer from "./2D/NTPIXIParticleContainer";
import NTRevoltFX from "./2D/NTRevoltFX";

let NTUtils ={

    gameData : {},

    createSprite(assetPath, objectData)
    {
        let ntObject = new NTSprite(objectData.w, objectData.h);
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.setTexture(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createAnimation(assetPath, objectData)
    {
        let ntObject = new NTSprite(objectData.w, objectData.h);
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.loadAnimation(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createButton(assetPath, objectData)
    {
        let ntObject = new NTButton();
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.setTexture(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createSwitch(assetPath, objectData)
    {
        let ntObject = new NTSwitch();
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.setTexture(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createButtonUI(assetPath, objectData)
    {
        let ntObject = new NTButtonUI();
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.setTexture(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createSwitchUI(assetPath, objectData)
    {
        let ntObject = new NTSwitchUI();
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.setTexture(assetPath, objectData.name);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createSpine(assetPath, objectData)
    {
        let ntObject = new NTSpine(assetPath + "_" + objectData.name);
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createText(objectData)
    {
        let ntObject = new NTText("", objectData.style);
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.position.set(objectData.x, objectData.y);
        ntObject.rotation = objectData.rotation === undefined ? 0 : -objectData.rotation * Math.PI/180;
        return ntObject;
    },

    createBitMapText(objectData)
    {
        let ntObject = new NTBitMapText("", objectData.style);
        ntObject.name = objectData.name;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createMultiText(assetPath, objectData)
    {
        let ntObject = new NTMultiText(assetPath);
        ntObject.name = objectData.name;
        ntObject.style = {label : objectData.style};
        ntObject.lineHeight = objectData.style ? objectData.style["lineHeight"] : null;
        ntObject.setSize(objectData.w, objectData.h);
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createPIXIParticle(assetFolder, objectData)
    {
        let ntObject = new NTPIXIParticleContainer(assetFolder + objectData.name);
        ntObject.name = objectData.name;
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    createRevoltFX(assetFolder, objectData)
    {
        let ntObject = new NTRevoltFX(assetFolder + objectData.name + ".json");
        ntObject.position.set(objectData.x, objectData.y);
        return ntObject;
    },

    getTexture(assetPath, objectName)
    {
        let offsetID = "_0";
        let assetNum = 0;

        let texture;

        while(NTUtils.getResource(assetPath + offsetID + assetNum + ".json") !== undefined)
        {
            if (NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".png"] !== undefined ||
                NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".jpg"] !== undefined ||
                NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".webp"] !== undefined)
            {
                texture =   NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".png"] ||
                            NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".jpg"] ||
                            NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".webp"];
                break;
            }

            assetNum++;

            if(assetNum >= 10)
                offsetID = "_";
        }

        if(texture === undefined)
            console.log("Texture Not Found : " + objectName);
        else
            return texture;
    },

    getBlurTexture(assetPath, objectName, blurX, blurY)
    {
        let sprite = new NTSprite();
        sprite.setTexture(assetPath, objectName);

        let bounds = sprite.display.getBounds();

        sprite.position.set(bounds.width/2, bounds.height/2);

        let blurFilter = new PIXI.filters.BlurFilter();
        sprite.display.blurFilter = blurFilter;
        sprite.display.filters = [blurFilter];
        blurFilter.blurX = blurX;
        blurFilter.blurY = blurY;


        let blurredTexture = new PIXI.RenderTexture.create(bounds.width, bounds.height);

        NTEngine.renderer.render(sprite.display, blurredTexture);

        return blurredTexture;
    },

    resizeTexture(assetPath, objectName, size)
    {
        let texture = NTUtils.getTexture(assetPath, objectName);

        let canvas = document.createElement("canvas"),
            context = canvas.getContext("2d"),
            bt = texture.baseTexture;

        bt.update();

        canvas.width = NTUtils.getNextPowerOfTwo(texture["orig"].width * size);
        canvas.height = NTUtils.getNextPowerOfTwo(texture["orig"].height * size);

        context.translate(canvas.width/2, canvas.height/2);

        let x=0, y=0;
        if(texture.trim !== null)
        {
            x = texture.trim.x * size;
            y = texture.trim.y * size;
        }
        let width = texture._frame.width * size;
        let height = texture._frame.height * size;

        if(texture._rotate !== 0)
            context.rotate(-Math.PI/2);
        context.drawImage(bt.resource.source, texture._frame.x, texture._frame.y, texture._frame.width, texture._frame.height, - width/2, - height/2, width, height);

        let newBaseTexture = new PIXI.BaseTexture(canvas, PIXI.SCALE_MODES.NEAREST);
        newBaseTexture.mipmap = true;
        let newTexture = new PIXI.Texture(newBaseTexture);

        if(texture._rotate !== 0)
            newTexture.frame = new PIXI.Rectangle(Math.floor(canvas.width/2 - x - height/2), Math.floor(canvas.height/2 - y - width/2), Math.floor(texture.orig.width * size), Math.floor(texture.orig.height * size));
        else
            newTexture.frame = new PIXI.Rectangle(Math.floor(canvas.width/2 - x - width/2), Math.floor(canvas.height/2 - y - height/2), Math.floor(texture.orig.width * size), Math.floor(texture.orig.height * size));
        return newTexture;
    },

    getNextPowerOfTwo(number)
    {
        number = Math.ceil(number);
        if (number > 0 && (number & (number - 1)) == 0)
            return number;
        else {
            let result = 1;
            while (result < number) result <<= 1;
            return result;
        }
    },


    getResource(resPath)
    {
        return PIXI.Loader.shared.resources[resPath];
    },

    load(resPath, callBack , onErrorCallback)
    {
        let loader = new PIXI.Loader();
        loader.add(resPath);
        loader.load((item)=>{
            PIXI.Loader.shared.resources[resPath] = item.resources[resPath].data;
            callBack(item.resources[resPath].data);
        });
        loader.onError.once(()=>{
            NTUtils.waitForReconnection(()=>{
                NTUtils.load(resPath, callBack, onErrorCallback)
            })
        });
    },

    waitForReconnection(callback){
        if(navigator.onLine){
            console.log("================> Assets Reloading");
            callback();
        }
        else {
            setTimeout(()=>{
               NTUtils.waitForReconnection(callback);
            },0)
        }
    },

    getRandomInt(min, max) // min and max both included
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    getRandomFloat(min, max) // min and max both included
    {
        return Math.random() * (max - min) + min;
    },

    aggregation(baseClass, ...mixins)
    {
            class base extends baseClass {
                constructor (...args) {
                    super(...args);
                    mixins.forEach((mixin) => {
                        copyProps(this,(new mixin(...args)));
                    });
                }
            }
            let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
                Object.getOwnPropertyNames(source)
                      .concat(Object.getOwnPropertySymbols(source))
                      .forEach((prop) => {
                         if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
                       })
            }
            mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
                copyProps(base.prototype, mixin.prototype);
               copyProps(base, mixin);
            });
            return base;
    },

    getUrlVars()
    {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    },

    cloneJSON(obj)
    {
        return JSON.parse(JSON.stringify(obj))
    },

    getDataTree(data, key, id)
    {
        let inData;
        for(let i=0; i<data.length; i++)
        {
            if(data[i][key] === id)
            {
                inData = data[i];
                break;
            }
        }

        return inData;
    },

    postImage()
    {
        let canvasData = NTEngine.renderer.view.toDataURL("image/png");
        let ajax = new XMLHttpRequest();
        ajax.open("POST",'/pr/custom/testSave.php',false);
        ajax.setRequestHeader('Content-Type', 'application/upload');
        ajax.send(canvasData );
    },

    saveToLocalStorage (key, object)
    {
        localStorage.setItem(key, JSON.stringify(object));
    },

    getLocalStorage (key)
    {
        return JSON.parse(localStorage.getItem(key));
    },

    saveCanvasView(view, width, height, quality, name)
    {
        let link = document.createElement('a');
        link.href = this.getCanvasDataUrl(view, width, height, quality);
        link.download = name;
        link.click();
    },

    getCanvasDataUrl(view, width, height, quality)
    {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(view, 0, 0, width, height);

        return canvas.toDataURL('image/jpeg', quality);
    },

    changeColorStrength(col, amt)
    {

        let usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        let num = parseInt(col,16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return "0x" + (g | (b << 8) | (r << 16)).toString(16);

    },

    checkMobile()
    {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        )
            return true;
        else
            return false;
    },

    getDevice()
    {
        if(!NTUtils.checkMobile())
            return NTEngine.DEVICES.WEB;

        let device;
        if(navigator.userAgent.match(/iPhone/i))
            device = NTEngine.DEVICES.IPHONE;
        else if(navigator.userAgent.match(/iPad/i))
            device = NTEngine.DEVICES.IPAD;
        else if(navigator.userAgent.match(/Android/i))
            device = NTEngine.DEVICES.ANDROID;
        else
            device = NTEngine.DEVICES.OTHER;

        return device;
    },

    toggleFullScreen()
    {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }

        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    },

    fullScreen()
    {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    },

    rgbToHex(r, g, b)
    {
        return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
};

window.addEventListener("resize", (event) =>{

    let data = {};

    if (screen.height === window.innerHeight)
        data["status"] = true;
    else
        data["status"] = false;

    NTEventHandler.dispatchEvent(NTEngine.EVENTS.FULL_SCREEN, data);
});



export default NTUtils;