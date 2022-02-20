/* Created by Nikhil Peter on 7/2/2018 */

"use strict";
import NTGameScreen from "./NTGameScreen";
import NTEngine from "./NTEngine";
import NTLoader from "./NTLoader";
import NTUtils from "./NTUtils";

export default class NTLoadingScreen extends NTGameScreen
{
    constructor(screen, res)
    {
        super(null, null);

        this._screen = screen;
        this._resources = res;

        this._loader = new NTLoader();

        this._resumeLoading = false;
    }

    onLayoutComplete()
    {
        super.onLayoutComplete();

        this.loadResource();
    }

    loadResource()
    {
        this._loader.load(NTUtils.cloneJSON(this._resources), this.loadComplete.bind(this), this.onProgress.bind(this), this.onLoadError.bind(this));
    }

    onProgress(progress)
    {

    }

    loadComplete()
    {
        this.loadScreen();
    }

    onLoadError(){
        this._resumeLoading = true;
       
        this._loader.destroy();
        this._loader = new NTLoader();
        NTUtils.waitForReconnection(()=>{
         
            this._loader.load(NTUtils.cloneJSON(this._resources), this.loadComplete.bind(this), this.onProgress.bind(this), this.onLoadError.bind(this));
        })
    }

    loadScreen()
    {
        NTEngine.screenManager.loadNewScreen(this._screen);
    }

    destroy()
    {
        super.destroy();

        this._loader.destroy();
    }
}