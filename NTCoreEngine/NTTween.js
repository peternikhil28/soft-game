/* Created by Nikhil Peter on 12/18/2018 */

import NTEngine from "./NTEngine";
import TWEEN from "@tweenjs/tween.js";

export default class NTTween
{
    constructor(current)
    {
        this._ntObject = new TWEEN.Tween(current);
    }

    to(target, duration)
    {
        this._ntObject.to(target, duration);

        return this;
    }

    params(params)
    {
        if(params === null || params === undefined)
            return this;

        for(let key in params)
        {
            switch (key)
            {
                case NTEngine.TWEEN_PARAMS.DELAY :
                    this._ntObject.delay(params[NTEngine.TWEEN_PARAMS.DELAY]);
                    break;

                case NTEngine.TWEEN_PARAMS.EASING :
                    this._ntObject.easing(params[NTEngine.TWEEN_PARAMS.EASING]);
                    break;

                case NTEngine.TWEEN_PARAMS.REPEAT :
                    this._ntObject.repeat(params[NTEngine.TWEEN_PARAMS.REPEAT]);
                    break;

                case NTEngine.TWEEN_PARAMS.YOYO :
                    this._ntObject.yoyo(params[NTEngine.TWEEN_PARAMS.YOYO]);
                    break;
            }
        }

        return this;
    }

    onUpdate(fn)
    {
        this._ntObject.onUpdate(fn);

        return this;
    }

    onComplete(fn)
    {
        this._ntObject.onComplete(fn);

        return this;
    }

    start()
    {
        this._ntObject.start();

        return this;
    }

    stop()
    {
        this._ntObject.stop();

        return this;
    }
}