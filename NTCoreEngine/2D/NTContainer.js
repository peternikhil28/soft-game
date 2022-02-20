/* Created by Nikhil Peter on 3/15/2018 */

import NTDisplayObject from "../NTDisplayObject";

export default class NTContainer extends NTDisplayObject
{
    constructor()
    {
        super();

        this._ntObject = new PIXI.Container();

        this.children = [];
    }

    setSize(w, h)
    {
        this._ntObject.width = w;
        this._ntObject.height = h;
    }

    getChildIndex(child)
    {
        return this._ntObject.getChildIndex(child.display);
    }

    addChild(object)
    {
        object.parent = this;

        this.children.push(object);

        this._ntObject.addChild(object.display);
    }

    addChildAt(object, index)
    {
        object.parent = this;

        this.children.push(object);

        this._ntObject.addChildAt(object.display, index);
    }

    addTouchListener(callback)
    {
        this._onTouchCallback = callback;
    }

    invokeCallback()
    {
        if(this._onTouchCallback !== undefined)
            this._onTouchCallback(this);
    }

    setHitArea(x, y, w, h)
    {
        this._ntObject.interactive = true;
        this._ntObject.hitArea = new PIXI.Rectangle(x, y, w, h);
        this._ntObject.on('pointerup',  this.onHit.bind(this));
    }

    onHit(target)
    {
        this.invokeCallback();
    }

    removeChild(object, destroy)
    {
        destroy = destroy === undefined ? true : destroy;

        this.children.splice(this.children.indexOf(object), 1);

        this._ntObject.removeChild(object.display);

        if(destroy)
            object.destroy();
    }

    removeAllChildren()
    {
        while(this.children.length !== 0)
            this.removeChild(this.children[0]);
    }

    destroy()
    {
        this.removeAllChildren();

        this.children = null;

        super.destroy();
    }
}