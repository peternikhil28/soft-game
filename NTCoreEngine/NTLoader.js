/* Created by Nikhil Peter on 1/11/2017 */

import NTEngine from "./NTEngine";
import WebFont from "../framework/webfont";
import NTEventHandler from "./NTEventHandler";

export default class NTLoader
{
   constructor()
   {
       this._resource = [];
       this._soundResources = [];

       this._fontList = [];

       this._soundProgress = 0;
       this._resProgress = 0;
       this._totalProgress = 0;
   }

    load(res, callback, onProgress, onLoadError)
    {
        this._resource = res;
        this._onLoadComplete = callback;
        this._onProgress = onProgress;
        this._onLoadError = onLoadError;
        this.splitResources();
        this.loadResource();
    }

    splitResources()
    {
        let index = this._resource.length;

        while(index--)
        {
            if(this._resource[index].endsWith("mp3") || this._resource[index].endsWith("wav") || this._resource[index].endsWith("ogg"))
                this._soundResources.push(this._resource.splice(index, 1)[0]);
        }

        let self = this;
        this._resource.map(function (resPath) {
            if(resPath.split('.').pop().match(/ttf/g))
                self._fontList.push(resPath);
        })
    }

    loadResource()
    {
        if(this._soundResources.length > 0)
        {
            this._completeIndex = 2;
            this._totalProgress = this._completeIndex;
            NTEngine.audioManager.loadSounds(this._soundResources, this.loadComplete.bind(this), (progress)=>{
                this._soundProgress = progress > 1 ? 1 : progress;
                this.onProgressCallback((this._soundProgress + this._resProgress)/this._totalProgress);
            });
        }
        else{
            this._completeIndex = 1;
            this._totalProgress = this._completeIndex;
        }

        let loader = new PIXI.Loader();
        loader.add(this._resource);
        this.ntObject = loader;

        this._callbackId = loader.onProgress.add((loader)=> {
            this._resProgress = loader.progress/100;
            this.onProgressCallback((this._soundProgress + this._resProgress)/this._totalProgress);
        });

        loader.load(this.loadComplete.bind(this));
        loader.onError.once(this.onLoadError.bind(this));
    }

    onLoadError(error, loader, resource){

        this.ntObject.onProgress.detach(this._callbackId);

        if(this._onLoadError)
            this._onLoadError();

    }

    loadComplete()
    {
        if(!navigator.onLine)
            return;

        if(this.ntObject && this.ntObject.resources)
        for(let key in this.ntObject.resources){
            if(this.ntObject.resources[key].data)
            PIXI.Loader.shared.resources[key] = this.ntObject.resources[key];
        }

        if(!--this._completeIndex)
            this.onResourceLoad();
    }

    onResourceLoad()
    {
        if(this._fontList.length > 0)
            this.loadFontList();

        this.onProgressCallback(1);

        this.invokeCallback();
    }

    loadFontList()
    {
        let fontNameList = [];

        let self = this;
        this._fontList.map(function(url){
            let fontName = url.replace(/^.*[\\\/]/, '').split('.')[0];
            self.loadFont(fontName, url);
            fontNameList.push(fontName);
        });

        WebFont.load({
            custom: {
                families: fontNameList
            }
        });
    }

    loadFont(fontName, url)
    {
        let newStyle = document.createElement('style');
        newStyle.appendChild(document.createTextNode("\
        @font-face {\
            font-family: " + fontName + ";\
            src: url('" + url + "') format('truetype');\
        }\
        "));

        document.head.appendChild(newStyle);
    }

    onProgressCallback(progress)
    {
        if(this._onProgress)
            this._onProgress(progress);
    }

    invokeCallback()
    {
        if(this._onLoadComplete !== undefined)
            this._onLoadComplete();
    }

    destroy()
    {
        if(this._resource)
        this._resource.length = 0;
        this._resource = null;

        if(this._soundResources)
        this._soundResources.length = 0;
        this._soundResources = null;

        if(this.ntObject)
        this.ntObject.reset();
    }
}