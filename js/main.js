// Make sure SW are supported
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw-cached-site.js')
            .then(reg => console.log('SW registered'))
            .catch(error => console.log(`SW error: ${error}`));
    });
}