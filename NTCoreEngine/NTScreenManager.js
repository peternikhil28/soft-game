/* Created by Nikhil Peter on 1/11/2017 */

import NTContainer from "./2D/NTContainer";
import NTEngine from "./NTEngine";

export default class NTScreenManager
{
    constructor()
    {
        this._gameScene = null;

        this._baseLayer = new NTContainer();
        this._popupLayer = new NTContainer();
    }

    loadScene(gameScene)
    {
        this._gameScene = gameScene;
        this._gameScene.addChild(this._baseLayer);
        this._gameScene.addChild(this._popupLayer);

        NTEngine.gamescene = gameScene;
    }

    loadNewScreen(screen)
    {
        screen.screenType = "NewScreen";

        screen.loadContent();
    }

    addScreen(screen)
    {
        screen.loadContent();
    }

    addPopup(screen)
    {
        screen.screenType = "Popup";

        screen.loadContent();
    }

    reveal(screen)
    {
        if(this._gameScene.children.length === 0)
        {
            this._gameScene.display.alpha = 0;
            this.revealNewScreen(screen);
        }
        else if(screen.screenType === "NewScreen")
        {
            this._gameScene.actionAlpha(500, 0, null, this.revealNewScreen.bind(this, screen));
        }
        else
        {
            if(screen.screenType === "Popup")
                this._popupLayer.addChild(screen);
            else
                this._baseLayer.addChild(screen);
            screen.onReveal();
        }
    }

    revealNewScreen(screen)
    {
        this._baseLayer.removeAllChildren();

        this._baseLayer.addChild(screen);

        screen.onReveal();

        this._gameScene.actionAlpha(500, 1);
    }


    removeScreen(screen)
    {
        if(screen.screenType === "Popup")
            this._popupLayer.removeChild(screen);
        else
            this._baseLayer.removeChild(screen);
    }

    removeAllScreens()
    {
        this._baseLayer.removeAllChildren();
        this._popupLayer.removeAllChildren();
    }
}