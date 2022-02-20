/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTEngine from "NTCoreEngine/NTEngine";
import NTGameScreen from "NTCoreEngine/NTGameScreen";
import MenuScreen from "./MenuScreen";

 export default class Hud extends NTGameScreen
{
    onButtonClicked(target)
    {
        target.touchEnabled = false;
        NTEngine.screenManager.loadNewScreen( new MenuScreen("res/MenuScreen/", "MenuScreen"));
    }
}
