/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTUtils from "NTCoreEngine/NTUtils";
import SubScreen from "./SubScreen";

 export default class CardGame extends SubScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);

        this.TOTAL_CARDS = 144;
        this.TRIGGER_DURATION = 1000;
        this.CARD_MOVE_DURATION = 2000;

        this._offset = 5;

        this._toggle = false;

        this._cardSet = [];
    }

    createCustomObject(objectData)
    {
        switch (objectData.type) {
            case "Holder1":
                this._holder1 = objectData;
                break;

            case "Holder2" :
                this._holder2 = objectData;
                break;
        }
    }

    onReveal()
    {
        this.createCardSet(this._holder1);

        this.startMoveCards();

        super.onReveal();
    }

    createCardSet(objectData)
    {
        for(let count=0; count<this.TOTAL_CARDS; count++)
        {
            let card = NTUtils.createSprite(this._assetFolder + this._assetName, objectData);
            card.position.x += this._offset * count;
            this.addChild(card);
            this._cardSet.push(card);
        }
    }

    startMoveCards()
    {
        this._currentTopIndex = this._toggle ? 0 : this.TOTAL_CARDS - 1;

        this._toggle = !this._toggle;

        this._timeOutId = setInterval(this.moveCard.bind(this), this.TRIGGER_DURATION);
    }

    moveCard()
    {
        let xPos, yPos;
        if(this._toggle)
        {
            xPos = this._holder1.x + this._currentTopIndex * this._offset;
            yPos = this._holder2.y;
        }
        else
        {
            xPos = this._holder1.x + this._currentTopIndex * this._offset;
            yPos = this._holder1.y;
        }

        this._cardSet[this._currentTopIndex].moveToFront();
        this._cardSet[this._currentTopIndex].actionMoveTo(this.CARD_MOVE_DURATION, xPos, yPos);

        this._currentTopIndex = this._toggle ? this._currentTopIndex-1 : this._currentTopIndex + 1;

        this.checkMoveComplete();
    }

    checkMoveComplete()
    {
        if(!(this._currentTopIndex > -1 && this._currentTopIndex < this.TOTAL_CARDS))
            clearInterval(this._timeOutId);
    }

    destroy()
    {
        clearInterval(this._timeOutId);

        super.destroy();

        this._cardSet.length = 0;
        this._cardSet = null;
    }
}