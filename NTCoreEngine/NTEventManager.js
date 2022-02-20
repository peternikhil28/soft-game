/* Created by Nikhil Peter on 5/25/2018 */

export default class NTEventManager
{
    constructor()
    {
        this._eventList = [];
    }

    get length()
    {
        return this._eventList.length;
    }

    pushEvent(func, delay)
    {
        delay = delay || 0;
    
        let event = {method : func, delay : delay};
        this._eventList.push(event);
    }
    
    invokeNextEvent()
    {
        if(this._eventList.length > 0)
        {
            let event = this._eventList.shift();
    
            if(event.delay > 0)
                setTimeout(event.method, event.delay);
            else
                event.method.call();
        }
    }
    
    clearAllEvents()
    {
        this._eventList.length = 0;
    }

    destroy()
    {
        this._eventList.length = 0;
        this._eventList = null;
    }
}