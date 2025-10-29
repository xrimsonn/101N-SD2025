if('serviceWorker' in navigator) {
    console.log('Loaded');
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('It did'))
        .catch((err) => console.log('not it did not', err));
} else {
    console.log('NOT LOADED');
}

