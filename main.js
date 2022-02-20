import "./YKCoreEngine/IEPlugins"
import "./YKHTML5Engine/IOSPlugin"

import YKEngine from "./YKCoreEngine/YKEngine";
import LoadingScreen from "./src/LoadingScreen";
import GameScene from "./src/GameScene";
import YKSlotAPI from "./YKSlotEngine/YKSlotAPI";
import SlotMachineAPI from "./SlotMachineAPI";
import YKUtils from "./YKCoreEngine/YKUtils";
import {loadRes} from "./src/resource";
import YKBlankLoader from "./YKCoreEngine/YKBlankLoader";
import YKSlotUtils from "./YKSlotEngine/YKSlotUtils";
import YKEventHandler from "./YKCoreEngine/YKEventHandler";


YKEngine.screenWidth = YKEngine.isMobile ? 960 : YKSlotUtils.isFullHd ? 1920:1280;
YKEngine.screenHeight = YKEngine.isMobile ? 540 : YKSlotUtils.isFullHd ? 1080:720;


YKSlotUtils.cheatMode = process.env.NODE_ENV === "development";

YKEngine.rootPath = YKEngine.isMobile ?  "WebContents/res/" : YKSlotUtils.isFullHd ? "res@1080/" : "res/";

let loader = new YKBlankLoader();
loader.loadResource(loadRes);

YKEngine.initialize = function () {

    let gameScene = new GameScene();
    YKEngine.screenManager.loadScene(gameScene);

    YKUtils.config = window.config;

    YKSlotAPI.initialize();

    YKEngine.loadMachine();
};

YKEngine.loadMachine = function () {

    let machineName = GAME_NAME || YKUtils.getUrlVars().machineName;

    YKSlotUtils.MACHINE_NAME = machineName;
    
    let res = YKUtils.getResource(window.config["COMMON_RES_PATH"] + YKEngine.rootPath + "resource.json")["data"]["resList"];
    res = res.map(x => window.config["COMMON_RES_PATH"] + x);

    let params = {};
    params.assetFolder = YKEngine.rootPath + "SlotMachines/" + machineName + "/";
    params.layoutName = "Machine";
    params.gameData = window.gameData;

    let screen = new SlotMachineAPI(params);
    YKEngine.screenManager.loadNewScreen(new LoadingScreen(screen, res));
};

window.addEventListener('focus', function() {
    Howler.volume(YKEngine.audioManager.volume);
});

window.addEventListener('blur', function() {
    Howler.volume(0);
});


function closeSession()
{
    onSessionExpired();

    YKEngine.audioManager.stopAllSounds();
    YKEngine.audioManager.volume = 0;

    YKEngine.gamescene.stopRender();
}


YKEventHandler.addEventListener(YKEngine.EVENTS.LOAD_ERROR, closeSession);

YKEventHandler.addEventListener(YKEngine.EVENTS.TEXT_CREATED, (data)=>{
    let object = data.detail;
    object.style.fontSize *= 1.5;
    object.style.lineHeight *= 1.5;
    object.scale.set(0.75, 0.75);
});

YKEventHandler.addEventListener(YKEngine.EVENTS.TEXT_UPDATED, (data)=>{
    let target = data.detail;
    if(target.name)
        formatCurrency(target);
});

function formatCurrency(target){
    let textValue = target.text;
    let numberPattern =  /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    let regResult;
    let newValue;
    if(textValue){
        textValue = textValue.replace(/,(?=.*\.\d+)/g, '');
        regResult = textValue.match(numberPattern);
        if(regResult)
        regResult.map((value)=>{
            newValue = textValue.replace(value,addSISymbol(parseFloat(value)));
            if(value >= 1e5 )
                target.text = newValue;

        });
    }
}

function addSISymbol (n){
    if (n < 1e5) return n;
    if (n >= 1e5 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};



