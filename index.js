const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


 //declare some varaible
let user_picture="";
let user_name ="";
let user_location= "";
let user_profile ="" ;
let user_followers='' ;
let user_followings='' ;
let user_bio='' ;
let user_blog= '' ;
let user_publicRepos ='';
let gitHub_stars ='' ;
let output;
console.log(user_bio)

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
    .then( function ({username, color}) {
            
        const queryUrl = `https://api.github.com/users/${username}?per_page=100`;
            //const resp= await axios.get(queryUrl);
    return axios
     .get(queryUrl).then(resp => {
         const data = resp.data
         //console.log("resp:", data)
            return{
              githubData: resp,
              nameColor: color,
            }    
        })
    });

}
 
function generateHTML(data, color) {
    console.log("mydata:", data)
    //console.log("color:", color)
    //console.log("newdata:", data)
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
            
           .nameColor{
            color: ${color}
           } 
             
         
          </style>     
      </head>
      <body>
 
         <div class="jumbotron .container-fluid">
             <h3 class="display-5 nameColor">${gitdata.name}</h3>
             <hr class="my-4">
             <img src=${data.avatar_url} width="200" height="200" alt="user"></img>
             </br></br>
             <p class="lead">Bio: ${data.bio}</p>
             <p class="lead"><a href=${data.html_url}>${data.name}'s GitHub Profile</a></p>
             <p class="lead"><a href=${data.blog}>${data.name}'s Blog</a></p>
             <p class="lead">GitHub Stars: ${data.gists_url}</p>
             <p class="lead">Public Repos: ${data.public_repos}</p>
             <p class="lead">Followers: ${data.followers}</p>
             <p class="lead">Following: ${data.following}</p>
             <p class="lead">Location: ${data.location}</p>
             
             
             <hr class="my-4">
              
    </div> 
    </body>   
   </html> `
}

async function init() {
    try {

        const output = await promptUser();
        //console.log("ans:", output)
        const html = generateHTML(output.githubData , output.nameColor);
        await writeFileAsync("index.html", html);
        console.log("created an HTML page successfully");
    }
    catch (err) {
        console.log(`error: `, err);

    }


}
//promptUser()
init()