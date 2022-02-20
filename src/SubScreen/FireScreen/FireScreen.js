/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import SubScreen from "../SubScreen";
import FireParticle from "./FireParticle";

 export default class FireScreen extends SubScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);
    }

    createCustomObject(objectData)
    {
        switch(objectData.type)
        {
            case "FireParticle" :
                let fire = new FireParticle(this._assetFolder);
                return fire;
        }
    }

}
