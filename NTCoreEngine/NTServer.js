/**
 * Created by Nikhil Peter on 08-11-2017.
 */
import NTEventHandler from "./NTEventHandler";
import NTEngine from "./NTEngine";

const axios = require('axios');

export default class NTServer
{
    constructor()
    {
        this.RETRY_COUNT = 0;
        this.RETRY_LIMIT = 5;

        this._lastRequests = [];
    }

    getRequest(theUrl, callback)
    {
        if(navigator.onLine)
        {
            axios.get(theUrl)
                .then((response) =>{

                    NTEventHandler.dispatchEvent(NTEngine.EVENTS.ON_REQUEST_SUCCESS, {});
                    if(callback)
                        callback(response.data);

                    this.RETRY_COUNT = 0;
                })
                .catch((error)=> {
                    console.log(error);
                    this.retry(this.getRequest.bind(this, theUrl, callback));
                });
        }
        else
        {
           this.notifyNoInternet(this.getRequest.bind(this, theUrl, callback));
        }
    }

    postRequest(url, data, callback)
    {
        if(navigator.onLine)
        {
            axios.post(url, data)
                .then((response)=> {

                    NTEventHandler.dispatchEvent(NTEngine.EVENTS.ON_REQUEST_SUCCESS, {});
                    if(callback)
                        callback(response.data);

                    this.RETRY_COUNT = 0;
                })
                .catch((error)=> {
                    console.log(error);
                    this.retry(this.postRequest.bind(this, url, data, callback));
                });
        }
        else
        {
            this.notifyNoInternet(this.postRequest.bind(this, url, data, callback));
        }
    }

    retry(lastRequest)
    {
        this.RETRY_COUNT++;

        if(this.RETRY_COUNT < this.RETRY_LIMIT)
            this._retryIntervalId = setTimeout(lastRequest, Math.pow(2,this.RETRY_COUNT) * 1000);

    }

    notifyNoInternet(lastRequest)
    {
        this._lastRequests.push(lastRequest);

        if(!this._intervalID)
        {
            this._intervalID = setInterval(this.checkInternet.bind(this), 200);

            NTEventHandler.dispatchEvent(NTEngine.EVENTS.NETWORK , {"connected" : false});
        }
    }

    checkInternet()
    {
        if(navigator.onLine)
        {
            clearInterval(this._intervalID);
            this._intervalID = null;

            while(this._lastRequests.length !== 0)
                this._lastRequests.pop().call();

            NTEventHandler.dispatchEvent(NTEngine.EVENTS.NETWORK , {"connected" : true});
        }
    }

    reset()
    {
        this.RETRY_COUNT = 0;
        clearInterval(this._intervalID);
        this._intervalID = null;

        clearTimeout(this._retryIntervalId);
        this._retryIntervalId = null;
    }
}