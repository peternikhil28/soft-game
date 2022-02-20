/* Created by Nikhil Peter on 3/12/2018 */

import NTContainer from "./2D/NTContainer";
import NTUtils from "./NTUtils";

export default class NTGameObject extends NTContainer
{
    constructor(assetPath, layoutName)
    {
        super();

        this._assetFolder = assetPath;
        this._layoutName = layoutName;
    }

    // -- Load Layout --
    loadContent()
    {
        this.loadLayout();
    }

    loadLayout()
    {
        this.layoutScreen(NTUtils.getResource(this._assetFolder + this._layoutName + '_Layout.json').data);
    }

    layoutScreen(inData)
    {
        this._assetName = inData.assetName;

        let objectDetails = inData.objects;

        for(let index=0; index<objectDetails.length; index++)
        {
            let objectData = objectDetails[index];

            let ykObject;

            switch (objectData.type)
            {
                case "Sprite":
                    ykObject = NTUtils.createSprite(this._assetFolder + this._assetName, objectData);
                    break;

                case "Animation":
                    ykObject = NTUtils.createAnimation(this._assetFolder + this._assetName, objectData);
                    break;

                case "Button":
                    ykObject = NTUtils.createButton(this._assetFolder + this._assetName, objectData);
                    ykObject.addTouchListener(this.onButtonClicked.bind(this));
                    break;

                case "Switch":
                    ykObject = NTUtils.createSwitch(this._assetFolder + this._assetName, objectData);
                    ykObject.addTouchListener(this.onButtonClicked.bind(this));
                    break;

                case "ButtonUI":
                    ykObject = NTUtils.createButtonUI(this._assetFolder + this._assetName, objectData);
                    ykObject.addTouchListener(this.onButtonClicked.bind(this));
                    break;

                case "SwitchUI":
                    ykObject = NTUtils.createSwitchUI(this._assetFolder + this._assetName, objectData);
                    ykObject.addTouchListener(this.onButtonClicked.bind(this));
                    break;

                case "Spine":
                    ykObject = NTUtils.createSpine(this._assetFolder + this._assetName, objectData);
                    break;

                case "Text":
                    ykObject = NTUtils.createText(objectData);
                    break;

                case "BitMapText":
                    ykObject = NTUtils.createBitMapText(objectData);
                    break;

                case "MultiText":
                    ykObject = NTUtils.createMultiText(this._assetFolder + this._assetName, objectData);
                    break;

                case "Particle":
                    ykObject = NTUtils.createPIXIParticle(this._assetFolder, objectData);
                    break;

                case "RevoltFX":
                    ykObject = NTUtils.createRevoltFX(this._assetFolder, objectData);
                    break;

                default:
                    ykObject = this.createCustomObject(objectData);
                    break;
            }

            if(ykObject!=null)
            {
                this.addObject(ykObject);
                this.onObjectCreated(ykObject, objectData);
            }
        }

        this.onLayoutComplete();
    }

    createCustomObject(objectData)
    {

    }

    onObjectCreated(object, objectData)
    {

    }

    addObject(ykObject)
    {
        this.addChild(ykObject);
    }

    onLayoutComplete()
    {

    }


    onButtonClicked(target)
    {

    }
}