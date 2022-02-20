/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTEngine from "NTCoreEngine/NTEngine";
import NTGameScreen from "NTCoreEngine/NTGameScreen";
import Hud from "../Hud";

 export default class SubScreen extends NTGameScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);
    }

    onReveal()
    {
        NTEngine.screenManager.addScreen(new Hud("res/Hud/", "Hud"));
    }
}