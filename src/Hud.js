/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTEngine from "NTCoreEngine/NTEngine";
import NTGameScreen from "NTCoreEngine/NTGameScreen";
import MenuScreen from "./MenuScreen";

 export default class Hud extends NTGameScreen
{
    onObjectCreated(object, objectData)
    {
        switch (objectData.name)
        {
            case "btnBack":
                object.display.buttonMode = true;
                object.display.interactive = true;
                object.display.on('pointerup', this.onBackClicked.bind(this));
                break;
        }
    }

    onBackClicked()
    {
        NTEngine.screenManager.loadNewScreen( new MenuScreen("res/MenuScreen/", "MenuScreen"));
    }
}
