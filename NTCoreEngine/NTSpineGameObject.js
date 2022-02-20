/* Created by Nikhil Peter on 2/11/2020 */

import NTSpine from "./2D/NTSpine";
import NTEngine from "./NTEngine";
import NTText from "./2D/NTText";
import NTBitMapText from "./2D/NTBitMapText";
import NTRevoltFX from "./2D/NTRevoltFX";
import NTSlotUtils from "../NTSlotEngine/NTSlotUtils";

export default class NTSpineGameObject extends NTSpine {

    loadContent()
    {
        this.checkSlots();
    }

    checkSlots()
    {
        let data = this.display.skeleton.slots.filter((x) => x.data.name != undefined ?  x.data.name.match(/\w+-\w+/gi) : false);
        this.addAttachments(data);
    }

    addAttachments(slots)
    {
        for(let index=0; index<slots.length; index++)
        {
            let slot = slots[index];
            let value = slot.data.name.match(/\w+-\w+/i).pop();
            let name = value.split('-').shift();
            let type = value.split('-').pop();

            let ntObject;
            let styleList, style;
            switch (type)
            {
                case "RevoltFX":
                    let assetFolder = this._assetPath.split("/").slice(0,-1).join("/") + "/";
                    ntObject = new NTRevoltFX(assetFolder + name + ".json");
                    ntObject.type = type;
                    break;
                case "Text":
                    style = {};
                    styleList = slot.data.name.match(/{[\w;:#\s]+}/i).pop().replace(/[{}\s]/g, "").split(';');
                    styleList.forEach(data => style[data.split(':').shift()] = data.split(':').pop());

                    ntObject = new NTText("", style);
                    ntObject.name = name;
                    break;

                case "BitMapText":
                    style = {};
                    styleList = slot.data.name.match(/{[\w;:#\s]+}/i).pop().replace(/[{}\s]/g, "").split(';');
                    styleList.forEach(data => style[data.split(':').shift()] = data.split(':').pop());
                    ntObject = new NTBitMapText("", style);
                    ntObject.name = name;
                    break;
                default:
                    ntObject = this.createCustomObject(name, type, slot);
                    break;
            }

            if(ntObject)
            {
                ntObject.name = name;

                slot.currentSprite.addChild(ntObject.display);
                this.onObjectCreated(ntObject);
            }
        }

        this.onLayoutComplete();
    }

    createCustomObject(name, type, slot)
    {

    }

    onObjectCreated(object)
    {
        switch(object.type)
        {
            case "RevoltFX" :
                this.state.addListener({event:(entry, event)=> {

                    switch (event.data.name) {
                        case 'OnRevoltFXEnable':
                            object.start();
                            break;
                    }
                }});
                break;
        }
    }

    onLayoutComplete()
    {

    }
}