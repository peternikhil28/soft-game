/* Created by Nikhil Peter on 3/15/2018 */

let NTEventHandler =
{
    addEventListener(event, callback)
    {
        document.addEventListener(event, callback);
    },

    removeEventListener(event, callback)
    {
        document.removeEventListener(event, callback);
    },

    dispatchEvent(event, data)
    {
        let e = new CustomEvent(event, { detail : data });
        document.dispatchEvent(e);
    }
};

export default NTEventHandler;