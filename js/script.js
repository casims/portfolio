const port = {
    target: document.querySelector('main#main'),
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project?_embed',
    jsonURLProject: null,
    contentHTML: '',
    contentContactSection: `
        <section id="contact-section">
            <h2>Contact</h2>
            <p>Get in touch!</p>
            <p id="email-copy">connor@casims.ca</p>
            <a href="">LinkedIn</a>
            <a href="">GitHub</a>
        </section>`,
    checkURL: function() {
        let capturedURL = window.location.href;
        scroll(0,0);
        if (capturedURL.includes('#')) {
            let hashPosition = capturedURL.indexOf('#')+1;
            let capturedID = capturedURL.substring(hashPosition);
            this.jsonURLProject = `https://casims.ca/csport/wp-json/wp/v2/csp-project/${capturedID}?_embed`;
            this.outputContentProject();
        } else {
            this.outputContentMain();
        };  
    },
    getJSON: async function(url) {
        const response = await fetch(url);
        return port.jsonData = await response.json();
    },

    outputContentMain: async function() {
        this.target.innerHTML = '';
        await this.getJSON(this.jsonURLMain);
        console.log(port.jsonData);
        this.contentHTML = `
            <section id="landing-section">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 506">
                    <path id="Imported Path" fill="none" stroke="black" stroke-width="52" d="M 208.00,28.00 C 108.59,28.00 28.00,108.59 28.00,208.00 28.00,307.41 108.59,388.00 208.00,388.00M 208.00,118.00 C 158.29,118.00 118.00,158.29 118.00,208.00 118.00,257.71 158.29,298.00 208.00,298.00M 507.00,208.00 C 581.56,208.00 642.00,268.44 642.00,343.00 642.00,417.56 581.56,478.00 507.00,478.00M 207.50,388.00 C 207.50,388.00 507.50,388.00 507.50,388.00M 28.00,478.00 C 28.00,478.00 507.50,478.00 507.50,478.00M 207.50,28.00 C 207.50,28.00 642.00,28.00 642.00,28.00M 207.50,118.00 C 207.50,118.00 642.00,118.00 642.00,118.00M 237.50,208.00 C 237.50,208.00 507.50,208.00 507.50,208.00M 207.50,298.00 C 207.50,298.00 507.50,298.00 507.50,298.00" />
                </svg>
                <h1 id="main-title"><span>Connor</span>Sims</h1>
                <p>Entry-level Front-End Engineer with a passion for JavaScript and problem solving.</p>
                <p id="email-copy">contact@casims.ca</p>
                <a href="">LinkedIn</a>
                <a href="">GitHub</a>
            </section>
            <section id="projects-section">
                <h2>Projects</h2>`;
        this.outputContentMainProjects();
        this.contentHTML += `</section>`;
        this.contentHTML += this.contentContactSection;
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
                <section id="project-header-section">
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
                    <p>${port.jsonData.acf.proj_overview}</p>
                    <a href="${port.jsonData.acf.proj_live_link}">Live Site</a>
                    <a href="${port.jsonData.acf.proj_github_link}">GitHub Repo</a>
                </section>
                <section id="project-sect-section">`;
            let sections = port.jsonData.acf.proj_section_gen;
            for (let section of sections) {
                this.contentHTML += `
                        <h3>${section.proj_sect_gen_heading}</h3>
                        <p>${section.proj_sect_gen_text}</p>`;
                    if (section.proj_sect_gen_image) {
                        let imageID = section.proj_sect_gen_image;
                        let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                        let capturedImageObj = arrayOfImageObjs.find(o => o.id === imageID);
                        this.contentHTML += `
                        <img src="${capturedImageObj.media_details.sizes.medium_large.source_url}" alt="${capturedImageObj.alt_text}">`;
                    }
            };
            this.contentHTML += `
                </section>
                <section id="project-feat-section">
                    <h3>Features</h3>
                    <p>${port.jsonData.acf.proj_features_intro}</p>`;
            let features = port.jsonData.acf.proj_features_gen;
            for (let feature of features) {
                this.contentHTML += `
                    <h4>${feature.proj_feat_gen_heading}</h4>
                    <p>${feature.proj_feat_gen_text}</p>
                    <code>${feature.proj_feat_gen_code}}</code>`;
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
                <section id="project-skills-section">
                    <h3>Gained Skills</h3>
                    <ul>`;
            let skills = port.jsonData.acf.proj_skills_list;
            for (let skill of skills) {
                this.contentHTML += `<li>${skill.proj_skill_item}</li>`;
            };
            this.contentHTML += `
                    </ul>
                </section>
                <div id="project-gallery">`;
            let galleryImages = port.jsonData.acf.proj_images;
            for (let galleryImage of galleryImages) {
                let arrayOfImageObjs = port.jsonData['_embedded']['acf:attachment'];
                let capturedImageObj = arrayOfImageObjs.find(o => o.id === galleryImage);
                this.contentHTML += `
                    <img src="${capturedImageObj.media_details.sizes.medium_large.source_url}" alt="${capturedImageObj.alt_text}">`;
            };
            this.contentHTML += `</div>`;
            this.contentHTML += this.contentContactSection;
            this.contentHTML += `<a href="">Back</a>`;
            this.target.innerHTML = this.contentHTML;
        };
    },
};

window.onload = function() {
    port.checkURL();
};

window.onhashchange = function() {
    port.checkURL();
};