/* Created by Nikhil Peter on 3/15/2018 */

import NTSprite from "./NTSprite";
import NTEventHandler from "../NTEventHandler";
import NTEngine from "../NTEngine";
import ButtonStates from "./ButtonStates";

export default class NTButton extends NTSprite
{

    constructor()
    {
        super();

        this._touchEnabled = true;

        this._ntObject.buttonMode = true;
        this._ntObject.interactive = true;

        this._buttonState = ButtonStates.NORMAL;

        this.addListeners();
    }

    addListeners()
    {
        this._ntObject.on('mouseover', this.onMouseOver.bind(this));
        this._ntObject.on('mouseout', this.onMouseOut.bind(this));

        this._ntObject.on('pointerdown', this.onPointerDown.bind(this));
        this._ntObject.on('pointerup', this.onPointerUp.bind(this));
    }

    onMouseOver()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.HOVER;
        this.showTexture();
    }

    onMouseOut()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.NORMAL;
        this.showTexture();
    }

    onPointerDown(event)
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.PRESSED;
        this.showTexture();

        event.stopPropagation ();
    }

    onPointerUp(event)
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.NORMAL;
        this.showTexture();

        event.stopPropagation ();

        this.invokeCallback();
    }

    blink(interval)
    {
        this._blinkState = ButtonStates.NORMAL;

        let self = this;
        this._timerId =  setInterval(function ()
        {
            if(self._buttonState !== ButtonStates.NORMAL)
                return;

            if(self._blinkState === ButtonStates.NORMAL)
                self._blinkState = ButtonStates.HOVER;
            else
                self._blinkState = ButtonStates.NORMAL;

            self.showTexture(self._blinkState);
        }, interval/2);

        return this._timerId;
    }

    stopBlink()
    {
        clearInterval(this._timerId);
    }


    setTexture(assetPath, objectName)
    {
        this._assetPath = assetPath;
        this._name = objectName;

        this.showTexture();
    }

    showTexture(id)
    {
        id = id || this._buttonState;
        super.setTexture(this._assetPath, this._name + id);
    }

    invokeCallback()
    {
        super.invokeCallback();

        NTEventHandler.dispatchEvent(NTEngine.EVENTS.BUTTON_CLICK, this);
    }

    set touchEnabled(boolean)
    {
        this._touchEnabled = boolean;

        this._ntObject.buttonMode = boolean;
        this._ntObject.interactive = boolean;

        if(this._touchEnabled)
        {
            this._buttonState = ButtonStates.NORMAL;
        }
        else
        {
            this._buttonState = ButtonStates.DISABLED;
        }

        this.showTexture();
    }

    get touchEnabled()
    {
        return this._touchEnabled;
    }

    destroy()
    {
        super.destroy();

        this.stopBlink();
    }
}