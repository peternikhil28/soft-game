/* Created by Nikhil Peter on 11/18/2018 */

import NTContainer from "./NTContainer";
import NTText from "./NTText";
import NTSprite from "./NTSprite";

export default class NTMultiText extends NTContainer
{
    constructor(assetPath)
    {
        super();

        this._items = [];
        this._containerList = [];

        this._style = {};

        this._assetPath = assetPath;
    }

    get style()
    {
        return this._style;
    }

    set style(style)
    {
        this._style = style;
    }

    set lineHeight(height)
    {
        this._lineHieght = height;
    }

    set text (text)
    {
        this._text = text;

        this.removeAllChildren();

        this._items.length = 0;
        this._containerList.length = 0;

        if(text.match("\n") !== null)
            text = this.processNewLine(text);

        if(text.match(/(<label[\w\s=;#]*>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*[[\w \/]*<\/label>)|(<img[\w\s=;#]*>)/igm) !== null)
            text.match(/(<label[\w\s=;#]*>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*[[\w \/]*<\/label>)|(<img[\w\s=;#]*>)/igm).map(this.parseData.bind(this));
        else
            this._items.push(new NTText(text, this._style["label"]));

        this.setHorizontal();
        this.setVertical();
    }

    set assetPath(assetPath)
    {
        this._assetPath = assetPath;
    }

    processNewLine(text)
    {
        text = text.match(/(<label[\w\s=;#]*>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*[ \/]*<\/label>)|(<img[\w\s=;#]*>)/igm).map(function (data) {
            let tagName = data.trim().match(/<\w+ |<\w+>/)[0].slice(1, -1);
            if(tagName === "label" && text.match("\n") !== null)
            {
                let inData = "";
                let tagStyle = data.match(/<[\w\s=;#]*>/ig)[0].slice(6, -1).trim();
                data.match(/>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*[[\w \/]*</ig)[0].slice(1, -1).split("\n").map(function (value, index) {
                    inData += index === 0 ? "<label " + tagStyle + ">" + value + "</label>" : "<Label " + tagStyle + ">" + value + "</Label>";
                });
                return inData;
            }
            else
                return data;
        });

        return text.join("");
    }

    parseData(data)
    {
        let tagName = data.trim().match(/<\w+ |<\w+>/)[0].slice(1, -1);

        let npObject;
        switch (tagName) {
            case "label" :
                npObject = this.createText(data);
                break;

            case "Label" :
                npObject = this.createText(data);
                npObject.newLine = true;
                break;

            case "img" :
                npObject = this.createSprite(data);
                break;
        }

        this._items.push(npObject);
    }

    createText(data)
    {
        let style = this._style["label"] !== undefined ? this._style["label"] : {};

        let self = this;
        data.match(/<[\w\s=;#]*>/ig)[0].slice(6, -1).trim().split(" ").map((inData)=>
        {
            let name = inData.split("=")[0];
            let value = inData.split("=")[1];
            switch (name)
            {
                case "id" :
                    for(let key in self._style["#" + value])
                        style[key] = /[^0-9]/i.test(self._style["#" + value][key]) ? self._style["#" + value][key] : parseFloat(self._style["#" + value][key]);
                    break;

                case "class" :
                    for(let key in self._style["." + value])
                        style[key] = /[^0-9]/i.test(self._style["." + value][key]) ? self._style["." + value][key] : parseFloat(self._style["." + value][key]);
                    break;

                default :
                    style[name] = /[^0-9]/i.test(value) ? value : parseFloat(value);
                    break;
            }
        });

        let text = data.match(/>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*[[\w \/]*</ig)[0].slice(1, -1);

        return new NTText(text, style);
    }

    createSprite(data)
    {
        let assetName = data.match(/=\w+>/ig)[0].slice(1, -1);

        let sprite = new NTSprite();
        sprite.setTexture(this._assetPath, assetName);

        return sprite;
    }

    updatePosition()
    {
        let totalWidth = 0;
        for(let index=0; index<this._items.length; index++)
        {
            if(index === 0 || this._items[index].newLine)
                totalWidth = 0;

            this._items[index].position.x = this._items[index].display.width/2 + totalWidth;
            totalWidth += this._items[index].display.width;
        }

        let totalHeight = 0;
        for(let index=0; index<this._containerList.length; index++)
        {
            this._containerList[index].position.x = -this._containerList[index].display.getBounds().width/2;
            this._containerList[index].position.y =  this._lineHieght !== undefined ? this._lineHieght/2 + totalHeight : this._containerList[index].display.height/2 + totalHeight;
            totalHeight += this._lineHieght !== undefined ? this._lineHieght : this._containerList[index].display.height;
        }

        this._containerList.forEach(function(container){container.position.y -= totalHeight/2});
    }

    setHorizontal()
    {
        let totalWidth = 0;
        for(let index=0; index<this._items.length; index++)
        {
            if(index === 0 || this._items[index].newLine || totalWidth >= this.display._width)
            {
                totalWidth = 0;
                this._containerList.push(new NTContainer());
            }
            this._items[index].position.x = this._items[index].display.width/2 + totalWidth;
            totalWidth += this._items[index].display.width;
            this._containerList[this._containerList.length - 1].addChild(this._items[index]);
        }
    }

    setVertical()
    {
        let totalHeight = 0;
        for(let index=0; index<this._containerList.length; index++)
        {
            this._containerList[index].position.x = -this._containerList[index].display.getBounds().width/2;
            this._containerList[index].position.y =  this._lineHieght ? this._lineHieght/2 + totalHeight : this._containerList[index].display.height/2 + totalHeight;
            totalHeight += this._lineHieght ? this._lineHieght : this._containerList[index].display.height;
            this.addChild(this._containerList[index]);
        }

        this._containerList.forEach(function(container){container.position.y -= totalHeight/2});
    }

    destroy()
    {
        super.destroy();

        this._items.length = 0;
        this._containerList.length = 0;
    }
}