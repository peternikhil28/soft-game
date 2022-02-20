/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTEngine from "NTCoreEngine/NTEngine";
import NTGameScreen from "NTCoreEngine/NTGameScreen";;
import CardGame from "./SubScreen/CardGame";
import FireScreen from "./SubScreen/FireScreen/FireScreen";
import MultiTextScreen from "./SubScreen/MultiTextScreen";

export default class MenuScreen extends NTGameScreen
{
    onButtonClicked(target)
    {
        let screen;

        switch (target.name)
        {
            case "btnCardGame" :
                screen = new CardGame("res/CardGame/", "CardGame");
                break;

            case "btnMultiText" :
                screen = new MultiTextScreen("res/MultiTextScreen/", "MultiTextScreen");
                break;

            case "btnFire" :
                screen = new FireScreen("res/FireScreen/", "FireScreen");
                break;
        }

        NTEngine.screenManager.loadNewScreen(screen);
    }
}
