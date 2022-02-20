/* Created by Nikhil Peter on 4/29/2020 */

import NTSwitch from "./NTSwitch";
import NTUtils from "../NTUtils";
import ButtonStates from "./ButtonStates";

export default class NTSwitchUI extends NTSwitch
{
    showTexture()
    {
        this.colorMatrix.reset();

        switch (this._buttonState)
        {
            case ButtonStates.HOVER :
                this.colorMatrix.brightness(1.5);
                break;

            case ButtonStates.NORMAL :
                this.colorMatrix.brightness(1);
                break;

            case ButtonStates.PRESSED :
                this.colorMatrix.brightness(0.5);
                break;

            case ButtonStates.DISABLED :
                this.colorMatrix.brightness(1);
                this.colorMatrix.greyscale(0.2);
                break;
        }

        let id = !this._switchOn ? "01" : "05";
        this._ntObject.texture = NTUtils.getTexture(this._assetPath, this._name + id);
    }
}