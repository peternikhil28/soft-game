/* Created by Nikhil Peter on 3/15/2018 */

import NTTween from "./NTTween";
import NTEngine from "./NTEngine";
import * as PIXI from 'pixi.js'

export default class NTDisplayObject
{
    constructor()
    {
        this._tweenIdArray = [];

        this._ntObject = new PIXI.DisplayObject();
    }

    get display()
    {
        return this._ntObject;
    }

    get position()
    {
        return this._ntObject.position;
    }

    get scale()
    {
        return this._ntObject.scale;
    }

    get rotation()
    {
        return this._ntObject.rotation;
    }

    set rotation(value)
    {
        this._ntObject.rotation = value;
    }

    get visible()
    {
        return this._ntObject.visible;
    }

    set visible(boolean)
    {
        this._ntObject.visible = boolean;
    }

    get alpha()
    {
        return this._ntObject.visible;
    }

    set alpha(boolean)
    {
        this._ntObject.alpha = boolean;
    }

    get colorMatrix()
    {
        if(this._colorMatrix === undefined)
        {
            this._colorMatrix = new PIXI.filters.ColorMatrixFilter();
            this._ntObject.filters = this._ntObject.filters || [];
            this._ntObject.filters.push(this._colorMatrix);
        }

        return this._colorMatrix;
    }

    moveToFront()
    {
        if (this.parent)
        {
            let parent = this.parent;
            parent.removeChild(this, false);
            parent.addChild(this);
        }
    }

    // -- Actions --

    onComplete(action, callback)
    {
        this._tweenIdArray.splice(this._tweenIdArray.indexOf(action), 1);

        if(callback)
        {
            callback();
        }
    }

    actionScaleInout(duration, from, to, loop, callback)
    {
        let self = this;
        this.actionScale(duration/2, from, null, function () {
            self.actionScale(duration/2, to, null, loop ? self.actionScaleInout.bind(self, duration, from, to, loop, callback) : callback);
        });
    }

    actionScale(duration, scale, params, callback)
    {
        let current = {scale : this._ntObject.scale.x || this._ntObject.scale.y || 0};
        let target = {scale : scale};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self._ntObject.scale.set(current.scale, current.scale);
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionMoveTo(duration, x, y, params, callback)
    {
        let current = {x : this.position.x, y : this.position.y};
        let target = {x : x, y : y};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self.position.set(current.x, current.y);
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionMoveBy(duration, dx, dy, params, callback)
    {
        let current = {x : this.position.x, y : this.position.y};
        let target =  {x : this.position.x + dx, y : this.position.y + dy};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self.position.set(current.x, current.y);
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionRotate(duration, from, to, loop, callback)
    {
        let self = this;
        this.actionRotateTo(duration/2, from, null, function () {
            self.actionRotateTo(duration/2, to, null, loop ? self.actionRotate.bind(self, duration, from, to, loop, callback) : callback);
        });
    }

    actionRotateBy(duration, rotateBy, params, callback)
    {
        let angle = this._ntObject.rotation + (Math.PI/180) * rotateBy;

        let current = {rotation : this._ntObject.rotation};
        let target = {rotation : angle};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self._ntObject.rotation = current.rotation;
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionRotateTo(duration, rotateTo, params, callback)
    {
        let angle = (Math.PI/180) * rotateTo;

        let current = {rotation : this._ntObject.rotation};
        let target = {rotation : angle};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self._ntObject.rotation = current.rotation;
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionAlphaInout(duration, from, to, loop, callback)
    {
        let self = this;
        this.actionAlpha(duration/2, from, null, function () {
            self.actionAlpha(duration/2, to, null, loop ? self.actionAlphaInout.bind(self, duration, from, to, loop, callback) : callback);
        });
    }

    actionAlpha(duration, opacity, params, callback)
    {
        let current = {alpha : this._ntObject.alpha};
        let target = {alpha : opacity};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(()=>
            {
                self._ntObject.alpha = current.alpha;
            })
            .onComplete(()=>
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionCustom(duration, from, to, params, onUpdate, onComplete)
    {
        let current = from;
        let target = to;

        let action = new NTTween(current)
            .to(target, duration)
            .params(params)
            .onUpdate(onUpdate)
            .onComplete(onComplete);
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    stopAction(action)
    {
        action.stop();
        this._tweenIdArray.splice(this._tweenIdArray.indexOf(action), 1);
    }

    stopAllActions()
    {
        while (this._tweenIdArray.length > 0)
        {
            this._tweenIdArray[0].stop();
            this._tweenIdArray.splice(0, 1);
        }
    }

    destroy()
    {
        this.stopAllActions();
        this._tweenIdArray = null;

        this._ntObject.removeAllListeners();

        this._ntObject.destroy();

        NTEngine.ticker.remove(null, this);

        this._colorMatrix = null;
        this._ntObject = null;
    }
}