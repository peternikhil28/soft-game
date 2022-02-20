/* Created by Nikhil Peter on 4/29/2020 */

import NTButton from "./NTButton";
import ButtonStates from "./ButtonStates";

export default class NTButtonUI extends NTButton
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

        super.showTexture("01");
    }
}