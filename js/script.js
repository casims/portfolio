const port = {
    target: document.querySelector('main#main'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    contentHeader: `
    <h1 id="main-title">Connor Sims</h1>
    <p>Entry-level Front-End Engineer with a passion for JavaScript and problem solving.</p>
    `,
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
        this.target.innerHTML = this.contentHeader;
        this.outputContentProjects();
    },
    outputContentProjects: function() {
        for (let project of port.jsonData) {
            this.target.innerHTML += `
            <article class="project-card">
                <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
                <h3>${project.title.rendered}</h3>
            </article>
        `
        }
    }
};