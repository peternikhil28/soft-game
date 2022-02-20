/* Created by Nikhil Peter on 2/11/2020 */

import NTEngine from "./NTEngine";
import NTSpineGameObject from "./NTSpineGameObject";
import NTGraphics from "./2D/NTGraphics";

export default class NTSpinePopup extends NTSpineGameObject{

    constructor(assetPath, onCloseCallback, animationName)
    {
        super(assetPath);
        this._onCloseCallback = onCloseCallback;

        this._animationName = animationName || "animation";
    }

    stopPropagation(e)
    {
        e.stopPropagation();
    }


    onLayoutComplete()
    {
        this.position.set(NTEngine.screenWidth / 2, NTEngine.screenHeight / 2);
        NTEngine.screenManager.reveal(this);

        this.addUnderlay();
    }

    addUnderlay()
    {
        this._underlay = new NTGraphics();
        this._underlay.display.beginFill("0x000000");
        this._underlay.display.drawRect(0, 0, NTEngine.screenWidth, NTEngine.screenHeight);
        this._underlay.display.alpha = 0.5;

        this._underlay.display.interactive = true;
        this._underlay.display.hitArea = new PIXI.Rectangle(0, 0, NTEngine.screenWidth, NTEngine.screenHeight);
        this._underlay.display.on('mouseover', this.stopPropagation.bind(this));
        this._underlay.display.on('mouseout', this.stopPropagation.bind(this));
        this._underlay.display.on('pointerdown', this.stopPropagation.bind(this));
        this._underlay.display.on('pointerup', this.stopPropagation.bind(this));
        this.parent.addChildAt(this._underlay, this.parent.getChildIndex(this));
    }

    onReveal()
    {
        this.state.setAnimation(0, this._animationName);
        this.state.addListener({complete: ()=> setTimeout(this.closePopup.bind(this), 200)});
    }

    removeScreen()
    {
        NTEngine.screenManager.removeScreen(this);
    }
  
    closePopup()
    {
        if(this._onCloseCallback)
            this._onCloseCallback();

        this.removeScreen();     
    }

    destroy()
    {
        this.parent.removeChild(this._underlay);

        super.destroy();
    }
}