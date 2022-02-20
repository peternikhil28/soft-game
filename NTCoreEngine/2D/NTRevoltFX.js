/* Created by Nikhil Peter on 08-12-2021 */
import NTContainer from "./NTContainer";
import {FX} from 'revolt-fx';
import NTUtils from "../NTUtils";
import NTEngine from "../NTEngine";

export default class NTRevoltFX extends NTContainer{
    constructor(assetPath){
        super();

        this._fx = new FX();
        this._fx.initBundle(NTUtils.getResource(assetPath).data);
        NTEngine.ticker.add(this.update, this);

        this._emitters = this._fx._nameMaps.emitters;
    }

    start(){
        Object.keys(this._emitters).forEach((key) => {
            let emitter = this._fx.getParticleEmitter(key);
            emitter.init(this.display);
        });
    }

    update(){
        this._fx.update();
    }

    stopAllEmitters(){
        Object.keys(this._emitters).forEach((key) => {
            let emitter = this._fx.getParticleEmitter(key);
            emitter.stop();
        });
    }

    pauseAllEmitters(){
        Object.keys(this._emitters).forEach((key) => {
            let emitter = this._fx.getParticleEmitter(key);
            emitter.paused = true;
        });
    }

    resumeAllEmitters(){
        Object.keys(this._emitters).forEach((key) => {
            let emitter = this._fx.getParticleEmitter(key);
            emitter.paused = false;
        });
    }

    destroy(){
        super.destroy();
        NTEngine.ticker.remove(null, this);
        this._emitters = null;
    }
}