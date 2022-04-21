import { anbt } from '../../../anbt'

export function trackFocus(event) {
    /**
     * @type {HTMLElement} target
     */
    const target = document.elementFromPoint(event.clientX, event.clientY);
    console.log(target);
    
    if ( anbt.container !== null) {
        
        if (target.isEqualNode(anbt.container) || anbt.container.contains(target)) {
            anbt.isFocused = true;
            return;
        }
    }

    anbt.isFocused = false;
}

export function playerIsDrawing() {

    return (anbt.isFocused || anbt.isStroking );

}