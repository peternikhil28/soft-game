/* Created by Nikhil Peter on 3/15/2018 */

import NTUtils from "./NTUtils";
import NTScreenManager from "./NTScreenManager";
import NTAudioManager from "./NTAudioManager";
import NTServer from "./NTServer";
import TWEEN from "@tweenjs/tween.js";

let NTEngine = {};

NTEngine.screenWidth = null;
NTEngine.screenHeight = null;

NTEngine.gamescene = null;

NTEngine.renderer = null;

NTEngine.ticker = null;

NTEngine.fps = 0;

NTEngine.isMobile = NTUtils.checkMobile();

NTEngine.screenManager = new NTScreenManager();

NTEngine.audioManager = new NTAudioManager();

NTEngine.server = new NTServer();

NTEngine.EVENTS = {};
NTEngine.EVENTS.COIN_UPDATE = "COIN_UPDATE";
NTEngine.EVENTS.API_CONNECTOR_CANVAS = "API_CONNECTOR_CANVAS";
NTEngine.EVENTS.API_CONNECTOR_WEB = "API_CONNECTOR_WEB";
NTEngine.EVENTS.BUTTON_CLICK = "BUTTON_CLICK";
NTEngine.EVENTS.FULL_SCREEN = "FULL_SCREEN";
NTEngine.EVENTS.NETWORK = "NETWORK";
NTEngine.EVENTS.IOS_FULL_SCREEN = "IOS_FULL_SCREEN";
NTEngine.EVENTS.TEXT_CREATED = "TEXT_CREATED";
NTEngine.EVENTS.TEXT_UPDATED = "TEXT_UPDATED";
NTEngine.EVENTS.GAME_SCREEN_CREATED = "GAME_SCREEN_CREATED";
NTEngine.EVENTS.GAME_SCREEN_DESTROYED = "GAME_SCREEN_DESTROYED";
NTEngine.EVENTS.LOAD_ERROR = "LOAD_ERROR";
NTEngine.EVENTS.ON_REQUEST_SUCCESS = "ON_REQUEST_SUCCESS";

NTEngine.EASING = TWEEN.Easing;

NTEngine.TWEEN_PARAMS = {};
NTEngine.TWEEN_PARAMS.DELAY = "delay";
NTEngine.TWEEN_PARAMS.EASING = "easing";
NTEngine.TWEEN_PARAMS.REPEAT = "repeat";
NTEngine.TWEEN_PARAMS.YOYO = "yoyo";

NTEngine.DEVICES = {};
NTEngine.DEVICES.WEB = "WEB";
NTEngine.DEVICES.ANDROID = "ANDROID";
NTEngine.DEVICES.IPHONE = "IPHONE";
NTEngine.DEVICES.IPAD = "IPAD";
NTEngine.DEVICES.OTHER = "OTHER";

export default NTEngine;