
//create a fetch for githun repos
fetch("https://api.github.com/users/lemonadelightice/repos")
 .then((response) => {
    if (response.ok) {
      return response.text();
      } else {
        throw new Error("Failed to fetch repositories");
      }
    })
  .then((data) => {
    const repositories = JSON.parse(data);
    console.log(repositories);
 
  //DOM to select Projects section by ID
  const projectSection = document.getElementById("projects");

  //Create ul in projects section
  let projectList = document.createElement("ul");
  projectSection.appendChild(projectList);

  for (let repository of repositories) {
    let project = document.createElement("li");
    project.innerText = repository.name;
    projectList.appendChild(project);
  }
})
 .catch((error) => {
    if (error instanceof SyntaxError) {
        console.error("Unparsable response from server");
    } else {
        console.error("Error fetching data: ", error.message);
    }
});
