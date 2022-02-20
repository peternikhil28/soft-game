import NTLoadingScreen from "NTCoreEngine/NTLoadingScreen";

export default class LoadingScreen extends NTLoadingScreen
{
    constructor(screen, res)
    {
        super(screen, res);

        this._assetFolder = "res/LoadingScreen/";
        this._layoutName = "LoadingScreen";
    }

    onObjectCreated(object, objectData)
    {
        switch(objectData.name)
        {
            case "LoadingIcon":
                object.actionRotateBy(1000, 360, Infinity);
                break;
        }
    }
}