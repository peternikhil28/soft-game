/* Created by Nikhil Peter on 11-11-2020 */
import NTContainer from "./NTContainer";
import NTEngine from "../NTEngine";
import NTUtils from "../NTUtils";
import * as particles from 'pixi-particles';

export default class NTPIXIParticleContainer extends  NTContainer
{
    constructor(assetPath){
        super();

        this.now = Date.now();
        this.elapsed = Date.now();

        this.init(assetPath);

        NTEngine.ticker.add(this.render, this);
    }

    init(assetPath)
    {
        let textures = Object.keys(PIXI.Loader.shared.resources[assetPath + ".json"].textures).map(x => PIXI.Loader.shared.resources[assetPath + ".json"].textures[x]);
        this.emitter = new particles.Emitter(this._ntObject, textures,
            NTUtils.getResource(assetPath + "_Emitter.json").data);

        this.emitter.emit = true;
    }

    render()
    {
        this.now = Date.now();

        this.emitter.update((this.now - this.elapsed) * 0.001);

        this.elapsed = this.now;
    }
}