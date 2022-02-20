
import NTSprite from "../2D/NTSprite";

export default class NTSprite3D extends NTSprite{

    constructor()
    {
        super();
        this._ntObject = new PIXI.projection.Sprite3d();
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