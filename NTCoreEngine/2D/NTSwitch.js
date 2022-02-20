/* Created by Nikhil Peter on 1/15/2018 */

import NTButton from "./NTButton";
import NTUtils from "../NTUtils";
import ButtonStates from "./ButtonStates";

export default class NTSwitch extends NTButton
{

    constructor(width, height)
    {
        super(width, height);

        this._switchOn = false;
    }


    onPointerUp(event)
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonStates.NORMAL;

        if(this.switchOn)
            this.switchOn = false;
        else
            this.switchOn = true;

        event.stopPropagation();

        this.invokeCallback();
    }

    showTexture()
    {
        let id = "";
        switch (this._buttonState)
        {
            case ButtonStates.HOVER :
                id = !this._switchOn ? "00" : "04";
                break;

            case ButtonStates.NORMAL :
                id = !this._switchOn ? "01" : "05";
                break;

            case ButtonStates.PRESSED :
                id = !this._switchOn ? "02" : "06";
                break;

            case ButtonStates.DISABLED :
                id = !this._switchOn ? "03" : "07";
                break;
        }

        super.showTexture(id);
    }

    set switchOn(boolean)
    {
        this._switchOn = boolean;

        this.showTexture();
    }

    get switchOn()
    {
        return this._switchOn;
    }
}