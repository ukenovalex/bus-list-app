export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line
            // fn.apply(this, args)
            fn(...args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}