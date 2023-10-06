"use strict";

const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".show-modal");
const modal = document.querySelector(".modal"); // add user modal aidi
const btnEdit = document.getElementById("btnEdit"); // shecvale saxelebi
const btnDel = document.getElementById("btnDel");
const submitbtn = document.getElementById("submitbtn");
const sumTotal = document.getElementById("sum");
const form = document.getElementById("form");

let id = document.getElementById("id");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let salary = document.getElementById("salary");
let tableBody = document.getElementById("tableBody");
let table = document.getElementById("userTable");

let inputs = document.querySelectorAll(".inpEl");
let userNumb = 0;
let sum = 0;
let trIndexDel, delBTNs, editBTNs, closet, trElements;
let tableArr = [];

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

function User(id, fname, lname, salary) {
  this.id = id;
  this.firstName = fname;
  this.lastName = lname;
  this.salary = salary;
}

btnsOpenModal.addEventListener("click", function () {
  openModal();
  for (let i of inputs) {
    i.value = "";
  }
  submitbtn.classList.remove("hidden");
  btnEdit.classList.add("hidden");
  btnDel.classList.add("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function sums(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function showCurrentUser(e) {
  e.preventDefault();
  openModal();
  let currentTr = e.target.closest("tr");

  inputs[0].value = currentTr.children[0].textContent;
  inputs[1].value = currentTr.children[1].textContent;
  inputs[2].value = currentTr.children[2].textContent;
  inputs[3].value = currentTr.children[3].textContent;
}

submitbtn.addEventListener("click", function (e) {
  e.preventDefault();
  //SUM section//
  tableArr = [];
  for (var i = 1; i < table.rows.length - 1; i++) {
    tableArr.push(Number(table.rows[i].cells[3].innerText));
  }
  sumTotal.textContent = sums(tableArr);
  //////////////

  //all inputs must be filled
  let arr = [];
  let arrSome;

  for (let index = 0; index < inputs.length; index++) {
    arr.push(inputs[index].value);
    arrSome = arr.some((item) => item == "");
  }
  console.log(arr); //array from input values
  console.log(arrSome);

  if (arrSome) {
    alert(`Please fill the form completely 🤓`);
  } else {
    //creating trs with datas
    let trElement = document.createElement("tr");
    trElement.classList.add("trElement");
    tableBody.appendChild(trElement);
    //create user object
    let newUser = new User(
      id.value,
      firstName.value,
      lastName.value,
      salary.value
    );
    //create tds
    const createTd = function (event) {
      for (let index = 0; index < event; index++) {
        let tdElement = document.createElement("td");
        trElement.appendChild(tdElement);
      }
    };
    createTd(inputs.length + 2);

    trElements = document.querySelectorAll(".trElement");
    let editIcon = '<i class="fa-solid fa-pen-to-square"></i>';
    let deleteIcon = '<i class="fa-solid fa-circle-xmark"></i>';
    console.log(userNumb);
    trElements[userNumb].classList.add(`${userNumb}`);

    trElements[userNumb].children[0].textContent = `${newUser.id}`;
    trElements[userNumb].children[1].textContent = `${newUser.firstName}`;
    trElements[userNumb].children[2].textContent = `${newUser.lastName}`;
    trElements[userNumb].children[3].textContent = `${newUser.salary}`;
    trElements[userNumb].children[4].innerHTML = editIcon;
    trElements[userNumb].children[5].innerHTML = deleteIcon;

    console.log(newUser);

    alert(`User: ${newUser.firstName} was successfully added 🥳`);
    closeModal();
    userNumb++;

    editBTNs = document.querySelectorAll(".fa-pen-to-square");
    delBTNs = document.querySelectorAll(".fa-circle-xmark");

    //SUM section//
    tableArr = [];
    for (var i = 1; i < table.rows.length - 1; i++) {
      tableArr.push(Number(table.rows[i].cells[3].innerText));
    }
    sumTotal.textContent = sums(tableArr);
    ////////////
  }
  //loopis gareshe igives gaketeba dagugle
  for (let indx = 0; indx < editBTNs.length; indx++) {
    editBTNs[indx].addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
      closet = editBTNs[indx].closest("tr");

      inputs[0].value = closet.children[0].textContent;
      inputs[1].value = closet.children[1].textContent;
      inputs[2].value = closet.children[2].textContent;
      inputs[3].value = closet.children[3].textContent;

      submitbtn.classList.add("hidden");
      btnDel.classList.add("hidden");
      btnEdit.classList.remove("hidden");

      btnCloseModal.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);
    });
  }

  btnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    closet.children[0].textContent = inputs[0].value;
    closet.children[1].textContent = inputs[1].value;
    closet.children[2].textContent = inputs[2].value;
    closet.children[3].textContent = inputs[3].value;

    closeModal();
    //SUM section//
    tableArr = [];
    for (var i = 1; i < table.rows.length - 1; i++) {
      tableArr.push(Number(table.rows[i].cells[3].innerText));
    }
    sumTotal.textContent = sums(tableArr);
    ///////////
  });

  for (let ind = 0; ind < delBTNs.length; ind++) {
    delBTNs[ind].addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
      closet = delBTNs[ind].closest("tr");

      inputs[0].value = closet.children[0].textContent;
      inputs[1].value = closet.children[1].textContent;
      inputs[2].value = closet.children[2].textContent;
      inputs[3].value = closet.children[3].textContent;

      submitbtn.classList.add("hidden");
      btnDel.classList.remove("hidden");
      btnEdit.classList.add("hidden");

      btnCloseModal.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);

      trIndexDel = ind;
    });
  }
});
btnDel.addEventListener("click", function (ev) {
  let rowDelete = delBTNs[trIndexDel].closest("tr");
  ev.preventDefault();
  let text = `Are you sure you want to delete user ${inputs[1].value}`;
  if (confirm(text)) {
    rowDelete.remove();
    ev.preventDefault();
    closeModal();
    //SUM section//
    tableArr = [];
    for (var i = 1; i < table.rows.length - 1; i++) {
      tableArr.push(Number(table.rows[i].cells[3].innerText));
    }
    sumTotal.textContent = sums(tableArr);
    //////////////
    userNumb--;
  } else {
    ev.preventDefault();
  }
});
