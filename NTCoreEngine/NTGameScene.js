/* Created by Nikhil Peter on 1/11/2017 */

import TWEEN from '@tweenjs/tween.js';
import NTContainer from "./2D/NTContainer";
import NTEngine from "./NTEngine";
import Stats from 'stats.js.fps';

export default class NTGameScene extends NTContainer
{
    constructor()
    {
        super();

        this.loadRenderer();

        this.loadStats();

        this.loadTicker();

        this.startRender();
    }

    loadRenderer()
    {
        this._renderer = new PIXI.Renderer({ width : NTEngine.screenWidth, height : NTEngine.screenHeight, transparent: true});

        NTEngine.renderer = this._renderer;

        if(!NTEngine.isMobile)
        {
            this._wrapper = document.createElement('div');
            this._wrapper.setAttribute("style", "width:" + NTEngine.screenWidth + "px; height:" + NTEngine.screenHeight + "px; position: fixed; left:50%;top:0; overflow: hidden; transform-origin: left top;");
            this._wrapper.appendChild(this._renderer.view);
            document.body.appendChild(this._wrapper);

            window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

            this.onWindowResize();
        }

        let style = "body { margin: 0; background-color: black; } canvas { padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block; width : 100%; } #viewport { width:1280px; height:720px; position: fixed; left:50%;top:0; overflow: hidden; transform-origin: left top; }";
        let css = document.createElement('style');
        css.type = 'text/css';
        if (css.styleSheet)
            css.styleSheet.cssText = style;
        else
            css.appendChild(document.createTextNode(style));
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    loadStats()
    {
        if( process.env.NODE_ENV === "production")
            return;

        this._stats = new Stats();
        this._stats.dom.classList.add('StatsMeter');
        document.body.appendChild( this._stats.dom );
    }

    loadTicker()
    {
        NTEngine.ticker = new Ticker();
    }

    onWindowResize()
    {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let scale = Math.min(width / NTEngine.screenWidth, height / NTEngine.screenHeight);
        this._wrapper.style.transform = 'scale(' + scale + ') translate(-50%, 0px)';
    }

    startRender()
    {
        this.render();
    }

    stopRender()
    {
        cancelAnimationFrame(this._animationFrameId);
    }

    render(timestamp)
    {
        this._animationFrameId = requestAnimationFrame(this.render.bind(this));

        TWEEN.update();

        let dt = this._prevTime === undefined ? 0 : (timestamp - this._prevTime)/1000;

        NTEngine.fps = 1/dt;

        NTEngine.ticker.render(dt);

        this._prevTime = timestamp;

        this._renderer.render(this.display);

        if( process.env.NODE_ENV === "production")
            return;

        this._stats.update();
    }
}

class Ticker
{
    constructor()
    {
        this._ticker = [];
    }

    add(fn, context)
    {
        let obj = {};
        obj.fn = fn;
        obj.context = context;

        this._ticker.push(obj);
    }

    addFixedUpdate(fps, fn, context)
    {
        let obj = {};
        obj.fn = fn;
        obj.context = context;
        obj.fps = fps;

        this._ticker.push(obj);
    }

    remove(fn, context)
    {
        let index = this._ticker.length;
        while(index--)
        {
            if(this._ticker[index].fn === fn || this._ticker[index].context === context)
            {
                this._ticker.splice(index, 1);
            }
        }
    }

    render(dt)
    {
        for (let index = 0; index < this._ticker.length; index++)
            this._ticker[index].fn.call(this._ticker[index].context, this._ticker[index].fps === undefined ? dt : 1/this._ticker[index].fps);
    }
}