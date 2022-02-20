

import NTEngine from "NTCoreEngine/NTEngine";
import NTUtils from "NTCoreEngine/NTUtils";
import NTGameScene from "NTCoreEngine/NTGameScene";
import MenuScreen from "./MenuScreen";
import LoadingScreen from "./LoadingScreen";
import NTBlankLoader from "NTCoreEngine/NTBlankLoader";
import loadRes from "./resource";



NTEngine.screenWidth = 1280;
NTEngine.screenHeight = 720;

let loader = new NTBlankLoader();
loader.loadResource(loadRes);

NTEngine.initialize = function () {

    let gameScene = new NTGameScene();
    NTEngine.screenManager.loadScene(gameScene);

    NTEngine.loadGame();
};

NTEngine.loadGame = function () {
  
    let res = NTUtils.getResource("res/resource.json")["data"]["resList"];

    let screen = new MenuScreen("res/MenuScreen/", "MenuScreen");
    NTEngine.screenManager.loadNewScreen(new LoadingScreen(screen, res));
};

window.addEventListener('focus', function() {
    Howler.volume(NTEngine.audioManager.volume);
});

window.addEventListener('blur', function() {
    Howler.volume(0);
});

