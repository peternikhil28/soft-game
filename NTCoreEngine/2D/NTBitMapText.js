/* Created by Nikhil Peter on 6/10/2019 */

import NTText from "./NTText";
import { BitmapFont } from "pixi.js";

export default class NTBitMapText extends NTText
{
    constructor(text, style)
    {

        super();

        style["fontName"] = this.setFontName(style);

        this._ntObject = new PIXI.BitmapText(text, style);

        this.setAnchor(0.5, 0.5);
    }

    setFontName(style)
    {
        let fontArray = [];
        let fontSize = style.fontSize ? style.fontSize : 1;

        for (const [key, value] of Object.entries(BitmapFont.available)) {
            if(key.includes(style["fontFamily"]))
            {
                let element = {};
                element.id = key;
                element.fontSize = key.split(style["fontFamily"]+"_").pop();
                if(!isNaN(parseInt(element.fontSize)) && element.fontSize>fontSize)
                    fontArray.push(element);
            }
        }

        if(fontArray.length > 0)
        {
            return fontArray.reduce(function(prev, curr) {
                return (Math.abs(curr.fontSize - fontSize) < Math.abs(prev.fontSize - fontSize) ? curr : prev);
            }).id;
        }
        else 
            return style["fontFamily"];
    }
}