/* Created by Nikhil Peter on 4/30/2018 */
"use strict";
import NTContainer from "./NTContainer";
import NTEngine from "../NTEngine";
import Proton from "proton-engine";

export default class NTParticleContainer extends NTContainer
{
    constructor()
    {
        super();

        this._ntObject = new PIXI.ParticleContainer();

        this.init();

        NTEngine.ticker.add(this.render, this);
    }

    init()
    {
        this._proton = new Proton();

        this._renderer = new Proton.PixiRenderer(this.display);
        this._renderer.setPIXI(PIXI);
        this._proton.addRenderer(this._renderer);

        Proton.USE_CLOCK = true;
    }

    addEmitter(emitter)
    {
        this._proton.addEmitter(emitter);
    }

    stopAllEmitters()
    {
        let emitters = this._proton.emitters;

        emitters.forEach( (emitter)=> {
            emitter.stop();
        });
    }

    render()
    {
        this._proton.update();
    }

    destroy()
    {
        super.destroy();

        this._proton.destroy();
    }
}