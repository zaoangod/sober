import {useElement} from './core/element.js'
import {Theme} from './core/theme.js'

type Props = {}

const name         = 's-table'
const props: Props = {}

const style = /*css*/`
:host{
  display: inline-block;
  font-size: .875rem;
  overflow: auto;
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  border-radius: 4px;
  white-space: nowrap;
}
slot{
  display: table;
  border-collapse: collapse;
  min-width: 100%;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background: transparent;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
    border-radius: 3px;
  }
  @supports not selector(::-webkit-scrollbar){
    :host{
      scrollbar-color: var(--s-color-outline-variant, ${Theme.colorOutlineVariant}) transparent;
    }
  }
}
`

const template = /*html*/`
<slot></slot>
`

class Table extends useElement({style, template, props}) {
}

const theadName         = 's-thead'
const theadProps: Props = {}

const theadStyle = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  border-bottom: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
`

const theadTemplate =/*html*/`<slot></slot>`

class Thead extends useElement({
    style   : theadStyle,
    template: theadTemplate,
    props   : theadProps
}) {
}

const tbodyName         = 's-tbody'
const tbodyProps: Props = {}

const tbodyStyle = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
::slotted(s-tr:not(:first-child)){
  border-top: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
`

const tbodyTemplate =/*html*/`<slot></slot>`

class Tbody extends useElement({
    style   : tbodyStyle,
    template: tbodyTemplate,
    props   : tbodyProps
}) {
}

const trName         = 's-tr'
const trProps: Props = {}

const trStyle = /*css*/`
:host{
  display: table-row;
}
`

const trTemplate =/*html*/`<slot></slot>`

class Tr extends useElement({
    style   : trStyle,
    template: trTemplate,
    props   : trProps
}) {
}

const thName         = 's-th'
const thProps: Props = {}

const thStyle = /*css*/`
:host{
  display: table-cell;
  padding: 12px 16px;
  text-transform: capitalize;
}
`

const thTemplate =/*html*/`<slot></slot>`

class Th extends useElement({
    style   : thStyle,
    template: thTemplate,
    props   : thProps
}) {
}

const tdName         = 's-td'
const tdProps: Props = {}

const tdStyle = /*css*/`
:host{
  display: table-cell;
  user-select: text;
  padding: 12px 16px;
}
`

const tdTemplate = /*html*/`<slot></slot>`

class Td extends useElement({
    style   : tdStyle,
    template: tdTemplate,
    props   : tdProps
}) {
}

Table.define(name)
Thead.define(theadName)
Tbody.define(tbodyName)
Tr.define(trName)
Th.define(thName)
Td.define(tdName)

export {Table, Thead, Tbody, Tr, Th, Td}

declare global {
    interface HTMLElementTagNameMap {
        [name]: Table
        [theadName]: Thead
        [tbodyName]: Tbody
        [trName]: Tr
        [thName]: Th
        [tdName]: Td
    }

    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                //@ts-ignore
                [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
                //@ts-ignore
                [theadName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof theadProps>
                //@ts-ignore
                [tbodyName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof tbodyProps>
                //@ts-ignore
                [trName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof trProps>
                //@ts-ignore
                [thName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof thProps>
                //@ts-ignore
                [tdName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof tdProps>
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
        } & Table
        [theadName]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<typeof theadProps>
        } & Thead
        [tbodyName]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<typeof tbodyProps>
        } & Tbody
        [trName]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<typeof trProps>
        } & Tr
        [thName]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<typeof thProps>
        } & Th
        [tdName]: new () => {
            /**
             * @deprecated
             **/
            $props: HTMLAttributes & Partial<typeof tdProps>
        } & Td
    }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
    namespace JSX {
        export interface IntrinsicElements {
            //@ts-ignore
            [name]: IntrinsicElements['div'] & Partial<Props>
            //@ts-ignore
            [tbodyName]: HTMLAttributes & Partial<typeof tbodyProps>
            //@ts-ignore
            [trName]: HTMLAttributes & Partial<typeof trProps>
            //@ts-ignore
            [thName]: HTMLAttributes & Partial<typeof thProps>
            //@ts-ignore
            [tdName]: HTMLAttributes & Partial<typeof tdProps>
        }
    }
}

//@ts-ignore
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            //@ts-ignore
            [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
            //@ts-ignore
            [theadName]: JSX.HTMLAttributes & Partial<typeof theadProps>
            //@ts-ignore
            [tbodyName]: JSX.HTMLAttributes & Partial<typeof tbodyProps>
            //@ts-ignore
            [trName]: JSX.HTMLAttributes & Partial<typeof trProps>
            //@ts-ignore
            [thName]: JSX.HTMLAttributes & Partial<typeof thProps>
            //@ts-ignore
            [tdName]: JSX.HTMLAttributes & Partial<typeof tdProps>
        }
    }
}

//@ts-ignore
declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            //@ts-ignore
            [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
            //@ts-ignore
            [theadName]: JSXInternal.HTMLAttributes & Partial<typeof theadProps>
            //@ts-ignore
            [tbodyName]: JSXInternal.HTMLAttributes & Partial<typeof tbodyProps>
            //@ts-ignore
            [trName]: JSXInternal.HTMLAttributes & Partial<typeof trProps>
            //@ts-ignore
            [thName]: JSXInternal.HTMLAttributes & Partial<typeof thProps>
            //@ts-ignore
            [tdName]: JSXInternal.HTMLAttributes & Partial<typeof tdProps>
        }
    }
}
