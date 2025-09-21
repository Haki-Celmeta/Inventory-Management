export const upperFirst = (s) => {
    return `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`
}

export const capitalizeEachWord = (s) => {
    if(!s) return ''
    return s
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const extraLightColor = (c) => {
    if(typeof c !== 'string') return 'var(--extra-light-green)'
    if(!c) return 'var(--extra-light-green)'
    return `var(--extra-light-${c})`
}
export const lightColor = (c) => {
    if(typeof c !== 'string') return 'var(--light-green)'
    if(!c) return `var(--light-green)`;
    return `var(--light-${c})`
}
export const mediumColor = (c) => {
    if(typeof c !== 'string') return 'var(--medium-green)'
    if(!c) return `var(--medium-green)`
    return `var(--medium-${c})`
}
export const darkColor = (c) => {
    if(typeof c !== 'string') return 'var(--dark-green)'
    if(!c) return `var(--dark-green)`
    return `var(--dark-${c})`
}
