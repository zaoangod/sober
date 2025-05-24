export const supports = {
    CSSStyleSheet: true,
    CSSContainer : CSS.supports('container-type', 'size')
}

try {
    new CSSStyleSheet()
} catch (error) {
    supports.CSSStyleSheet = false
}

type Prop = string | number | boolean

const parseType = (value: unknown, old: Prop) => {
    if (value === undefined) return old
    if (typeof old === 'string') return String(value)
    if (typeof old === 'number') return Number(value)
    if (typeof old === 'boolean') {
        if (typeof value === 'boolean') return value
        return value === 'true' ? true : false
    }
    throw new TypeError()
}

const baseStyle = /*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
`

const setStyle = (shadowRoot: ShadowRoot, css?: string) => {
    const all = [baseStyle, css]
    for (const css of all) {
        if (!css) continue
        if (!supports.CSSStyleSheet) {
            const element: HTMLStyleElement = document.createElement('style')
            element.textContent             = css ?? ''
            shadowRoot.insertBefore(element, shadowRoot.firstChild)
            continue
        }
        const sheet = new CSSStyleSheet()
        sheet.replaceSync(css)
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet]
    }
}

export const useElement = <
    P extends { [key: string]: Prop } = {},
    E extends {} = {}
>(option: {
    style?: string
    props?: P
    syncProps?: (keyof P)[] | true
    template?: string
    setup?: (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
        onMounted?: () => void
        onUnmounted?: () => void
        onAdopted?: () => void
        expose?: E & { [K in keyof P]?: never }
    } & {
        [K in keyof P]?: ((v: P[K], old: P[K]) => void) |
        {
            get?: (old: P[K]) => P[K],
            set?: (v: P[K], old: P[K]) => void
        }
    } | void
}): {
    new(): P & E & HTMLElement
    readonly define: (name: string) => void
    prototype: HTMLElement
} => {
    const attrs: string[]                       = []
    const upperAttrs: { [key: string]: string } = {}
    for (const key in option.props) {
        const value: string = key.toLowerCase()
        attrs.push(value)
        upperAttrs[value] = key
    }
    type ReturnType<T extends ((...args: any) => any) | undefined> = T extends (...args: any) => infer R ? R : T
    const map = new Map<HTMLElement, ReturnType<typeof option.setup>>()

    class Prototype extends HTMLElement {
        static observedAttributes: string[] = attrs

        constructor() {
            super()
            const shadowRoot: ShadowRoot = this.attachShadow({mode: 'open'})
            shadowRoot.innerHTML         = option.template ?? ''
            setStyle(shadowRoot, option.style)
            const props                             = {...option.props}
            const ahead: { [key: string]: unknown } = {}
            for (const key in option.props) {
                const k = key as keyof this
                if (this[k] !== undefined) {
                    ahead[key] = this[k]
                }
                this[k] = props[key] as never
            }
            const setup = option.setup?.apply(this as any, [shadowRoot])
            for (const key in option.props) {
                Object.defineProperty(this, key, {
                    configurable: true,

                    get: () => {
                        const call = setup?.[key]
                        if (!call || typeof call === 'function' || !call.get) return props[key]
                        return call.get?.(props[key] as never)
                    },

                    set: (v) => {
                        console.log('v:', v)
                        const value = parseType(v, option.props![key])
                        if (value === this[key as keyof this]) return
                        if (option.syncProps === true || option.syncProps?.includes(key)) {
                            const lowerKey  = key.toLowerCase()
                            const attrValue = this.getAttribute(lowerKey)
                            const valueStr  = String(value)
                            if (value === option.props?.[key] && attrValue !== null) {
                                this.removeAttribute(lowerKey)
                                return
                            }
                            if (value !== option.props?.[key] && attrValue !== valueStr) {
                                this.setAttribute(lowerKey, valueStr)
                                return
                            }
                        }
                        const old  = props[key]
                        props[key] = value
                        const call = setup?.[key]
                        if (!call) return
                        try {
                            typeof call === 'function' ? call(value as never, old as never) : call.set?.(value as never, old as never)
                        } catch (error) {
                            props[key] = old
                            throw error
                        }
                    }
                })
            }
            for (const key in setup?.expose) {
                Object.defineProperty(this, key, {get: () => setup?.expose?.[key]})
            }
            for (const key in ahead) {
                this[key as keyof this] = ahead[key] as never
            }
            map.set(this, setup)
            //@ts-ignore
            this.connectedCallback = this.disconnectedCallback = this.adoptedCallback = this.attributeChangedCallback = undefined
        }

        static define(name: string) {
            customElements.define(name, this)
        }

        connectedCallback() {
            console.info('-> connectedCallback')
            map.get(this)?.onMounted?.()
        }

        disconnectedCallback() {
            console.info('-> disconnectedCallback')
            map.get(this)?.onUnmounted?.()
        }

        adoptedCallback() {
            console.info('-> adoptedCallback')
            map.get(this)?.onAdopted?.()
        }

        attributeChangedCallback(key: string, _: unknown, value: string | null) {
            console.info('-> attributeChangedCallback')
            this[upperAttrs[key] as keyof this] = (value ?? undefined) as never
        }
    }

    return Prototype as never
}
