'use strict';

const port = {
    target: document.querySelector('main#main'),
    loading: document.getElementById('loading'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    jsonURLProject: null,
    onSite: null,
    contentHTML: '',
    tools: [
        {
            name: 'HTML5',
            class: 'html5',
            cat: 'front-end',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
                </svg>`
        },
        {
            name: 'CSS3',
            class: 'css3',
            cat: 'front-end',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3 .1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2 .1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"/>
                </svg>`
        },
        {
            name: 'SASS',
            class: 'sass',
            cat: 'sub-front-end',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M301.8 378.9c-.3 .6-.6 1.1 0 0zm249.1-87a131.2 131.2 0 0 0 -58 13.5c-5.9-11.9-12-22.3-13-30.1-1.2-9.1-2.5-14.5-1.1-25.3s7.7-26.1 7.6-27.2-1.4-6.6-14.3-6.7-24 2.5-25.3 5.9a122.8 122.8 0 0 0 -5.3 19.1c-2.3 11.7-25.8 53.5-39.1 75.3-4.4-8.5-8.1-16-8.9-22-1.2-9.1-2.5-14.5-1.1-25.3s7.7-26.1 7.6-27.2-1.4-6.6-14.3-6.7-24 2.5-25.3 5.9-2.7 11.4-5.3 19.1-33.9 77.3-42.1 95.4c-4.2 9.2-7.8 16.6-10.4 21.6-.4 .8-.7 1.3-.9 1.7 .3-.5 .5-1 .5-.8-2.2 4.3-3.5 6.7-3.5 6.7v.1c-1.7 3.2-3.6 6.1-4.5 6.1-.6 0-1.9-8.4 .3-19.9 4.7-24.2 15.8-61.8 15.7-63.1-.1-.7 2.1-7.2-7.3-10.7-9.1-3.3-12.4 2.2-13.2 2.2s-1.4 2-1.4 2 10.1-42.4-19.4-42.4c-18.4 0-44 20.2-56.6 38.5-7.9 4.3-25 13.6-43 23.5-6.9 3.8-14 7.7-20.7 11.4-.5-.5-.9-1-1.4-1.5-35.8-38.2-101.9-65.2-99.1-116.5 1-18.7 7.5-67.8 127.1-127.4 98-48.8 176.4-35.4 189.8-5.6 19.4 42.5-41.9 121.6-143.7 133-38.8 4.3-59.2-10.7-64.3-16.3-5.3-5.9-6.1-6.2-8.1-5.1-3.3 1.8-1.2 7 0 10.1 3 7.9 15.5 21.9 36.8 28.9 18.7 6.1 64.2 9.5 119.2-11.8 61.8-23.8 109.9-90.1 95.8-145.6C386.5 18.3 293-.2 204.6 31.2c-52.7 18.7-109.7 48.1-150.7 86.4-48.7 45.6-56.5 85.3-53.3 101.9 11.4 58.9 92.6 97.3 125.1 125.7-1.6 .9-3.1 1.7-4.5 2.5-16.3 8.1-78.2 40.5-93.7 74.7-17.5 38.8 2.9 66.6 16.3 70.4 41.8 11.6 84.6-9.3 107.6-43.6s20.2-79.1 9.6-99.5c-.1-.3-.3-.5-.4-.8 4.2-2.5 8.5-5 12.8-7.5 8.3-4.9 16.4-9.4 23.5-13.3-4 10.8-6.9 23.8-8.4 42.6-1.8 22 7.3 50.5 19.1 61.7 5.2 4.9 11.5 5 15.4 5 13.8 0 20-11.4 26.9-25 8.5-16.6 16-35.9 16-35.9s-9.4 52.2 16.3 52.2c9.4 0 18.8-12.1 23-18.3v.1s.2-.4 .7-1.2c1-1.5 1.5-2.4 1.5-2.4v-.3c3.8-6.5 12.1-21.4 24.6-46 16.2-31.8 31.7-71.5 31.7-71.5a201.2 201.2 0 0 0 6.2 25.8c2.8 9.5 8.7 19.9 13.4 30-3.8 5.2-6.1 8.2-6.1 8.2a.3 .3 0 0 0 .1 .2c-3 4-6.4 8.3-9.9 12.5-12.8 15.2-28 32.6-30 37.6-2.4 5.9-1.8 10.3 2.8 13.7 3.4 2.6 9.4 3 15.7 2.5 11.5-.8 19.6-3.6 23.5-5.4a82.2 82.2 0 0 0 20.2-10.6c12.5-9.2 20.1-22.4 19.4-39.8-.4-9.6-3.5-19.2-7.3-28.2 1.1-1.6 2.3-3.3 3.4-5C434.8 301.7 450.1 270 450.1 270a201.2 201.2 0 0 0 6.2 25.8c2.4 8.1 7.1 17 11.4 25.7-18.6 15.1-30.1 32.6-34.1 44.1-7.4 21.3-1.6 30.9 9.3 33.1 4.9 1 11.9-1.3 17.1-3.5a79.5 79.5 0 0 0 21.6-11.1c12.5-9.2 24.6-22.1 23.8-39.6-.3-7.9-2.5-15.8-5.4-23.4 15.7-6.6 36.1-10.2 62.1-7.2 55.7 6.5 66.6 41.3 64.5 55.8s-13.8 22.6-17.7 25-5.1 3.3-4.8 5.1c.5 2.6 2.3 2.5 5.6 1.9 4.6-.8 29.2-11.8 30.3-38.7 1.6-34-31.1-71.4-89-71.1zm-429.2 144.7c-18.4 20.1-44.2 27.7-55.3 21.3C54.6 451 59.3 421.4 82 400c13.8-13 31.6-25 43.4-32.4 2.7-1.6 6.6-4 11.4-6.9 .8-.5 1.2-.7 1.2-.7 .9-.6 1.9-1.1 2.9-1.7 8.3 30.4 .3 57.2-19.1 78.3zm134.4-91.4c-6.4 15.7-19.9 55.7-28.1 53.6-7-1.8-11.3-32.3-1.4-62.3 5-15.1 15.6-33.1 21.9-40.1 10.1-11.3 21.2-14.9 23.8-10.4 3.5 5.9-12.2 49.4-16.2 59.2zm111 53c-2.7 1.4-5.2 2.3-6.4 1.6-.9-.5 1.1-2.4 1.1-2.4s13.9-14.9 19.4-21.7c3.2-4 6.9-8.7 10.9-13.9 0 .5 .1 1 .1 1.6-.1 17.9-17.3 30-25.1 34.8zm85.6-19.5c-2-1.4-1.7-6.1 5-20.7 2.6-5.7 8.6-15.3 19-24.5a36.2 36.2 0 0 1 1.9 10.8c-.1 22.5-16.2 30.9-25.9 34.4z"/>
                </svg>`
        },
        {
            name: 'Bootstrap',
            class: 'bootstrap',
            cat: 'sub-front-end',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M333.5 201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4 238.2 333.5 225 333.5 201.4zM517 188.6c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1 0-55.8 28.1-54.7 58.5c1 29.3-.3 67.2-9.8 98.1c-9.6 31-25.7 50.6-52.2 53.1v28.5c26.4 2.5 42.6 22.1 52.2 53.1c9.5 30.9 10.9 68.8 9.8 98.1c-1.1 30.5 22.7 58.5 54.7 58.5h328.7c32.1 0 55.8-28.1 54.7-58.5c-1-29.3 .3-67.2 9.8-98.1c9.6-31 25.7-50.6 52.1-53.1v-28.5C542.7 239.2 526.5 219.6 517 188.6zM300.2 375.1h-97.9V136.8h97.4c43.3 0 71.7 23.4 71.7 59.4c0 25.3-19.1 47.9-43.5 51.8v1.3c33.2 3.6 55.5 26.6 55.5 58.3C383.4 349.7 352.1 375.1 300.2 375.1zM290.2 266.4h-50.1v78.4h52.3c34.2 0 52.3-13.7 52.3-39.5C344.7 279.6 326.1 266.4 290.2 266.4z"/>
                </svg>`
        },
        {
            name: 'Tailwind',
            class: 'tailwind',
            cat: 'sub-front-end',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14">
                    <path d="M9.782.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231C14.488 3.365 13.551.6 9.782.72ZM4.8 6.979A4.772 4.772 0 0 0 0 11.151a3.43 3.43 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231C9.51 9.623 8.573 6.853 4.8 6.979Z"/>
                </svg>`
        },
        {
            name: 'JavaScript',
            class: 'javascript',
            cat: 'js',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
                </svg>`
        },
        {
            name: 'React',
            class: 'react',
            cat: 'js',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/>
                </svg>`
        },
        {
            name: 'jQuery',
            class: 'jquery',
            cat: 'js',
            svg: `<svg viewBox="0 0 128 128">
                    <path d="M65.283 106.928c-.828-.187-1.633-.446-2.441-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a71.149 71.149 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.238-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a57.368 57.368 0 01-1.751-.982l-.591-.33a79.8 79.8 0 01-2.28-1.397l-.615-.41a57.785 57.785 0 01-1.623-1.079l-.523-.367a93.376 93.376 0 01-1.534-1.109l-.679-.514a67.061 67.061 0 01-1.384-1.082l-.617-.495a85.378 85.378 0 01-1.724-1.453l-.188-.159a81.186 81.186 0 01-1.812-1.647l-.51-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a72.65 72.65 0 01-1.599-1.69l-.078-.084a65.735 65.735 0 01-1.621-1.844l-.424-.504a67.378 67.378 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794C12.89 62.89 8.524 40.032 18.236 21.26L9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.411.801.617 1.198l.395.759.245.437.439.786c.262.461.53.92.805 1.379l.458.756c.304.491.615.976.934 1.46l.398.614c.438.655.888 1.309 1.352 1.951l.039.05.228.308c.4.553.814 1.099 1.232 1.639l.463.59c.373.469.752.935 1.139 1.399l.435.52a75.27 75.27 0 001.586 1.812l.032.033.062.068a77.952 77.952 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.526.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.526.456 1.062.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.495.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.749.474 1.51.943 2.278 1.396l.63.355a74.53 74.53 0 001.711.959c.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.786.275 1.581.53 2.381.779l.575.172c.814.245 1.618.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.014 16.954-36.112 21.426-57.997 16.447zM46.069 63.697c1.195 1.713 2.52 3.751 4.105 5.127a48.111 48.111 0 001.79 1.858l.472.465a52.581 52.581 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.484.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.679.448 1.02.672l.482.319c.544.349 1.096.689 1.656 1.015l.234.136c.483.278.973.552 1.463.818l.521.271c.339.177.678.358 1.024.53l.155.07c.702.346 1.411.68 2.136.995l.472.194a50.02 50.02 0 001.75.71l.75.275c.533.198 1.068.378 1.608.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.69-24.886 50.69-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.7-.227a46.162 46.162 0 01-1.632-.562l-.736-.274a57.432 57.432 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.364-.177-.721-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.802 47.802 0 01-1.65-1.008l-.498-.332a65.856 65.856 0 01-1.069-.707 58.235 58.235 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.897-14.486-16.819-23.971-3.062-9.836-2.401-20.878 2.903-29.84l-6.517 9.2c-7.977 11.478-7.543 26.844-1.321 38.983a50.37 50.37 0 003.528 5.892zm43.407-14.199c.339.125.678.237 1.022.354l.451.143c.484.152.966.329 1.467.424 22.739 4.394 28.908-11.669 30.549-14.034-5.403 7.779-14.482 9.646-25.623 6.942-.88-.213-1.848-.531-2.696-.832a33.242 33.242 0 01-3.201-1.329 33.175 33.175 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745l-3.52 4.851c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.112 10.492 14.475 18.721 17.494z"></path>
                </svg>`
        },
        {
            name: 'WordPress',
            class: 'wordpress',
            cat: 'backend',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2.597 7.81l4.911 13.454c-3.434-1.668-5.802-5.19-5.802-9.264 0-1.493.32-2.91.891-4.19zm16.352 3.67c0-1.272-.457-2.153-.849-2.839-.521-.849-1.011-1.566-1.011-2.415 0-.978.747-1.88 1.862-1.819-1.831-1.677-4.271-2.701-6.951-2.701-3.596 0-6.76 1.845-8.601 4.64.625.02 1.489.032 3.406-.118.555-.034.62.782.066.847 0 0-.558.065-1.178.098l3.749 11.15 2.253-6.756-1.604-4.394c-.555-.033-1.08-.098-1.08-.098-.555-.033-.49-.881.065-.848 2.212.17 3.271.171 5.455 0 .555-.033.621.783.066.848 0 0-.559.065-1.178.098l3.72 11.065 1.027-3.431c.444-1.423.783-2.446.783-3.327zm-6.768 1.42l-3.089 8.975c.922.271 1.898.419 2.908.419 1.199 0 2.349-.207 3.418-.583-.086-.139-3.181-8.657-3.237-8.811zm8.852-5.839c.224 1.651-.099 3.208-.713 4.746l-3.145 9.091c3.061-1.784 5.119-5.1 5.119-8.898 0-1.79-.457-3.473-1.261-4.939zm2.967 4.939c0 6.617-5.384 12-12 12s-12-5.383-12-12 5.383-12 12-12 12 5.383 12 12zm-.55 0c0-6.313-5.137-11.45-11.45-11.45s-11.45 5.137-11.45 11.45 5.137 11.45 11.45 11.45 11.45-5.137 11.45-11.45z"/>
                </svg>`
        },
        {
            name: 'PHP',
            class: 'php',
            cat: 'backend',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"/>
                </svg>`
        },
        {
            name: 'MySQL',
            class: 'mysql',
            cat: 'backend',
            svg: `<svg viewBox="0 0 128 128">
                    <path d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.577 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.449-4.717-4.854-9.868-7.024-14.831-1.48-3.384-2.447-6.72-4.293-9.756-8.86-14.567-18.396-23.358-33.169-32-3.144-1.838-6.929-2.563-10.929-3.513-2.145-.129-4.292-.26-6.438-.391-1.311-.546-2.673-2.149-3.902-2.927C17.811 4.565 5.257-2.16 1.633 6.682c-2.289 5.581 3.421 11.025 5.462 13.854 1.434 1.982 3.269 4.207 4.293 6.438.674 1.467.79 2.938 1.367 4.489 1.417 3.822 2.652 7.98 4.487 11.511.927 1.788 1.949 3.67 3.122 5.268.718.981 1.951 1.413 2.145 2.927-1.204 1.686-1.273 4.304-1.95 6.44-3.05 9.615-1.899 21.567 2.537 28.683 1.36 2.186 4.567 6.871 8.975 5.073 3.856-1.57 2.995-6.438 4.098-10.732.249-.973.096-1.689.585-2.341v.195l3.513 7.024c2.6 4.187 7.212 8.562 11.122 11.514 2.027 1.531 3.623 4.177 6.244 5.073v-.196h-.195c-.508-.791-1.303-1.119-1.951-1.755-1.527-1.497-3.225-3.358-4.487-5.073-3.556-4.827-6.698-10.11-9.561-15.609-1.368-2.627-2.557-5.523-3.709-8.196-.444-1.03-.438-2.589-1.364-3.122-1.263 1.958-3.122 3.542-4.098 5.854-1.561 3.696-1.762 8.204-2.341 12.878-.342.122-.19.038-.391.194-2.718-.655-3.672-3.452-4.683-5.853-2.554-6.07-3.029-15.842-.781-22.829.582-1.809 3.21-7.501 2.146-9.172-.508-1.666-2.184-2.63-3.121-3.903-1.161-1.574-2.319-3.646-3.124-5.464-2.09-4.731-3.066-10.044-5.267-14.828-1.053-2.287-2.832-4.602-4.293-6.634-1.617-2.253-3.429-3.912-4.683-6.635-.446-.968-1.051-2.518-.391-3.513.21-.671.508-.951 1.171-1.17 1.132-.873 4.284.29 5.462.779 3.129 1.3 5.741 2.538 8.392 4.294 1.271.844 2.559 2.475 4.097 2.927h1.756c2.747.631 5.824.195 8.391.975 4.536 1.378 8.601 3.523 12.292 5.854 11.246 7.102 20.442 17.21 26.732 29.269 1.012 1.942 1.45 3.794 2.341 5.854 1.798 4.153 4.063 8.426 5.852 12.488 1.786 4.052 3.526 8.141 6.05 11.513 1.327 1.772 6.451 2.723 8.781 3.708 1.632.689 4.307 1.409 5.854 2.34 2.953 1.782 5.815 3.903 8.586 5.855 1.383.975 5.64 3.116 5.852 4.879zM29.729 23.466c-1.431-.027-2.443.156-3.513.389v.195h.195c.683 1.402 1.888 2.306 2.731 3.513.65 1.367 1.301 2.732 1.952 4.097l.194-.193c1.209-.853 1.762-2.214 1.755-4.294-.484-.509-.555-1.147-.975-1.755-.556-.811-1.635-1.272-2.339-1.952z"></path>
                </svg>`
        },
        {
            name: 'GitHub',
            class: 'github',
            cat: 'misc',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>`
        },
        {
            name: 'Linux',
            class: 'linux',
            cat: 'misc',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-.068 3.262.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057-.237.276-.557.582-1.155.835-1.652.72-.441 1.925-.898 2.78-.13.243-.192.497-.192.74 0 .75.596 1.399 1.679 1.302 1.461-.13 2.809.905 3.681.905.77 0 1.402-.438 1.696-1.041 1.377-.339 3.077-.296 4.453.059.247.691.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475.674-.225 1.013-.879 1.013-1.488 0-.39-.139-.761-.419-.988zm-9.147-10.465c-.319 0-.583-.258-1-.568-.528-.392-1.065-.618-1.059-1.03 0-.283.379-.37.869-.681.526-.333.731-.671 1.249-.671.53 0 .69.268 1.41.579.708.307 1.201.427 1.201.773 0 .355-.741.609-1.158.868-.613.378-.928.73-1.512.73zm1.665-5.215c.882.141.981 1.691.559 2.454l-.355-.145c.184-.543.181-1.437-.435-1.494-.391-.036-.643.48-.697.922-.153-.064-.32-.11-.523-.127.062-.923.658-1.737 1.451-1.61zm-3.403.331c.676-.168 1.075.618 1.078 1.435l-.31.19c-.042-.343-.195-.897-.579-.779-.411.128-.344 1.083-.115 1.279l-.306.17c-.42-.707-.419-2.133.232-2.295zm-2.115 19.243c-1.963-.893-2.63-.69-3.005-.69-.777 0-1.031-.579-.739-1.127.248-.465.171-.952.11-1.343-.094-.599-.111-.794.478-1.052.815-.346 1.177-.791 1.447-1.124.758-.937 1.523.537 2.15 1.85.407.851 1.208 1.282 1.455 2.225.227.871-.71 1.801-1.896 1.261zm6.987-1.874c-1.384.673-3.147.982-4.466.299-.195-.563-.507-.927-.843-1.293.539-.142.939-.814.46-1.489-.511-.721-1.555-1.224-2.61-2.04-.987-.763-1.299-2.644.045-4.746-.655 1.862-.272 3.578.057 4.069.068-.988.146-2.638 1.496-4.615.681-.998.691-2.316.706-3.14l.62.424c.456.337.838.708 1.386.708.81 0 1.258-.466 1.882-.853.244-.15.613-.302.923-.513.52 2.476 2.674 5.454 2.795 7.15.501-1.032-.142-3.514-.142-3.514.842 1.285.909 2.356.946 3.67.589.241 1.221.869 1.279 1.696l-.245-.028c-.126-.919-2.607-2.269-2.83-.539-1.19.181-.757 2.066-.997 3.288-.11.559-.314 1.001-.462 1.466zm4.846-.041c-.985.38-1.65 1.187-2.107 1.688-.88.966-2.044.503-2.168-.401-.131-.966.36-1.493.572-2.574.193-.987-.023-2.506.431-2.668.295 1.753 2.066 1.016 2.47.538.657 0 .712.222.859.837.092.385.219.709.578 1.09.418.447.29 1.133-.635 1.49zm-8-13.006c-.651 0-1.138-.433-1.534-.769-.203-.171.05-.487.253-.315.387.328.777.675 1.281.675.607 0 1.142-.519 1.867-.805.247-.097.388.285.143.382-.704.277-1.269.832-2.01.832z"/>
                </svg>`
        }
    ],
    navMenu: `
        <a class="screen-reader-text" href="#landing-section">Skip to content</a>
        <nav id="site-navigation">
            <ul>
                <li>
                    <a href="#main">
                        <svg class="nav-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#projects">
                        <svg class="nav-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#contact">
                        <svg class="nav-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M.026 24l11.974-11.607 11.974 11.607h-23.948zm11.964-23.961l-11.99 8.725v12.476l7.352-7.127-5.653-4.113 10.291-7.488 10.309 7.488-5.655 4.108 7.356 7.132v-12.476l-12.01-8.725z"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>`,
    linkedinLink: `
        <a href="https://www.linkedin.com/in/connorasims/" target="_blank" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        </a>`,
    githubLink: `            
        <a href="https://github.com/casims" target="_blank" class="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/>
            </svg>
        </a>`,
    arrowSVG: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21l-12-18h24z"/>
        </svg>`,
    contentContactSection: `
        <section id="contact">
            <h2 tabindex="0">Contact</h2>
            <p>I pride myself on a clean inbox.</p>
            <a class="email-copy" href="mailto:connor@casims.ca">connor@casims.ca</a>`,
    imageModal: `
        <div id="image-modal">
            <span id="modal-close">&times;</span>
                <div id="modal-inner-wrapper">
                    <img id="modal-img"></img>
                    <p id="modal-alt"></p>
                </div>
        </div>`,
    accordHeightCollapsed: 'calc(26px + 3rem)',
    checkURL: function() {
        // Checks if URL has hash in it, if hash is from a project link then loads said project's page
        let capturedURL = window.location.href;
        if (capturedURL.includes('#')) {
            let hashPosition = capturedURL.indexOf('#')+1;
            let capturedID = capturedURL.substring(hashPosition);
            // Ignores function if hash link is from "standard" nav link instead of project link, allows nav hash links to function normally
            if (isNaN(capturedID) && this.onSite === true) {
                return;
            } else if (isNaN(capturedID) && this.onSite === false) {
                this.outputContentMain();
                this.onSite = true;
            } else if (isNaN(capturedID) && this.onSite === null) {
                // if "onSite === null" then user is starting a new session on the site, which means main page should load
                this.outputContentMain();
                this.onSite = true;
            } else {
                // Grabs Project URL from project link button, then plugs it into the API URL template to grab the project JSON data from WordPress
                this.jsonURLProject = `https://casims.ca/csport/wp-json/wp/v2/csp-project/${capturedID}?_embed`;
                scroll(0,0);
                this.outputContentProject();
                this.onSite = false;
            }
        } else {
            scroll(0,0);
            this.outputContentMain();
            this.onSite = true;
        };  
    },
    getJSON: async function(url) {
        // Grabs JSON data, can be used for both main page and project pages
        const response = await fetch(url);
        return port.jsonData = await response.json();
    },
    outputContentMain: async function() {
        // Outputs HTML for main page
        this.target.innerHTML = '';
        loading.style.display = 'block';
        await this.getJSON(this.jsonURLMain);
        this.contentHTML = this.navMenu;
        this.contentHTML += `
            <section id="landing">
                <div class="card landing">
                    <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 506">
                        <path id="Imported Path" fill="none" stroke="black" stroke-width="52" d="M 208.00,28.00 C 108.59,28.00 28.00,108.59 28.00,208.00 28.00,307.41 108.59,388.00 208.00,388.00M 208.00,118.00 C 158.29,118.00 118.00,158.29 118.00,208.00 118.00,257.71 158.29,298.00 208.00,298.00M 507.00,208.00 C 581.56,208.00 642.00,268.44 642.00,343.00 642.00,417.56 581.56,478.00 507.00,478.00M 207.50,388.00 C 207.50,388.00 507.50,388.00 507.50,388.00M 28.00,478.00 C 28.00,478.00 507.50,478.00 507.50,478.00M 207.50,28.00 C 207.50,28.00 642.00,28.00 642.00,28.00M 207.50,118.00 C 207.50,118.00 642.00,118.00 642.00,118.00M 237.50,208.00 C 237.50,208.00 507.50,208.00 507.50,208.00M 207.50,298.00 C 207.50,298.00 507.50,298.00 507.50,298.00" />
                    </svg>
                    <div class="text-container">
                        <h1 id="main-title">Connor Sims</h1>
                        <p>Front-End Web Developer with a passion for problem solving and working with JavaScript.</p>
                        <a href="mailto:connor@casims.ca" class="email-copy">connor@casims.ca</a>
                        ${this.linkedinLink}
                        ${this.githubLink}
                    </div>`;
        this.outputContentTools();
        this.contentHTML += `
                </div>
            </section>
            <section id="projects">
                <h2>Projects</h2>`;
        this.contentHTML += `<div id="projects-container">`;
        this.outputContentMainProjects();
        this.contentHTML += `
                </div>
            </section>`;
        this.contentHTML += this.contentContactSection;
        this.contentHTML += this.linkedinLink;
        this.contentHTML += this.githubLink;
        this.contentHTML += `</section>`;
        this.contentHTML += this.imageModal;
        loading.style.display = 'none';
        this.target.innerHTML = this.contentHTML;
        this.navMenuListeners();
    },
    outputContentTools: function(usedTools) {
        // Outputs tool tags for both the landing section and projects
        let usedToolsArray = [];
        if (!usedTools) {
            // usedToolsArray = [
            //     {name: 'HTML5'},
            //     {name: 'CSS3'},
            //     {name: 'SASS'},
            //     {name: 'Bootstrap'},
            //     {name: 'Tailwind'},
            //     {name: 'JavaScript'},
            //     {name: 'React'},
            //     {name: 'jQuery'},
            //     {name: 'WordPress'},
            //     {name: 'PHP'},
            //     {name: 'MySQL'},
            //     {name: 'GitHub'},
            //     {name: 'Linux'},
            // ];
            usedToolsArray = port.tools;
        } else {
            usedToolsArray = usedTools;
        };
        this.contentHTML += `<ul class="tool-tags">`;
        for (let tool of port.tools) {
            if (usedToolsArray.find(usedTool => usedTool.name === tool.name)) {
                this.contentHTML += `
                    <li class="tag ${tool.class} ${tool.cat}">
                        ${tool.name}${tool.svg}
                    </li>`;
            };
        };
        this.contentHTML += `</ul>`;
    },
    outputContentMainProjects: function() {
        // Outputs project cards for main page
        for (let project of port.jsonData) {
            this.contentHTML += `
                <article class="project-card">
                    <a href="#${project.id}" class="card-standard-link">
                        <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
                    </a>
                    <div class="card-text-container">
                        <a href="#${project.id}" class="card-standard-link">
                            <h3 tabindex="0">${project.title.rendered}</h3>
                        </a>
                        <a href="#${project.id}" class="card-standard-link">
                            <h4 tabindex="0">${project.acf.proj_sub_title}</h4>
                        </a>`;
            this.outputContentTools(project['_embedded']['wp:term'][0]);
            this.contentHTML += `
                        <p>${project.acf.proj_overview}</p>
                    </div>
                        <a href="#${project.id}" class="card-proj-link">Project Details</a>
                </article>`;
        };
    },
    navMenuListeners: function() {
        // Makes nav buttons on main page change color on hover
        let navButtons = document.getElementsByClassName('nav-button');
        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].addEventListener('mouseover', function(event) {
                event.target.children[0].style.fill = 'var(--tuskWhite)';
                event.target.style.borderColor = 'var(--tuskWhite)';
            });
            navButtons[i].addEventListener('mouseleave', function(event) {
                event.target.children[0].style.fill = '';
                event.target.style.borderColor = '';
            });
        };
    },
    toolkitListeners: function() {
        // Displays name of language on hover of language icons
        let toolOutput = document.getElementById('tool-output-text');
        let toolSVGs = document.getElementsByClassName('svg-hover');
        for (let i = 0; i < toolSVGs.length; i++) {
            toolSVGs[i].addEventListener('mouseover', function(event) {
                let toolClasses = event.target.classList;
                let capturedToolID = toolClasses[1];
                toolOutput.style.width = '13rem';
                toolOutput.innerHTML = port.toolNames[parseInt(capturedToolID)];
            });
            toolSVGs[i].addEventListener('mouseleave', function() {
                toolOutput.style.width = '6px';
                toolOutput.innerHTML = '';
            });
        };
    },
    outputContentProject: async function() {
        // Outputs HTML for individual projects
        this.target.innerHTML = '';
        loading.style.display = 'block';
        await this.getJSON(this.jsonURLProject);
        if (port.jsonData.code) {
            this.contentHTML = `
                <nav id="site-navigation">
                    <div id="nav-button-container">
                        <a id="back-button" href="">Back</a>
                    </div>
                </nav>
                <h1>404 Error</h1>
                <p>Page not found.</p>`;
            this.target.innerHTML = this.contentHTML;
        } else {
            this.contentHTML = `
                <a class="screen-reader-text" href="#project-header-section">Skip to content</a>
                <nav id="site-navigation">
                    <div id="nav-button-container">
                        <a id="back-button" href="">Back</a>
                    </div>
                </nav>
                <section id="project-header-section">
                    <h1 tabindex="0">${port.jsonData.title.rendered}</h1>
                    <img src="${port.jsonData['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${port.jsonData['_embedded']['wp:featuredmedia'][0].alt_text}">
                    <div class="proj-text-container">
                        <h2 tabindex="0">${port.jsonData.acf.proj_sub_title}</h2>
                        <p>${port.jsonData.acf.proj_overview}</p>`;
                this.outputContentTools(port.jsonData['_embedded']['wp:term'][0])
                this.contentHTML += `
                        <a href="${port.jsonData.acf.proj_live_link}" target="_blank">Live Site</a>
                        <a href="${port.jsonData.acf.proj_github_link}" target="_blank">GitHub Repo</a>
                    </div>
                </section>
                <section id="project-skills-section" class="accord">
                    <h3 tabindex="0" class="accord-button">What I Learned</h3>
                    ${this.arrowSVG}
                    <p>${port.jsonData.acf.proj_skills_list}</p>
                </section>`;
            let sections = port.jsonData.acf.proj_section_gen;
            if (Array.isArray(sections)) {
                this.contentHTML += `<section id="project-sect-section" class="accord">`;
                for (let section of sections) {
                    this.contentHTML += `
                            <h3 tabindex="0" class="accord-button">${section.proj_sect_gen_heading}</h3>
                            ${this.arrowSVG}
                            <p>${section.proj_sect_gen_text}</p>`;
                        if (section.proj_sect_gen_image) {
                            let imageID = section.proj_sect_gen_image;
                            let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                            let capturedImageObj = arrayOfImageObjs.find(o => o.id === imageID);
                            this.contentHTML += `
                            <img src="${capturedImageObj.media_details.sizes.medium_large.source_url}" alt="${capturedImageObj.alt_text}">`;
                        }
                };
                this.contentHTML += `</section>`;
            }
            this.contentHTML += `
                <section id="project-feat-section" class="accord">
                    <h3 tabindex="0" class="accord-button">Features</h3>
                    ${this.arrowSVG}
                    <p>${port.jsonData.acf.proj_features_intro}</p>`;
            let features = port.jsonData.acf.proj_features_gen;
            for (let feature of features) {
                this.contentHTML += `
                    <h4 tabindex="0">${feature.proj_feat_gen_heading}</h4>
                    <p>${feature.proj_feat_gen_text}</p>
                    ${feature.proj_feat_gen_code}`;
                if (feature.proj_feat_gen_image) {
                    let imageID = feature.proj_feat_gen_image;
                    let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                    let capturedImageObj = arrayOfImageObjs.find(o => o.id === imageID);
                    this.contentHTML += `
                        <img src="${capturedImageObj.source_url}" alt="${capturedImageObj.alt_text}">`;
                };
            };
            this.contentHTML += `
                </section>
                <section id="project-gallery">
                <ul>`;
            let galleryImages = port.jsonData.acf.proj_images;
            for (let galleryImage of galleryImages) {
                let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                let capturedImageObj = arrayOfImageObjs.find(o => o.id === galleryImage);
                this.contentHTML += `
                    <li>
                        <img class="modable" src="${capturedImageObj.media_details.sizes.full.source_url}" alt="${capturedImageObj.alt_text}">
                    </li>`;
            };
            this.contentHTML += `
                </ul>
                </section>`;
            this.contentHTML += this.contentContactSection;
            this.contentHTML += this.linkedinLink;
            this.contentHTML += this.githubLink;
            this.contentHTML += `</section>`;
            this.contentHTML += this.imageModal;
            loading.style.display = 'none';
            this.target.innerHTML = this.contentHTML;
            this.accordListeners();
            this.modalListeners();
        };
    },
    accordExpand: function(accord) {
        let accordHeight = accord.scrollHeight;
        accord.style.height = accordHeight + 'px';
        accord.setAttribute('expanded', 'true');
    },
    accordCollapse: function(accord) {
        accord.style.height = this.accordHeightCollapsed;
        accord.setAttribute('expanded', 'false');
    },
    accordListeners: function() {
        // Functionality for accordians on individual project page, also expands first accordian on page load
        let accordSections = document.getElementsByClassName('accord');
        let accordButtons = document.getElementsByClassName('accord-button');
        port.accordExpand(accordSections[0]);
        for (let i = 0; i < accordButtons.length; i++) {
            accordButtons[i].addEventListener('click', function(event) {
                let accordTarget = event.target.parentElement;
                let isAccordExpanded = accordTarget.getAttribute('expanded') === 'true';
                if (!isAccordExpanded) {
                    for (let accordSection of accordSections) {
                        port.accordCollapse(accordSection);
                    };
                    port.accordExpand(accordTarget);
                } else {
                    port.accordCollapse(accordTarget);
                };
            });
        };
    },
    modalListeners: function() {
        // Functionality for image modals
        let modal = document.getElementById('image-modal');
        let modalWrapper = document.getElementById('modal-inner-wrapper');
        let modalPartImage = document.getElementById('modal-img');
        let modalPartCaption = document.getElementById('modal-alt');
        let modableImages = document.getElementsByClassName('modable');
        for (let i = 0; i < modableImages.length; i++) {
            modableImages[i].addEventListener('click', function(event) {
                modal.style.display = 'block';
                modalPartImage.src = event.target.src;
                modalPartCaption.innerHTML = event.target.alt;
                setTimeout(function() {
                    modal.style.opacity = '100%';
                }, 10);
            });
        };
        modal.addEventListener('click', function() {
            modal.style.opacity = '0%';
            setTimeout(function() {
                modal.style.display = 'none';
            }, 300);
        });
        modalWrapper.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    },
};

// "Checks URL" for hash links whenever page loads or URL changes
window.onload = function() {
    port.checkURL();
};

window.onhashchange = function() {
    port.checkURL();
};