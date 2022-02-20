/**
 * Created by Nikhil Peter on 01-11-2017.
 */

import NTContainer from "./NTContainer";
import NTUtils from "../NTUtils";
import NTEngine from "../NTEngine";


export default class NTSprite extends NTContainer
{

    constructor()
    {
        super();

        this._ntObject = new PIXI.Sprite();

        this._assetPath = "";
        this._name = "";

        this._frame = -1;

        this._playing = false;

        this._loop = false;

        this._delay = 0;

        this._animationSpeed = 0;

        this.setAnchor(0.5, 0.5);
    }

    get name()
    {
        return this._ntObject._name;
    }

    set name(name)
    {
        this._ntObject._name = name;
    }

    setTexture(assetPath, objectName)
    {
        this._ntObject.texture = NTUtils.getTexture(assetPath, objectName);
    }

    setAnchor(x, y)
    {
        this._ntObject.anchor.x = x;
        this._ntObject.anchor.y = y;
    }

    // -- Animation --

    loadAnimation(assetPath, name)
    {
        this._animationFrames = [];

        let offsetID = "_0";
        let assetNum = 0;

        while(NTUtils.getResource(assetPath + offsetID + assetNum + ".json") !== undefined)
        {
            for(let key in NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures)
            {
                if(name === key.split('_').shift())
                {
                    let frameNum = Number(key.split('.').shift().split('_').pop());

                    let data = {};
                    data.texture = NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[key];
                    data.script = NTUtils.getResource(assetPath + offsetID + assetNum + ".json").data.frames[key].script;
                    this._animationFrames[frameNum] = data;
                }
            }
            assetNum++;
            if(assetNum >= 10)
                offsetID = "_";
        }

        this.setFrame(0);

        NTEngine.ticker.add(this.animate, this);
    }

    setFrame(frameNum)
    {
        this._frame = frameNum;
        this._ntObject.texture = this._animationFrames[frameNum].texture;
    }

    playAnimation(duration, loop, delay, callback)
    {
        this._animationSpeed = this._animationFrames.length/(duration/1000);
        this._loop = loop || false;
        this._delay = delay/1000 || 0;

        this._onCompleteCallback = callback;

        this._playing = true;
    }

    checkScript(frameNum)
    {
        if(this._animationFrames[frameNum].script !== undefined)
        {
            let script = this._animationFrames[frameNum].script;
            let functionName = script.split('(').shift();
            let params = script.slice(script.indexOf('(') +1, script.indexOf(')')).split(',');

            switch (functionName)
            {
                case "goToAndPlay":
                    let frame = parseInt(params[0]);
                    this._gotToAndPlay(frame);
                    break;
            }
        }
    }

    _gotToAndPlay(frame)
    {
        this._frame = this._frame - Math.floor(this._frame) + frame;
    }

    animate(dt)
    {
        if(this._delay > 0)
            this._delay = this._delay < 0 ? 0 : this._delay - dt;

        if(this._playing && this._delay === 0)
        {
            let previousFrame = this.currentFrame;

            this._frame += this._animationSpeed * dt;

            if(this.currentFrame >= this._animationFrames.length)
            {
                if(this._loop)
                    this._frame -= Math.floor(this._frame);
                else
                {
                    this._frame -= Math.floor(this._frame);
                    this._playing = false;
                    if(this._onCompleteCallback !== undefined)
                        this._onCompleteCallback();
                    return;
                }
            }

            if(previousFrame !== this.currentFrame)
            {
                this._ntObject.texture = this._animationFrames[this.currentFrame].texture;

                while(previousFrame !== this.currentFrame)
                {
                    previousFrame = previousFrame >= this._animationFrames.length - 1 ? 0 : previousFrame + 1;
                    this.checkScript(previousFrame);
                }
            }
        }
    }

    get currentFrame()
    {
        return Math.floor(this._frame);
    }

    stopAnimation()
    {
        this._playing = false;
    }

    destroy()
    {
        this.stopAnimation();

        if(this._animationFrames !== undefined)
        {
            this._animationFrames.length = 0;
            this._animationFrames = null;
        }

        super.destroy();
    }
}