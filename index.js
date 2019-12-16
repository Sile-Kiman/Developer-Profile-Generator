const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


let user_picture;
let user_name ;
let user_location ;
let user_profile ;
let user_followers ;
let user_followings ;
let user_bio ;
let user_blog ;
let user_publicRepos ;
let gitHub_stars ;


function promptUser() {
//     return inquirer.prompt([
return inquirer.prompt([{
  type: "input" ,
  message: "Enter your GitHub username",
  name: "username"
  },
  {
  type: "list" ,
  message: "Enter your favorite color",
  name: "color",
  choices:[
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

                    const outputArray = [];
                    user_picture = response.data.avatar_url;
                    user_name = response.data.name;
                    user_location = response.data.location;
                    user_profile = response.data.html_url;
                    user_followers = response.data.followers;
                    user_followings = response.data.following;
                    user_bio = response.data.bio;
                    user_blog = response.data.blog;
                    user_publicRepos = response.data.public_repos;
                    gitHub_stars = response.data.public_gists


                    //   const repoNameStr = outputArray.push(`${user_picture},${user_name},${user_location},${user_profile}, ${user_profile}, ${user_followers},${user_followings},${user_bio},
                    //   ${user_blog},${user_publicRepos}`)
                    //   //console.log(outputArray)
                    //   let eachOuput;
                    //   outputArray.forEach(output=>{
                    //       eachOuput= JSON.stringify(`${output}, '\n'`)
                    generateHTML()
                })

        })

}


//let user_name="";
//let user_picture= "";

function generateHTML(answer) {
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
             <h3 class="display-5 color">${user_name}</h3>
             <hr class="my-4">
             <img src=${user_picture} width="200" height="200" alt="user"></img>
             </br></br>
             <p class="lead">Bio: ${user_bio}</p>
             <p class="lead"><a href=${user_profile}>${user_name}'s GitHub Profile</a></p>
             <p class="lead"><a href=${user_bio}>${user_name}'s Blog</a></p>
             <p class="lead">GitHub Stars: ${gitHub_stars}</p>
             <p class="lead">Public Repos: ${user_publicRepos}</p>
             <p class="lead">Followers: ${user_followers}</p>
             <p class="lead">Following: ${user_followings}</p>
             <p class="lead">Location: ${user_location}</p>
             
             <hr class="my-4">
             <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
             <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
           </div> 
           </body>   
   </html> `
}

async function init() {
    try {

        const response = await promptUser();
        const html = generateHTML(response);
        await writeFileAsync("index.htm", html)
        console.log("created an HTML page successfully")
    }
    catch(err)
    {
        console.log(`error: `, err)
      
    }


}
//promptUser()
init()