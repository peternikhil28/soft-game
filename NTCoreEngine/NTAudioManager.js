/* Created by Nikhil Peter on 3/15/2018 */

"use strict";

import {Howl, Howler} from 'howler';
import NTEngine from './NTEngine';
import NTEventHandler from './NTEventHandler';
import NTUtils from "./NTUtils";

export default class NTAudioManager
{
    constructor()
    {
        this._soundList = {};

        this._soundsCount = 0;

        this._volume = 1;
    }

    loadSounds(soundList, callback, onProgress)
    {
        this._onCompleteCallback = callback;
        this._onProgress = onProgress;

        this._soundsCount = soundList.length;

        let self = this;
        soundList.map((soundPath)=> {

            if(this.getSound(soundPath)){
                self._soundsCount--;

                if(self._onProgress !== undefined)
                    self._onProgress((soundList.length - self._soundsCount)/soundList.length);

                if(self._soundsCount === 0 && self._onCompleteCallback !== undefined)
                    self._onCompleteCallback.call();

                return;
            }

            let sound = new Howl({
                src: [soundPath],
                onend: function() {
                    if (sound.callback !== undefined)
                        sound.callback();
                }
            });

            sound.once('load', ()=>{
                self._soundList[soundPath] = sound;
                self._soundsCount--;

                if(self._onProgress !== undefined)
                    self._onProgress((soundList.length - self._soundsCount)/soundList.length);

                if(self._soundsCount === 0 && self._onCompleteCallback !== undefined)
                    self._onCompleteCallback.call();
            });

            sound.on('loaderror', ()=>{
                NTEventHandler.dispatchEvent(NTEngine.EVENTS.LOAD_ERROR);
            })
        });
    }

    getSound(assetPath)
    {
        let sound;
        if(this._soundList[assetPath] !== undefined)
            sound = this._soundList[assetPath];

        return sound;
    }

    playSound(assetPath, loop, volume, callback)
    {
        let sound = this.getSound(assetPath);

        loop = loop || false;
        volume = volume || sound.volume();
        sound.callback = callback;

        sound.loop(loop);
        sound.volume(volume);

        let soundData = {};
        soundData.Id = sound.play();
        soundData.sound = sound;


        return soundData;
    }

    playSoundChain(soundList, loop, volume, loopList)
    {
        loop = loop || false;
        volume = volume || 1;
        soundList = loopList === undefined ? NTUtils.cloneJSON(soundList) : soundList;
        loopList = loopList === undefined ? NTUtils.cloneJSON(soundList) : loopList;

        let self = this;
        this.playSound(soundList[0], false, volume, function () {
            soundList.shift();

            if(soundList.length > 0)
                self.playSoundChain(soundList, loop, volume, loopList);
            else if(loop)
                self.playSoundChain(loopList, loop, volume);
        });
    }

    stopSoundChain(soundList)
    {
        let self = this;
        soundList.map(function (key) {
            if(self._soundList[key]!== undefined)
            {
                self._soundList[key].stop();
            }
        });
    }


    fade(soundData, duration, from, to)
    {
        from = from === null ? (soundData.lastFadeValue === undefined ? soundData.sound.volume() : soundData.lastFadeValue) : from;
        soundData.lastFadeValue = to;

        soundData.sound.fade(from, to, duration, soundData.Id);
    }

    stopSound(soundData)
    {
        soundData.sound.stop(soundData.Id);
    }

    isPlaying(soundData)
    {
        return soundData.sound.playing(soundData.Id);
    }

    stopAllSounds(exceptList)
    {
        exceptList = exceptList || [];

        for(let key in this._soundList)
        {
            if(this._soundList[key]!== null && !exceptList.includes(key))
            {
                this._soundList[key].stop();
            }
        }
    }

    setChannel(assetPath, channel)
    {
        this._soundList[assetPath].channel = channel;
    }

    setChannelVolume(channel, volume)
    {
        for(let key in this._soundList)
        {
            if(this._soundList[key].channel === channel)
            {
                this._soundList[key].volume = volume;
            }
        }
    }

    get soundList()
    {
        return this._soundList;
    }

    set volume(volume)
    {
        this._volume = volume;

        Howler.volume(this._volume);
    }

    get volume()
    {
        return this._volume;
    }
}