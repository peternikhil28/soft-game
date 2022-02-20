/* Created by Nikhil Peter on 3/15/2018 */

"use strict";
import NTLoader from "./NTLoader";
import NTEngine from "./NTEngine";

export default class NTBlankLoader
{
    constructor()
    {
        this._loader = new NTLoader();
    }

    loadResource(resource)
    {
        this._loader.load(resource, this.loadComplete.bind(this));
    }

    loadComplete()
    {
        this.loadEngine();
    }

    loadEngine()
    {
        this._loader.destroy();
        NTEngine.initialize();
    }
}