/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTUtils from "NTCoreEngine/NTUtils";
import SubScreen from "./SubScreen";

 export default class MultiTextScreen extends SubScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);

        this._textStyle = "fill=0xffffff; fontWeight=bold; stroke=#000000; strokeThickness=5; fontFamily=Arial;";
    }

    onObjectCreated(object, objectData)
    {
        switch (objectData.name)
        {
            case "txtMulti":
                this._multiText = object;
                this.setMultiText();
                break;
        }
    }

    setMultiText()
    {
        let length = NTUtils.getRandomInt(3, 15);

        let text = "";
        for(let count=0; count<length; count++)
        {
            if(NTUtils.getRandomInt(0, 1))
                text += "<label  " + this._textStyle + "fontSize="+ NTUtils.getRandomInt(10, 40) + ";>" + this.getRandomText() + "</label>";
            else
                text += "<img src=Gem" + NTUtils.getRandomInt(1, 7) + ">"
        }

        this._multiText.text =  text;

        this._timeOutId = setTimeout(this.setMultiText.bind(this), 2000);
    }

    getRandomText()
    {
        return Math.random().toString(36).substring(NTUtils.getRandomInt(3, 7));
    }

    destroy()
    {
        if(this._timeOutId !== undefined)
            clearTimeout(this._timeOutId);

        super.destroy();
    }
}
