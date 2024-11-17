export function encode(thing) {
    return JSON.stringify(thing)

}

export function decode(thing) {
    return JSON.parse(thing)
}