/* Created by Nikhil Peter on 1/11/2017 */

import NTGameObject from "./NTGameObject";
import NTEngine from "./NTEngine";
import NTEventHandler from "./NTEventHandler";

export default class NTGameScreen extends NTGameObject
{
    onLayoutComplete()
    {
        NTEngine.screenManager.reveal(this);
    }

    onReveal()
    {
        NTEventHandler.dispatchEvent(NTEngine.EVENTS.GAME_SCREEN_CREATED, this, {layoutName : this._layoutName});
    }

    removeScreen()
    {
        NTEngine.screenManager.removeScreen(this);
    }

    destroy()
    {
        super.destroy();

        NTEventHandler.dispatchEvent(NTEngine.EVENTS.GAME_SCREEN_DESTROYED, this, {layoutName : this._layoutName});
    }

}