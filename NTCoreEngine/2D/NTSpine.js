/* Created by Nikhil Peter on 1/15/2019 */

import NTContainer from "./NTContainer";
import NTUtils from "../NTUtils";
import "pixi-spine";

export default class NTSpine extends NTContainer
{
    constructor(resPath)
    {
        super();

        this._ntObject = new PIXI.spine.Spine(NTUtils.getResource(resPath + ".json").spineData);
        this._assetPath = resPath;
    }

    get state() {
        return this._ntObject.state;
    }

    setSize(w, h)
    {
        this.width = w;
        this.height = h;
    }
}