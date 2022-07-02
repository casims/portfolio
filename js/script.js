const port = {
    target: document.querySelector('main#menu'),
    loading: document.getElementById('loading'),
    data: null,
    jsonURLMain:'https://casims.ca/csport/wp-json/wp/v2/csp-project',
    contentHeader: `
    <h1 id="main-title">Connor Sims</h1>
    <p>Entry-level Front-End Engineer with a passion for JavaScript and problem solving.</p>
    `,
    getJSON: function(url, varName) {
        fetch(url)
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data);
            //     varName = data;
            // })
            .then (function(response) {
                response.json();
            })
            .then (function(data) {
                console.log(data);
                varName = data;
            })
    },
};