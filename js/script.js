const port = {
    target: document.querySelector('main#main'),
    loading: document.getElementById('loading'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    jsonURLProject: null,
    onSite: null,
    contentHTML: '',
    navMenu: `
        <a class="screen-reader-text" href="#landing-section">Skip to content</a>
        <nav id="site-navigation">
            <ul>
                <li>
                    <a href="#main">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#projects">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#contact">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
    toolNames: ['HTML5', 'CSS3', 'JavaScript', 'React', 'jQuery', 'SASS', 'PHP', 'MySQL'],
    checkURL: function() {
        let capturedURL = window.location.href;
        if (capturedURL.includes('#')) {
            let hashPosition = capturedURL.indexOf('#')+1;
            let capturedID = capturedURL.substring(hashPosition);
            if (isNaN(capturedID) && this.onSite === true) {
                return;
            } else if (isNaN(capturedID) && this.onSite === false) {
                this.outputContentMain();
                this.onSite = true;
            } else if (isNaN(capturedID) && this.onSite === null) {
                this.outputContentMain();
                this.onSite = true;
            } else {
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
        const response = await fetch(url);
        return port.jsonData = await response.json();
    },
    outputContentMain: async function() {
        this.target.innerHTML = '';
        loading.style.display = 'block';
        await this.getJSON(this.jsonURLMain);
        console.log(port.jsonData);
        this.contentHTML = this.navMenu;
        this.contentHTML += `
            <section id="landing-section">
                <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 506">
                    <path id="Imported Path" fill="none" stroke="black" stroke-width="52" d="M 208.00,28.00 C 108.59,28.00 28.00,108.59 28.00,208.00 28.00,307.41 108.59,388.00 208.00,388.00M 208.00,118.00 C 158.29,118.00 118.00,158.29 118.00,208.00 118.00,257.71 158.29,298.00 208.00,298.00M 507.00,208.00 C 581.56,208.00 642.00,268.44 642.00,343.00 642.00,417.56 581.56,478.00 507.00,478.00M 207.50,388.00 C 207.50,388.00 507.50,388.00 507.50,388.00M 28.00,478.00 C 28.00,478.00 507.50,478.00 507.50,478.00M 207.50,28.00 C 207.50,28.00 642.00,28.00 642.00,28.00M 207.50,118.00 C 207.50,118.00 642.00,118.00 642.00,118.00M 237.50,208.00 C 237.50,208.00 507.50,208.00 507.50,208.00M 207.50,298.00 C 207.50,298.00 507.50,298.00 507.50,298.00" />
                </svg>
                <div id="text-container">
                    <h1 id="main-title"><span>Connor</span>Sims</h1>
                    <p>Entry-level Front-End Engineer with a passion for working with JavaScript and problem solving.</p>
                    <a href="mailto:connor@casims.ca" class="email-copy">connor@casims.ca</a>
                    ${this.linkedinLink}
                    ${this.githubLink}
                </div>
            </section>
            <section id="toolkit-section">
                <div class="svg-hover 0">
                    <svg id="html5-icon" viewBox="0 0 128 128">
                        <path d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387L118.968 2H9.032zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471-3.233 36.119-.238 2.27L64 102.609v.002l-.034.018-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939l-.33 3.539z"></path>
                    </svg>
                </div>
                <div class="svg-hover 1">
                    <svg id="css3-icon" viewBox="0 0 128 128">
                        <path d="M8.76 1l10.055 112.883 45.118 12.58 45.244-12.626L119.24 1H8.76zm89.591 25.862l-3.347 37.605.01.203-.014.467v-.004l-2.378 26.294-.262 2.336L64 101.607v.001l-.022.019-28.311-7.888L33.75 72h13.883l.985 11.054 15.386 4.17-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041-.63-7.131L29.401 23h69.281l-.331 3.862z"></path>
                    </svg>
                </div>
                <div class="svg-hover 2">
                    <svg id="javascript-icon" viewBox="0 0 128 128">
                        <path d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"></path>
                    </svg>
                </div>
                <div class="svg-hover 3">
                    <svg id="react-icon" viewBox="0 0 128 128">
                        <g><circle cx="64" cy="64" r="11.4"></circle><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path></g>
                    </svg>
                </div>
                <div class="svg-hover 4">
                    <svg id="jquery-icon" viewBox="0 0 128 128">
                        <path d="M65.283 106.928c-.828-.187-1.633-.446-2.441-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a71.149 71.149 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.238-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a57.368 57.368 0 01-1.751-.982l-.591-.33a79.8 79.8 0 01-2.28-1.397l-.615-.41a57.785 57.785 0 01-1.623-1.079l-.523-.367a93.376 93.376 0 01-1.534-1.109l-.679-.514a67.061 67.061 0 01-1.384-1.082l-.617-.495a85.378 85.378 0 01-1.724-1.453l-.188-.159a81.186 81.186 0 01-1.812-1.647l-.51-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a72.65 72.65 0 01-1.599-1.69l-.078-.084a65.735 65.735 0 01-1.621-1.844l-.424-.504a67.378 67.378 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794C12.89 62.89 8.524 40.032 18.236 21.26L9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.411.801.617 1.198l.395.759.245.437.439.786c.262.461.53.92.805 1.379l.458.756c.304.491.615.976.934 1.46l.398.614c.438.655.888 1.309 1.352 1.951l.039.05.228.308c.4.553.814 1.099 1.232 1.639l.463.59c.373.469.752.935 1.139 1.399l.435.52a75.27 75.27 0 001.586 1.812l.032.033.062.068a77.952 77.952 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.526.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.526.456 1.062.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.495.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.749.474 1.51.943 2.278 1.396l.63.355a74.53 74.53 0 001.711.959c.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.786.275 1.581.53 2.381.779l.575.172c.814.245 1.618.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.014 16.954-36.112 21.426-57.997 16.447zM46.069 63.697c1.195 1.713 2.52 3.751 4.105 5.127a48.111 48.111 0 001.79 1.858l.472.465a52.581 52.581 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.484.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.679.448 1.02.672l.482.319c.544.349 1.096.689 1.656 1.015l.234.136c.483.278.973.552 1.463.818l.521.271c.339.177.678.358 1.024.53l.155.07c.702.346 1.411.68 2.136.995l.472.194a50.02 50.02 0 001.75.71l.75.275c.533.198 1.068.378 1.608.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.69-24.886 50.69-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.7-.227a46.162 46.162 0 01-1.632-.562l-.736-.274a57.432 57.432 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.364-.177-.721-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.802 47.802 0 01-1.65-1.008l-.498-.332a65.856 65.856 0 01-1.069-.707 58.235 58.235 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.897-14.486-16.819-23.971-3.062-9.836-2.401-20.878 2.903-29.84l-6.517 9.2c-7.977 11.478-7.543 26.844-1.321 38.983a50.37 50.37 0 003.528 5.892zm43.407-14.199c.339.125.678.237 1.022.354l.451.143c.484.152.966.329 1.467.424 22.739 4.394 28.908-11.669 30.549-14.034-5.403 7.779-14.482 9.646-25.623 6.942-.88-.213-1.848-.531-2.696-.832a33.242 33.242 0 01-3.201-1.329 33.175 33.175 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745l-3.52 4.851c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.112 10.492 14.475 18.721 17.494z"></path>
                    </svg>
                </div>
                <div class="svg-hover 5">
                    <svg id="sass-icon" viewBox="0 0 128 128">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.219 56.156c0 .703.207 1.167.323 1.618.756 2.933 2.381 5.45 4.309 7.746 2.746 3.272 6.109 5.906 9.554 8.383 2.988 2.148 6.037 4.248 9.037 6.38.515.366 1.002.787 1.561 1.236-.481.26-.881.489-1.297.7-3.959 2.008-7.768 4.259-11.279 6.986-2.116 1.644-4.162 3.391-5.607 5.674-2.325 3.672-3.148 7.584-1.415 11.761.506 1.22 1.278 2.274 2.367 3.053.353.252.749.502 1.162.6 1.058.249 2.136.412 3.207.609l3.033-.002c3.354-.299 6.407-1.448 9.166-3.352 4.312-2.976 7.217-6.966 8.466-12.087.908-3.722.945-7.448-.125-11.153a11.696 11.696 0 00-.354-1.014c-.13-.333-.283-.657-.463-1.072l6.876-3.954.103.088c-.125.409-.258.817-.371 1.23-.817 2.984-1.36 6.02-1.165 9.117.208 3.3 1.129 6.389 3.061 9.146 1.562 2.23 5.284 2.313 6.944.075.589-.795 1.16-1.626 1.589-2.513 1.121-2.315 2.159-4.671 3.23-7.011l.187-.428c-.077 1.108-.167 2.081-.208 3.055-.064 1.521.025 3.033.545 4.48.445 1.238 1.202 2.163 2.62 2.326.97.111 1.743-.333 2.456-.896a10.384 10.384 0 002.691-3.199c1.901-3.491 3.853-6.961 5.576-10.54 1.864-3.871 3.494-7.855 5.225-11.792l.286-.698c.409 1.607.694 3.181 1.219 4.671.61 1.729 1.365 3.417 2.187 5.058.389.775.344 1.278-.195 1.928-2.256 2.72-4.473 5.473-6.692 8.223-.491.607-.98 1.225-1.389 1.888a3.701 3.701 0 00-.48 1.364 1.737 1.737 0 001.383 1.971 9.661 9.661 0 002.708.193c3.097-.228 5.909-1.315 8.395-3.157 3.221-2.386 4.255-5.642 3.475-9.501-.211-1.047-.584-2.065-.947-3.074-.163-.455-.174-.774.123-1.198 2.575-3.677 4.775-7.578 6.821-11.569.081-.157.164-.314.306-.482.663 3.45 1.661 6.775 3.449 9.792-.912.879-1.815 1.676-2.632 2.554-1.799 1.934-3.359 4.034-4.173 6.595-.35 1.104-.619 2.226-.463 3.405.242 1.831 1.742 3.021 3.543 2.604 3.854-.892 7.181-2.708 9.612-5.925 1.636-2.166 1.785-4.582 1.1-7.113-.188-.688-.411-1.365-.651-2.154.951-.295 1.878-.649 2.837-.868 4.979-1.136 9.904-.938 14.702.86 2.801 1.05 5.064 2.807 6.406 5.571 1.639 3.379.733 6.585-2.452 8.721-.297.199-.637.356-.883.605a.869.869 0 00-.205.67c.021.123.346.277.533.275 1.047-.008 1.896-.557 2.711-1.121 2.042-1.413 3.532-3.314 3.853-5.817l.063-.188-.077-1.63c-.031-.094.023-.187.016-.258-.434-3.645-2.381-6.472-5.213-8.688-3.28-2.565-7.153-3.621-11.249-3.788a25.401 25.401 0 00-9.765 1.503c-.897.325-1.786.71-2.688 1.073-.121-.219-.251-.429-.358-.646-.926-1.896-2.048-3.708-2.296-5.882-.176-1.544-.392-3.086-.025-4.613.353-1.469.813-2.913 1.246-4.362.223-.746.066-1.164-.646-1.5a2.854 2.854 0 00-.786-.258c-1.75-.254-3.476-.109-5.171.384-.6.175-1.036.511-1.169 1.175-.076.381-.231.746-.339 1.122-.443 1.563-.757 3.156-1.473 4.645-1.794 3.735-3.842 7.329-5.938 10.897-.227.385-.466.763-.752 1.23-.736-1.54-1.521-2.922-1.759-4.542-.269-1.832-.481-3.661-.025-5.479.339-1.356.782-2.687 1.19-4.025.193-.636.104-.97-.472-1.305-.291-.169-.62-.319-.948-.368a11.643 11.643 0 00-5.354.438c-.543.176-.828.527-.994 1.087-.488 1.652-.904 3.344-1.589 4.915-2.774 6.36-5.628 12.687-8.479 19.013-.595 1.321-1.292 2.596-1.963 3.882-.17.326-.418.613-.63.919-.17-.201-.236-.339-.235-.477.005-.813-.092-1.65.063-2.436a172.189 172.189 0 011.578-7.099c.47-1.946 1.017-3.874 1.538-5.807.175-.647.178-1.252-.287-1.796-.781-.911-2.413-1.111-3.381-.409l-.428.242.083-.69c.204-1.479.245-2.953-.161-4.41-.506-1.816-1.802-2.861-3.686-2.803-.878.027-1.8.177-2.613.497-3.419 1.34-6.048 3.713-8.286 6.568a2.592 2.592 0 01-.757.654c-2.893 1.604-5.795 3.188-8.696 4.778l-3.229 1.769c-.866-.826-1.653-1.683-2.546-2.41-2.727-2.224-5.498-4.393-8.244-6.592-2.434-1.949-4.792-3.979-6.596-6.56-1.342-1.92-2.207-4.021-2.29-6.395-.105-3.025.753-5.789 2.293-8.362 1.97-3.292 4.657-5.934 7.611-8.327 3.125-2.53 6.505-4.678 10.008-6.639 4.901-2.743 9.942-5.171 15.347-6.774 5.542-1.644 11.165-2.585 16.965-1.929 2.28.258 4.494.78 6.527 1.895 1.557.853 2.834 1.97 3.428 3.716.586 1.718.568 3.459.162 5.204-.825 3.534-2.76 6.447-5.195 9.05-3.994 4.267-8.866 7.172-14.351 9.091a39.478 39.478 0 01-9.765 2.083c-2.729.229-5.401-.013-7.985-.962-1.711-.629-3.201-1.591-4.399-2.987-.214-.25-.488-.521-.887-.287-.391.23-.46.602-.329.979.219.626.421 1.278.762 1.838.857 1.405 2.107 2.424 3.483 3.298 2.643 1.681 5.597 2.246 8.66 2.377 4.648.201 9.183-.493 13.654-1.74 6.383-1.78 11.933-4.924 16.384-9.884 3.706-4.13 6.353-8.791 6.92-14.419.277-2.747-.018-5.438-1.304-7.944-1.395-2.715-3.613-4.734-6.265-6.125C68.756 18.179 64.588 17 60.286 17h-4.31c-5.21 0-10.247 1.493-15.143 3.274-3.706 1.349-7.34 2.941-10.868 4.703-7.683 3.839-14.838 8.468-20.715 14.833-2.928 3.171-5.407 6.67-6.833 10.79a40.494 40.494 0 00-1.111 3.746m27.839 36.013c-.333 4.459-2.354 8.074-5.657 11.002-1.858 1.646-3.989 2.818-6.471 3.23-.9.149-1.821.185-2.694-.188-1.245-.532-1.524-1.637-1.548-2.814-.037-1.876.62-3.572 1.521-5.186 1.176-2.104 2.9-3.708 4.741-5.206 2.9-2.361 6.046-4.359 9.268-6.245l.243-.1c.498 1.84.735 3.657.597 5.507zM54.303 70.98c-.235 1.424-.529 2.849-.945 4.229-1.438 4.777-3.285 9.406-5.282 13.973-.369.845-.906 1.616-1.373 2.417a1.689 1.689 0 01-.283.334c-.578.571-1.126.541-1.418-.206-.34-.868-.549-1.797-.729-2.716-.121-.617-.092-1.265-.13-1.897.039-4.494 1.41-8.578 3.736-12.38.959-1.568 2.003-3.062 3.598-4.054a6.27 6.27 0 011.595-.706c.85-.239 1.372.154 1.231 1.006zm17.164 21.868l6.169-7.203c.257 2.675-4.29 8.015-6.169 7.203zm19.703-4.847c-.436.25-.911.43-1.358.661-.409.212-.544-.002-.556-.354a2.385 2.385 0 01.093-.721c.833-2.938 2.366-5.446 4.647-7.486l.16-.082c1.085 3.035-.169 6.368-2.986 7.982z"></path>
                    </svg>
                </div>
                <div class="svg-hover 6">
                    <svg id="php-icon" viewBox="0 0 128 128">
                        <path d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039zM48.103 70.032c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34H41.7c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515a15.118 15.118 0 01-2.972 3.748zM69.414 73l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-33h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528L76.772 73h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.722-1.458 1.364-3.078 1.927-4.86 2.507-1.782.581-4.053.461-6.812.461h-6.253l-1.732 10h-7.301l6.514-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.39zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421.484-2.491.264-4.434-.66-5.458-.925-1.024-2.774-1.721-5.548-1.721zm-56.985 0h-5.002l-2.727 14h4.441c2.943 0 5.136-.29 6.577-1.4 1.441-1.108 2.413-2.828 2.917-5.421.484-2.491.264-4.434-.66-5.458S41.708 54 38.934 54z"></path>
                    </svg>
                </div>
                <div class="svg-hover 7">
                    <svg id="mysql-icon" viewBox="0 0 128 128">
                        <path d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.577 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.449-4.717-4.854-9.868-7.024-14.831-1.48-3.384-2.447-6.72-4.293-9.756-8.86-14.567-18.396-23.358-33.169-32-3.144-1.838-6.929-2.563-10.929-3.513-2.145-.129-4.292-.26-6.438-.391-1.311-.546-2.673-2.149-3.902-2.927C17.811 4.565 5.257-2.16 1.633 6.682c-2.289 5.581 3.421 11.025 5.462 13.854 1.434 1.982 3.269 4.207 4.293 6.438.674 1.467.79 2.938 1.367 4.489 1.417 3.822 2.652 7.98 4.487 11.511.927 1.788 1.949 3.67 3.122 5.268.718.981 1.951 1.413 2.145 2.927-1.204 1.686-1.273 4.304-1.95 6.44-3.05 9.615-1.899 21.567 2.537 28.683 1.36 2.186 4.567 6.871 8.975 5.073 3.856-1.57 2.995-6.438 4.098-10.732.249-.973.096-1.689.585-2.341v.195l3.513 7.024c2.6 4.187 7.212 8.562 11.122 11.514 2.027 1.531 3.623 4.177 6.244 5.073v-.196h-.195c-.508-.791-1.303-1.119-1.951-1.755-1.527-1.497-3.225-3.358-4.487-5.073-3.556-4.827-6.698-10.11-9.561-15.609-1.368-2.627-2.557-5.523-3.709-8.196-.444-1.03-.438-2.589-1.364-3.122-1.263 1.958-3.122 3.542-4.098 5.854-1.561 3.696-1.762 8.204-2.341 12.878-.342.122-.19.038-.391.194-2.718-.655-3.672-3.452-4.683-5.853-2.554-6.07-3.029-15.842-.781-22.829.582-1.809 3.21-7.501 2.146-9.172-.508-1.666-2.184-2.63-3.121-3.903-1.161-1.574-2.319-3.646-3.124-5.464-2.09-4.731-3.066-10.044-5.267-14.828-1.053-2.287-2.832-4.602-4.293-6.634-1.617-2.253-3.429-3.912-4.683-6.635-.446-.968-1.051-2.518-.391-3.513.21-.671.508-.951 1.171-1.17 1.132-.873 4.284.29 5.462.779 3.129 1.3 5.741 2.538 8.392 4.294 1.271.844 2.559 2.475 4.097 2.927h1.756c2.747.631 5.824.195 8.391.975 4.536 1.378 8.601 3.523 12.292 5.854 11.246 7.102 20.442 17.21 26.732 29.269 1.012 1.942 1.45 3.794 2.341 5.854 1.798 4.153 4.063 8.426 5.852 12.488 1.786 4.052 3.526 8.141 6.05 11.513 1.327 1.772 6.451 2.723 8.781 3.708 1.632.689 4.307 1.409 5.854 2.34 2.953 1.782 5.815 3.903 8.586 5.855 1.383.975 5.64 3.116 5.852 4.879zM29.729 23.466c-1.431-.027-2.443.156-3.513.389v.195h.195c.683 1.402 1.888 2.306 2.731 3.513.65 1.367 1.301 2.732 1.952 4.097l.194-.193c1.209-.853 1.762-2.214 1.755-4.294-.484-.509-.555-1.147-.975-1.755-.556-.811-1.635-1.272-2.339-1.952z"></path>
                    </svg>
                </div>
                <div id="tool-output-container">
                    <p id="tool-output-text"></p>
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
        this.toolkitListeners();
    },
    outputContentMainProjects: function() {
        for (let project of port.jsonData) {
            this.contentHTML += `
                <article class="project-card">
                    <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
                    <div class="card-text-container">
                        <h3 tabindex="0">${project.title.rendered}</h3>
                        <h4 tabindex="0">${project.acf.proj_sub_title}</h4>
                        <ul>`;
                let terms = project['_embedded']['wp:term'][0];
                for (let term of terms) {
                this.contentHTML += `<li>${term.name}</li>`;
                };
                this.contentHTML += `
                        </ul>
                        <p class="proj-duration">Project Duration: ${project.acf.proj_duration}</p>
                        <p>${project.acf.proj_overview}</p>
                    </div>
                        <a href="#${project.id}" class="card-proj-link">Project Details</a>
                </article>
            `;
        }
    },
    toolkitListeners: function() {
        let toolOutput = document.getElementById('tool-output-text');
        document.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('svg-hover')) {
                let toolClasses = event.target.classList;
                let capturedToolID = toolClasses[1];
                toolOutput.style.width = '13rem';
                toolOutput.innerHTML = this.toolNames[parseInt(capturedToolID)];
            } else {
                toolOutput.style.width = '6px';
                toolOutput.innerHTML = '';
            };
        });
    },
    outputContentProject: async function() {
        this.target.innerHTML = '';
        loading.style.display = 'block';
        await this.getJSON(this.jsonURLProject);
        console.log(port.jsonData);
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
                        <ul>`;
                let terms = port.jsonData['_embedded']['wp:term'][0];
                for (let term of terms) {
                    this.contentHTML += `<li>${term.name}</li>`;
                };
                this.contentHTML += `
                        </ul>
                        <p class="proj-duration">Project Duration: ${port.jsonData.acf.proj_duration}</p>
                        <p>${port.jsonData.acf.proj_overview}</p>
                        <a href="${port.jsonData.acf.proj_live_link}" target="_blank">Live Site</a>
                        <a href="${port.jsonData.acf.proj_github_link}" target="_blank">GitHub Repo</a>
                    </div>
                </section>`;
            let sections = port.jsonData.acf.proj_section_gen;
            console.log(sections);
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
                    console.log(arrayOfImageObjs);
                    let capturedImageObj = arrayOfImageObjs.find(o => o.id === imageID);
                    console.log(capturedImageObj);
                    this.contentHTML += `
                        <img src="${capturedImageObj.source_url}" alt="${capturedImageObj.alt_text}">`;
                };
            };
            this.contentHTML += `
                </section>
                <section id="project-skills-section" class="accord">
                    <h3 tabindex="0" class="accord-button">Takeaways</h3>
                    ${this.arrowSVG}
                    <ul>`;
            let skills = port.jsonData.acf.proj_skills_list;
            for (let skill of skills) {
                this.contentHTML += `<li>${skill.proj_skill_item}</li>`;
            };
            this.contentHTML += `
                    </ul>
                </section>
                <section id="project-gallery">
                <ul>`;
            let galleryImages = port.jsonData.acf.proj_images;
            for (let galleryImage of galleryImages) {
                let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                let capturedImageObj = arrayOfImageObjs.find(o => o.id === galleryImage);
                this.contentHTML += `
                    <li>
                        <img class="modable" src="${capturedImageObj.media_details.sizes.medium_large.source_url}" alt="${capturedImageObj.alt_text}">
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
    accordListeners: function() {
        let accordSections = document.getElementsByClassName('accord');
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('accord-button')) {
                if (event.target.parentElement.classList.contains('expanded')) {
                    for (let accordSection of accordSections) {
                        accordSection.classList.remove('expanded');
                    };
                } else {
                    for (let accordSection of accordSections) {
                        accordSection.classList.remove('expanded');
                    };
                    event.target.parentElement.classList.add('expanded');
                };
            };
        });
    },
    modalListeners: function() {
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

window.onload = function() {
    port.checkURL();
};

window.onhashchange = function() {
    port.checkURL();
};