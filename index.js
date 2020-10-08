let users = [];
let button = document.querySelector("button");
let input = document.querySelector("input");
let user = document.querySelector(".user");
let info = document.querySelector(".info");
let usoFiltered = document.querySelector("#usu--filtered");
let infoFiltered = document.querySelector("#info--filtered");

window.addEventListener("load", fetchPeople());
// prettier-ignore
async function fetchPeople() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(p => p.json());
  res.results.map(p => {
    users.push({
      name: `${p.name.first} ${p.name.last}`,
      picture: p.picture,
      age: p.dob.age,
      gender: p.gender
    })
  })
}

button.addEventListener("click", handleButton);
input.addEventListener("keyup", handleTyping);

function handleButton() {
  manageInfo();
}

function handleTyping(event) {
  if (event.key === "Enter") {
    manageInfo();
  }
}

function manageInfo() {
  const u = users
    .filter((u) => u.name.toLowerCase().includes(input.value.toLowerCase()))
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  if (u.length === 0) {
    return;
  }

  const usersFiltered = u.map((u) => {
    return `<div>
  <img src="${u.picture.thumbnail}"/>
  <span>${u.name},<span/>
  <span>${u.age} anos<span/>
  <div/>`;
  });

  const countMale = u.reduce((accm, vi) => {
    return vi.gender === "male" ? (accm += 1) : accm;
  }, 0);

  const age = u.reduce((accm, vi) => {
    return (accm += vi.age);
  }, 0);

  const statistics = `<div>
  <span>Sexo masculino: <strong>${countMale}</strong> <span/> <br>
  <span>Sexo Feminino: <strong>${u.length - countMale}</strong> <span/> <br>
  <span>Soma das idades: <strong>${age}</strong> <span/> <br>
  <span>Média das idades: <strong>${(age / u.length).toFixed(
    2
  )}</strong> <span/>
  <div/>`;

  console.log(countMale);
  console.log(u);

  usoFiltered.textContent = `${usersFiltered.length} usuário(s) encontrado(s)`;
  infoFiltered.textContent = "Estatísticas";

  user.innerHTML = usersFiltered.join("");
  info.innerHTML = statistics;
}
