window.addEventListener('DOMContentLoaded', (e)=>{
    const searchForm = document.querySelector('#github-form')
    searchForm.addEventListener('submit', eventHandler)
    
    function eventHandler(e){
        e.preventDefault()
        getUserData()
    }
})

function getUserData(){

    let searchInput = document.querySelector('#search').value
    fetch(`https://api.github.com/search/users?q=${searchInput}`)
    .then (res=> res.json())
    .then(data=> renderUsers(data))
}

function renderUsers(data){
    let userArray = data.items
    userArray.forEach(user => buildUserCard(user))
}

function buildUserCard(user){
    let userCard = document.createElement('li')
    userCard.innerText = user.login
    userCard.addEventListener('click', getUserRepos)
    document.querySelector('#user-list').appendChild(userCard)
}

function getUserRepos(event){
    let userClicked = event.target.innerText
    resetReposDiv()
    fetch(`https://api.github.com/users/${userClicked}/repos`)
    .then(res=>res.json())
    .then(reposList=>renderRepos(reposList))
}

function renderRepos(reposList){
    reposList.forEach(repo=>{
        let repoCard = document.createElement('li')
        repoCard.innerText = repo.name
        document.querySelector('#repos-list').appendChild(repoCard)
    })
}

function resetReposDiv(){
    document.querySelector('#repos-list').innerHTML = ''
}