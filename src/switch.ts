import {useElement} from './core/element.js'
import {Theme} from './core/theme.js'
import './ripple.js'

type Props = {
    check: boolean
    disable: boolean
}

const name         = 's-switch'
const props: Props = {
    check  : false,
    disable: false
}

const style = /*css*/`
:host{
    --s-switch-track-width: 52px;
    --s-switch-track-height: 32px;

    --s-switch-thumb-false-width: 16px;
    --s-switch-thumb-false-height: 16px;
    --s-switch-thumb-false-press-width: var(--s-switch-track-height);
    --s-switch-thumb-false-press-height: var(--s-switch-track-height);

    --s-switch-thumb-true-width: 24px;
    --s-switch-thumb-true-height: 24px;
    --s-switch-thumb-true-press-width: 28px;
    --s-switch-thumb-true-press-height: 28px;

    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    color: var(--s-color-primary, ${Theme.colorPrimary});
    width: var(--s-switch-track-width);
    height: var(--s-switch-track-height);
    border-radius: calc(infinity * 1px);
}
:host([disable=true]){
    pointer-events: none;
}
.track{
    width: 100%;
    height: 100%;
    border: solid 2px var(--s-color-outline, ${Theme.colorOutline});
    box-sizing: border-box;
    border-radius: inherit;
}
:host([disable=true]) .track{
    border-color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
:host([check=true]) .track{
    border-width: 0;
    background: currentColor;
}
:host([disable=true][check=true]) .track{
    background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent) !important;
}
.ripple{
    height: 125%;
    width: auto;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    border-radius: calc(infinity * 1px);
    inset: auto;
    transition: transform var(--s-motion-duration-short4, ${Theme.motionDurationShort4}) var(--s-motion-easing-emphasized, ${Theme.motionEasingEmphasized});
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: var(--s-color-outline, ${Theme.colorOutline});
    transform: translateX(-10%);
}
:host([check=true]) .ripple{
    transform: translateX(40%);
    color: currentColor;
}
.thumb{
    background: var(--s-color-outline, ${Theme.colorOutline});
    border-radius: calc(infinity * 1px);
    width: var(--s-switch-thumb-false-width);
    height: var(--s-switch-thumb-false-height);
    transition: transform var(--s-motion-duration-short4, ${Theme.motionDurationShort4}) var(--s-motion-easing-emphasized, ${Theme.motionEasingEmphasized});
    position: relative;
    transform-origin: center;
    transition-property: height, width;
    transition-duration: 250ms, 250ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1), cubic-bezier(0.2, 0, 0, 1);
}
:host([disable=true]) .thumb{
    background: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent);
}
:host([disable=true][check=true]) .thumb{
    background: var(--s-color-surface, ${Theme.colorSurface});
    box-shadow: none;
}
/* 选中和反选样式 */
:host(:not([check=true])) .thumb{
    width: var(--s-switch-thumb-false-width);
    height: var(--s-switch-thumb-false-height);
}
:host([check=true]) .thumb{
    width: var(--s-switch-thumb-true-width);
    height: var(--s-switch-thumb-true-height);
    background: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
/* 选中和反选 :active 样式 */
:host(:not([check=true]):active) .thumb{
    width: var(--s-switch-thumb-false-press-width);
    height: var(--s-switch-thumb-false-press-height);
}
:host([check=true]:active) .thumb{
    width: var(--s-switch-thumb-true-press-width);
    height: var(--s-switch-thumb-true-press-height);
}
.icon{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity var(--s-motion-duration-short4, ${Theme.motionDurationShort4}) var(--s-motion-easing-emphasized, ${Theme.motionEasingEmphasized});
    color: currentColor;
}
::slotted([slot=icon]),
svg{
    color: currentColor;
    fill: currentColor;
    width: 70%;
    height: 70%;
}
:host([check=true]) .icon{
    opacity: 1;
}
:host([check=true][disable=true]) .icon{
    color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 12%, transparent);
}
@supports not (color: color-mix(in srgb, black, white)){
    :host([disable=true]) .track{
        border-color: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) !important;
    }
    :host([disable=true][check=true]) .track{
        background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) !important;
    }
    :host([disable=true]) .thumb{
        background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest}) !important;
    }
    :host([disable=true][check=true]) .thumb{
        background: var(--s-color-surface, ${Theme.colorSurface}) !important;
    }
}
`

const template = /*html*/`
<div class="track" part="track"></div>
<s-ripple attached="true" class="ripple" part="ripple">
    <div class="thumb" part="thumb">
        <slot name="icon" class="icon"></slot>
    </div>
</s-ripple>
`

class Switch extends useElement({
    style, template, props, syncProps: true,
    setup() {
        this.addEventListener('click', () => {
            this.check = !this.check
            this.dispatchEvent(new Event('change'))
        })
    }
}) {
}

Switch.define(name)

export {Switch}

declare global {
    interface HTMLElementTagNameMap {
        [name]: Switch
    }

    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                //@ts-ignore
                [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
            }
        }
    }
}

//@ts-ignore
declare module 'vue' {
    //@ts-ignore
    import {HTMLAttributes} from 'vue'

    interface GlobalComponents {
        [name]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<Props>
        } & Switch
    }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
    namespace JSX {
        export interface IntrinsicElements {
            //@ts-ignore
            [name]: IntrinsicElements['div'] & Partial<Props>
        }
    }
}

//@ts-ignore
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            //@ts-ignore
            [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
        }
    }
}

//@ts-ignore
declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            //@ts-ignore
            [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
        }
    }
}
