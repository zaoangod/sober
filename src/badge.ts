import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {}

const name = 's-badge'
const props: Props = {
}

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  font-size: .625rem;
  vertical-align: middle;
  background: var(--s-color-error, ${Theme.colorError});
  color: var(--s-color-on-error, ${Theme.colorOnError});
}
:host(:not(:empty)) .text{
  padding: 2px 5px;
  text-align: center;
  display: block;
  background: inherit;
  color: inherit;
  border: inherit;
  border-radius: 24px;
  box-sizing: border-box;
}
`
const template = /*html*/`<slot class="text" part="text"></slot>`

class Badge extends useElement({ style, template, props }) { }

Badge.define(name)

export { Badge }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Badge
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
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      $props: HTMLAttributes & Partial<Props>
    }
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