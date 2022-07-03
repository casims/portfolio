const port = {
    target: document.querySelector('main#main'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    jsonURLProject: null,
    contentHTML: '',
    checkURL: function() {
        let capturedURL = window.location.href;
        if (capturedURL.includes('#')) {
            let hashPosition = capturedURL.indexOf('#')+1;
            let capturedID = capturedURL.substring(hashPosition);
            this.jsonURLProject = `https://casims.ca/csport/wp-json/wp/v2/csp-project/${capturedID}?_embed`;
            this.outputContentProject();
        } else {
            this.outputContentMain();
        };  
    },
    // getJSON: function(url) {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             port.jsonData = data;
    //         })
    // },
    getJSON: async function(url) {
        const response = await fetch(url);
        return port.jsonData = await response.json();
    },

    outputContentMain: async function() {
        await this.getJSON(this.jsonURLMain);
        console.log(port.jsonData);
        this.contentHTML += `
            <section id="landing-section">
                <h1 id="main-title">Connor Sims</h1>
                <p>Entry-level Front-End Engineer with a passion for JavaScript and problem solving.</p>
                <p id="email-copy">contact@casims.ca</p>
                <a href="">LinkedIn</a>
                <a href="">GitHub</a>
            </section>
            <section id="projects-section">
                <h2>Projects</h2>`;
        this.outputContentMainProjects();
        this.contentHTML += `
            </section>
            <section id="contact-section">
                <h2>Contact</h2>
                <p>Get in touch!</p>
                <p id="email-copy">contact@casims.ca</p>
                <a href="">LinkedIn</a>
                <a href="">GitHub</a>
            </section>`;
        this.target.innerHTML = this.contentHTML;
    },
    outputContentMainProjects: function() {
        for (let project of port.jsonData) {
            this.contentHTML += `
                <article class="project-card">
                    <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
                    <h3>${project.title.rendered}</h3>
                    <h4>${project.acf.proj_sub_title}</h4>
                    <ul>`;
            let terms = project['_embedded']['wp:term'][0];
            for (let term of terms) {
            this.contentHTML += `<li>${term.name}</li>`;
            };
            this.contentHTML += `
                    </ul>
                    <p>${project.acf.proj_duration}</p>
                    <p>${project.acf.proj_overview}</p>
                    <a href="#${project.id}">Project Details</a>
                </article>
            `;
        }
    },

    outputContentProject: async function() {
        this.target.innerHTML = '';
        await this.getJSON(this.jsonURLProject);
        console.log(port.jsonData);
        if (port.jsonData.code) {
            this.contentHTML = `
                <h1>404 Error</h1>
                <p>Page not found.</p>`;
            this.target.innerHTML = this.contentHTML;
        } else {
            this.contentHTML = `
                <h1>${port.jsonData.title.rendered}</h1>
                <img src="${port.jsonData['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${port.jsonData['_embedded']['wp:featuredmedia'][0].alt_text}">
                <h2>${port.jsonData.acf.proj_sub_title}</h2>
                <ul>`;
            let terms = port.jsonData['_embedded']['wp:term'][0];
            for (let term of terms) {
                this.contentHTML += `<li>${term.name}</li>`;
            };
            this.contentHTML += `
                </ul>
                <p>${port.jsonData.acf.proj_duration}</p>

            `;
        };
    },
};

window.onload = function() {
    port.checkURL();
};

window.onhashchange = function() {
    port.checkURL();
}

// checkForURLChange: function() {
//     window.addEventListener('locationchange', this.checkURL());
// },