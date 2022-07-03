const port = {
    target: document.querySelector('main#main'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    contentHTML: '',
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
        this.outputContentProjects();
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
    outputContentProjects: function() {
        for (let project of port.jsonData) {
            this.contentHTML += `
                <article class="project-card">
                    <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
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
    }
};