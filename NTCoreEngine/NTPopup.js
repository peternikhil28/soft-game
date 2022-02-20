/* Created by Nikhil Peter on 3/29/2018 */

import NTGameScreen from "./NTGameScreen";
import NTGraphics from "./2D/NTGraphics";
import NTEngine from "./NTEngine";
import NTContainer from "./2D/NTContainer";
import TWEEN from "@tweenjs/tween.js";

export default class NTPopup extends NTGameScreen
{
    constructor(assetPath, layoutName, onCloseCallback)
    {
        super(assetPath, layoutName);

        this._onCloseCallback = onCloseCallback;

        this.setBackground();

        this.setPopupContainer();
    }

    setBackground()
    {
        this._backgroundLayer = new NTGraphics();
        this._backgroundLayer.display.beginFill("0x000000");
        this._backgroundLayer.display.drawRect(0, 0, NTEngine.screenWidth, NTEngine.screenHeight);
        this._backgroundLayer.display.alpha = 0.5;
        super.addChild(this._backgroundLayer);
        
        this._backgroundLayer.display.interactive = true;
        this._backgroundLayer.display.hitArea = new PIXI.Rectangle(0, 0, NTEngine.screenWidth, NTEngine.screenHeight);
        this._backgroundLayer.display.on('mouseover', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('mouseout', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('pointerdown', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('pointerup', this.stopPropagation.bind(this));
    }

    stopPropagation(e)
    {
        e.stopPropagation();
    }

    setPopupContainer()
    {
        this._container = new NTContainer();
        this._container.position.set(NTEngine.screenWidth/2, NTEngine.screenHeight/2);
        super.addChild(this._container);
    }

    addChild(child, root)
    {
        if(root)
            super.addChild(child);
        else
        {
            this._container.addChild(child);

            child.position.x -= NTEngine.screenWidth/2;
            child.position.y -= NTEngine.screenHeight/2;
        }
    }

    onReveal()
    {
        this.popInAction();
    }

    popInAction()
    {
        this._container.display.scale = 0;
        this._container.actionScale(1000, 1, {[NTEngine.TWEEN_PARAMS.EASING] : TWEEN.Easing.Elastic.Out}, this.popInActionComplete.bind(this));
    }

    popInActionComplete()
    {

    }

    onCloseStarted()
    {

    }

    onCloseClicked()
    {
        this.onCloseStarted();
        this.popOutAction();
    }

    popOutAction()
    {
        this._container.actionScale(200, 0, null,  this.popOutActionComplete.bind(this));
    }

    popOutActionComplete()
    {
        if(this._onCloseCallback !== undefined)
        {
            this._onCloseCallback.call();
        }
        this.removeScreen();
    }
}