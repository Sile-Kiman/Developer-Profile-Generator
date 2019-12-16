 
  function generateHTML(response) {
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
              
            color:${response.color}
        
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