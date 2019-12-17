const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


 //declare some varaible
let user_picture;
let user_name;
let user_location ;
let user_profile ;
let user_followers ;
let user_followings ;
let user_bio ;
let user_blog ;
let user_publicRepos ;
let gitHub_stars ;
var output;

function promptUser() {
    //     return inquirer.prompt([
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

        .then(function ({ username }) {
            //  const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
            // });
            //const queryUrl1 = `https://api.github.com/users/${username}/followers?per_page=100`
            // const queryUrl2 = `https://api.github.com/users/${username}/following?per_page=100`
            const queryUrl = `https://api.github.com/users/${username}?per_page=100`
            axios
                .get(queryUrl)
                .then(response => {
                    //console.log("result:", response)

                     output = response.data;
                    //console.log("data: ", output)
                     user_picture =response.data.avatar_url;
                     user_name = response.data.name;
                     user_location = response.data.location;
                     user_profile = response.data.html_url;
                     user_followers = response.data.followers;
                     user_followings = response.data.following;
                     user_bio = response.data.bio;
                     user_blog = response.data.blog;
                     user_publicRepos = response.data.public_repos;
                     gitHub_stars = response.data.public_gists

                    //generateHTML(user_name)
                    //generateHTML(user_picture)

                    //   const repoNameStr = outputArray.push(`${user_picture},${user_name},${user_location},${user_profile}, ${user_profile}, ${user_followers},${user_followings},${user_bio},
                    //   ${user_blog},${user_publicRepos}`)
                    //   //console.log(outputArray)
                    //   let eachOuput;
                    //   outputArray.forEach(output=>{
                    //       eachOuput= JSON.stringify(`${output}, '\n'`)

                })

        })

}
 
 

module.exports = {
    promptUser: promptUser,
    user_picture: promptUser.user_picture,
    user_name : promptUser.user_name,
    user_bio : promptUser.bio,
    user_profile: promptUser.user_profile,
    user_location:promptUser.user_location,
    user_followers:promptUser.user_followers,
    user_followings:promptUser.user_followings,
    user_blog:promptUser.user_blog,
    user_publicRepos:promptUser.user_publicRepos,
    gitHub_stars:promptUser.gitHub_stars,
     

};
console.log(`out:, ${output}`)
console.log(`out122:, ${user_followings}`)

 
 

     
function generateHTML(promptUser) {
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
           .color{
               
             
         
           }
          </style>     
      </head>
      <body>
 
         <div class="jumbotron .container-fluid">
             <h3 class="display-5 color">${promptUser.user_name}</h3>
             <hr class="my-4">
             <img src=${promptUser.user_picture} width="200" height="200" alt="user"></img>
             </br></br>
             <p class="lead">Bio: ${promptUser.user_bio}</p>
             <p class="lead"><a href=${promptUser.user_profile}>${promptUser.user_name}'s GitHub Profile</a></p>
             <p class="lead"><a href=${promptUser.user_bio}>${promptUser.user_name}'s Blog</a></p>
             <p class="lead">GitHub Stars: ${promptUser.gitHub_stars}</p>
             <p class="lead">Public Repos: ${promptUser.user_publicRepos}</p>
             <p class="lead">Followers: ${promptUser.user_followers}</p>
             <p class="lead">Following: ${promptUser.user_followings}</p>
             <p class="lead">Location: ${promptUser.user_location}</p>
             
             
             <hr class="my-4">
             <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
             <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div> 
    </body>   
   </html> `
}

async function init() {
    try {

        const output = await promptUser();
        console.log("ans:", output)
        const html = generateHTML(output);
        await writeFileAsync("index.html", html)
        console.log("created an HTML page successfully")
    }
    catch (err) {
        console.log(`error: `, err)

    }


}

//promptUser()
init()