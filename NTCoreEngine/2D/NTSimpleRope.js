/* Created by Nikhil Peter on 3/15/2020 */

import NTContainer from "./NTContainer";

export default class NTSimpleRope extends NTContainer
{
    constructor(texture, points){
        super();

        this._ntObject = new PIXI.SimpleRope(texture, points);
    }
}