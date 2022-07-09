const port = {
    target: document.querySelector('main#main'),
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
        <a href="https://www.linkedin.com/in/connorasims/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        </a>`,
    githubLink: `            
        <a href="https://github.com/casims" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/>
            </svg>
        </a>`,
    contentContactSection: `
        <section id="contact">
            <h2 tabindex="0">Contact</h2>
            <p>I pride myself on a clean inbox.</p>
            <a class="email-copy" href="mailto:connor@casims.ca">connor@casims.ca</a>`,
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
            <section id="projects">
                <h2>Projects</h2>`;
            console.log(this.contentHTML);
        this.contentHTML += `<div id="projects-container">`;
        this.outputContentMainProjects();
        this.contentHTML += `
                    </div>
                    </section>`;
        this.contentHTML += this.contentContactSection;
        this.contentHTML += this.linkedinLink;
        this.contentHTML += this.githubLink;
        this.contentHTML += `</section>`;
        this.target.innerHTML = this.contentHTML;
    },
    outputContentMainProjects: function() {
        for (let project of port.jsonData) {
            this.contentHTML += `
                <article class="project-card">
                    <img src="${project['_embedded']['wp:featuredmedia'][0].media_details.sizes.large.source_url}" alt="${project['_embedded']['wp:featuredmedia'][0].alt_text}">
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
                    <div class="link-container">
                        <a href="#${project.id}">Project Details</a>
                    </div>
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
                </section>`;
            let sections = port.jsonData.acf.proj_section_gen;
            console.log(sections);
            if (Array.isArray(sections)) {
                this.contentHTML += `<section id="project-sect-section">`;
                for (let section of sections) {
                    this.contentHTML += `
                            <h3 tabindex="0">${section.proj_sect_gen_heading}</h3>
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
                <section id="project-feat-section">
                    <h2 tabindex="0">Features</h2>
                    <p>${port.jsonData.acf.proj_features_intro}</p>`;
            let features = port.jsonData.acf.proj_features_gen;
            for (let feature of features) {
                this.contentHTML += `
                    <h3 tabindex="0">${feature.proj_feat_gen_heading}</h3>
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
                <section id="project-skills-section">
                    <h2 tabindex="0">Gained Skills</h2>
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
            this.contentHTML += this.linkedinLink;
            this.contentHTML += this.githubLink;
            this.contentHTML += `</section>`;
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