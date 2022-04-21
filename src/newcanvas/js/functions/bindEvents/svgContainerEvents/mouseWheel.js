import { anbt } from "../../../anbt";
import { softModifyBrushSize } from "../changeBrushSize";


let scale = 0;
let shift = null;
// https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
export function mouseWheel(event) {
    if (anbt.isFocused) { // change brush size on scroll
        event.preventDefault();
        
        shift = shift ?? scale;

        scale += event.deltaY * -0.01;

        let delta = shift + scale;

        let step = Math.min(Math.max(delta, -1), 1);

        console.log(scale, shift, step, event);
        if (Math.abs(step) === 1) {
            console.log(`Stepped: scale:${scale}, shift:${shift}, step: ${step}`);
            scale = 0; shift = scale;
            softModifyBrushSize(step);
        }

    }
}
