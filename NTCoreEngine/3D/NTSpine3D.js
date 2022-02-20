

import NTSpine from "../2D/NTSpine";
import NTUtils from "../NTUtils";

export default class NTSpine3D extends NTSpine
{
    constructor(resPath)
    {
        super(resPath);
        this._ntObject = new PIXI.projection.Spine3d(NTUtils.getResource(resPath + ".json").spineData);
    }

    get position()
    {
        return this._ntObject.position3d;
    }

    get scale()
    {
        return this._ntObject.scale3d;
    }
}