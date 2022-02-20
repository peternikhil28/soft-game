/**
 * Created by Nikhil Peter on 19-02-2022.
 */

import NTParticleContainer from "NTCoreEngine/2D/NTParticleContainer";
import NTSprite from "NTCoreEngine/2D/NTSprite";
import NTEngine from "NTCoreEngine/NTEngine";
import NTUtils from "NTCoreEngine/NTUtils";
import Proton from "proton-engine";

// -- Max 10 Images will be on Screen. Every 0.5 sec an Image is created and has life up to 5 sec.
// -- Better fire effect can be achieved from increasing images.

export default class FireParticle extends NTParticleContainer
{
    constructor()
    {
        super();

        this.loadFireEmitter();
    }

    init()
    {
        super.init();

        let create = this._renderer.pool.create;

        let self = this;
        this._renderer.pool.create = function (body, particle)
        {
            if (body.name === 'FIRE')
            {
                let fire = new NTSprite();
                fire.setTexture("res/FireScreen/FireParticles", "FireParticle" + NTUtils.getRandomInt(1, 4));
                return fire.display;
            }
            else
                return create.call(self._proton.pool, body, particle);

        }
    }

    loadFireEmitter()
    {
        let fireEmitter = new Proton.Emitter();

        fireEmitter.rate = new Proton.Rate(1, 0.5);

        fireEmitter.addInitialize(new Proton.Body({ name: 'FIRE' }));

        fireEmitter.addInitialize(new Proton.Life(5));
        fireEmitter.addInitialize(new Proton.V(new Proton.Span(0.1, 0.3), new Proton.Span(0, 3, true), 'polar'));

        fireEmitter.addBehaviour(new Proton.Color("#f9f509", "#ff6919", Infinity, Proton.easeOutBack));
        fireEmitter.addBehaviour(new Proton.Alpha(0, 0.5, Infinity, Proton.easeOutBack));
        fireEmitter.addBehaviour(new Proton.Scale(0.3, Proton.getSpan(1, 1.5)));

        fireEmitter.p.x = NTEngine.screenWidth / 2;
        fireEmitter.p.y = NTEngine.screenHeight - 210;
        fireEmitter.emit();

        this.addEmitter(fireEmitter);

        this._proton.addEventListener(Proton.PARTICLE_UPDATE, function(particle) {

            if(particle.age > 1 && particle.fadeOut !== true)
            {
                particle.fadeOut = true;
                particle.removeBehaviour(particle.behaviours.filter(x=> x.name === "Alpha")[0]);
                particle.addBehaviour(new Proton.Alpha(0.5, 0));
            }

            if(particle.age > 1 && particle.black !== true)
            {
                particle.black = true;
                particle.body.tint = NTUtils.rgbToHex(particle.rgb.r, particle.rgb.g, particle.rgb.b);
            }

            if(particle.black)
                particle.body.tint = NTUtils.changeColorStrength(particle.body.tint, -0.01);
            else
                particle.body.tint = NTUtils.rgbToHex(particle.rgb.r, particle.rgb.g, particle.rgb.b);
        });

        this._proton.addEventListener(Proton.PARTICLE_DEAD, function(particle) {
            particle.fadeOut = false;
            particle.black = false;
        });
    }
}
