/* Created by Nikhil Peter on 3/9/2018 */


import NTSprite from "./NTSprite";
import NTTween from "../NTTween";
import NTEventHandler from "../NTEventHandler";
import NTEngine from "../NTEngine";

export default class NTText extends NTSprite
{
    constructor(text, style)
    {
        super();

        this._ntObject = new PIXI.Text(text, style);
        NTEventHandler.dispatchEvent(NTEngine.EVENTS.TEXT_CREATED, this._ntObject);

        this.setAnchor(0.5, 0.5);
    }

    set text(text)
    {
        this._ntObject.text = text;
        NTEventHandler.dispatchEvent(NTEngine.EVENTS.TEXT_UPDATED, this);
    }

    get text()
    {
        return this._ntObject.text;
    }

    set style(style)
    {
        this._ntObject.style = style;
    }

    get style()
    {
        return this._ntObject.style;
    }

    setSize(w, h)
    {
        this.width = w;
        this.height = h;
    }

    updateText(duration, from, to, onUpdate, onComplete, toFixed, suffix)
    {
        suffix = suffix || "";

        let current = {value : from};
        let target = {value : to};

        let self = this;
        let action = new NTTween(current)
            .to(target, duration)
            .onUpdate(function()
            {
                if(toFixed !== undefined)
                self.text = current.value.toLocaleString("en", {maximumFractionDigits : toFixed, minimumFractionDigits : toFixed}) + suffix;
                    else
                self.text = Math.floor(current.value).toLocaleString() + suffix;

                if(onUpdate)
                    onUpdate(self.text);
            })
            .onComplete(function()
            {
                if(toFixed !== undefined)
                    self.text = current.value.toLocaleString("en", {maximumFractionDigits : toFixed, minimumFractionDigits : toFixed}) + suffix;
                else
                    self.text = Math.floor(current.value).toLocaleString() + suffix;

                if(onComplete)
                {
                    onComplete();
                }
                self._tweenIdArray.splice(self._tweenIdArray.indexOf(action), 1);
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }
}