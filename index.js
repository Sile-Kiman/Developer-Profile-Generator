const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const pdf = require("html-pdf");

// promise async
const writeFileAsync = util.promisify(fs.writeFile);


//Function to prompt user and collect answers using inquirer
function promptUser() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
    },
    {
        type: "list",
        message: "Enter your favorite color",
        name: "color",
        choices: [
            "red",
            "blue",
            "purple",
            "yellow",
            "white",
            "orange",
            "green"

        ]
    }
    ])
        .then(function ({ username, color }) {

            const queryUrl = `https://api.github.com/users/${username}?per_page=100`;

            numbOfRepoStar(username)

            return axios
                .get(queryUrl)
                .then(resp => {
                    const data = resp
                    //return color and user GitHub login name
                    return {
                        githubData: resp,
                        nameColor: color,
                    }
                })

        });

}
 
 
 
function numbOfRepoStar(username) {

    const queryUrlStar = `https://api.github.com/users/${username}/starred`
    return axios.get(queryUrlStar)
        .then(res => {

            let sum = 0;
            const starNum = res.data.map(function (repo, err) {
                if (err) console.log(err)
                const  starG = repo.stargazers_count;
                 
                sum = sum + starG;
                console.log("each:", starG)
                console.log("count:", sum)
                 

            }); return starNum;

        });

}


//Function to generate the Html page
function generateHTML(data, color) {
 return `
   <!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
         <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
         
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
         <title>GitHub Profile</title>
         <style>
         .jumbotron {
            padding: 2rem 1rem;
            
            background-color: black;
            border-radius: 10px;
            color: white;
            margin: 40px;
         }
           .nameColor{
            color:${color}
           } 
             
          </style>     
    </head>
    <body>
 
         <div class="jumbotron .container-fluid">
             <h3 class="display-5 nameColor">${data.name}</h3>
             <hr class="my-4">
             <img src=${data.avatar_url} width="200" height="200" alt="user"></img>
             </br></br>
             <p class="lead">Bio: ${data.bio}</p>
             <p class="lead"><a href=${data.html_url}>${data.name}'s GitHub Profile</a></p>
             <p class="lead"><a href=${data.blog}>${data.name}'s Blog</a></p>
             <p class="lead">GitHub Stars: ${data.public_gists}</p>
             <p class="lead">Public Repos: ${data.public_repos}</p>
             <p class="lead">Followers: ${data.followers}</p>
             <p class="lead">Following: ${data.following}</p>
             <p class="lead">Location: ${data.location}</p>
             
             <hr class="my-4">
              
          </div> 
    </body>   
   </html> `
};

async function init() {
    try {

        const output = await promptUser();
        const html = generateHTML(output.githubData.data, output.nameColor);
        await writeFileAsync("index.html", html);
        console.log("created an HTML page successfully");
        options = { format: 'Letter' };
        pdf.create(html, options).toFile("DevGitHub_Profile.pdf", function(err, res) {
        if (err) return console.log(err);
        console.log("PDF success!")
        });

    }
    catch (err) {
        //Show the error message that stoped the code"
        console.log(`error: `, err);
    }

}

init()
