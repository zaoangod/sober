import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-search'
const props = {
  placeholder: '',
  disabled: false,
  value: '',
  maxLength: -1,
  readOnly: false
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  width: 220px;
  height: 40px;
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  border-radius: 24px;
  font-size: .875rem;
  flex-shrink: 0;
  position: relative;
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  flex-grow: 1;
}
:host(:focus-within) .container{
  z-index: var(--z-index, 1);
}
input{
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 0;
  flex-grow: 1;
  background: none;
  outline: none;
  font-size: inherit;
  color: inherit;
  box-sizing: border-box;
  line-height: 1;
  font-family: inherit;
  caret-color: var(--s-color-primary, ${Theme.colorPrimary});
}
input::placeholder{
  color: var(--s-color-outline, ${Theme.colorOutline});
}
input::selection{
  background: var(--s-color-primary, ${Theme.colorPrimary});
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
.dropdown{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  background: inherit;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  border-radius: 4px;
  opacity: 0;
  transition: opacity .2s ease-out;
}
:host(:focus-within) .dropdown{
  opacity: 1;
  pointer-events: auto;
  z-index: var(--z-index, 1);
}
::slotted([slot=dropdown]){
  border-top: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  margin-top: 40px;
  border-radius: 4px;
}
::slotted([slot]){
  flex-shrink: 0;
}
::slotted(svg){
  height: 24px;
  width: 24px;
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
::slotted(s-icon[slot=start]),
::slotted(svg[slot=start]){
  margin: 0 -8px 0 8px;
}
::slotted(s-icon[slot=end]),
::slotted(svg[slot=end]){
  margin: 0 8px 0 -8px;
}
::slotted(s-icon-button[slot=start]){
  margin-right: -16px;
}
::slotted(s-icon-button[slot=end]){
  margin-left: -16px;
}
`

const template = /*html*/`
<div class="dropdown" part="dropdown">
  <slot name="dropdown"></slot>
</div>
<div class="container" part="container">
  <slot name="start"></slot>
  <input type="text">
  <slot name="end"></slot>
</div>
`

export class Search extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const input = shadowRoot.querySelector('input') as HTMLInputElement
    const dropdown = shadowRoot.querySelector('[name=dropdown]') as HTMLSlotElement
    dropdown.addEventListener('mousedown', (e) => e.preventDefault())
    input.addEventListener('change', () => this.dispatchEvent(new Event('change')))
    return {
      expose: {
        get value() {
          return input.value
        }
      },
      props: {
        value: (value) => input.value = value,
        placeholder: (placeholder) => input.placeholder = placeholder,
        maxLength: (maxLength) => input.maxLength = maxLength,
        readOnly: (readOnly) => input.readOnly = readOnly
      }
    }
  }
}) { }

Search.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Search
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}