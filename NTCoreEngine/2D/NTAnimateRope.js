/* Created by Nikhil Peter on 3/15/2020 */

import NTContainer from "./NTContainer";
import NTUtils from "../NTUtils";
import NTEngine from "../NTEngine";
import NTSlotUtils from "../../NTSlotEngine/NTSlotUtils";
import NTSimpleRope from "./NTSimpleRope";

export default class NTAnimateRope extends NTContainer
{
    constructor()
    {
        super();

        this._frame = -1;

        this._playing = false;

        this._loop = false;

        this._delay = 0;

        this._animationSpeed = 0;
    }
    get points()
    {
        return this._points;
    }

    set points(points)
    {
        this._points = points;
    }

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
                    let texture = NTUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[key];

                    let rope = new NTSimpleRope(texture, this._points);
                    rope.visible = false;
                    this.addChild(rope);

                    this._animationFrames[frameNum] = rope;
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
                this._animationFrames.forEach((object)=> object.visible = false);
                this._animationFrames[this.currentFrame].visible = true;
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