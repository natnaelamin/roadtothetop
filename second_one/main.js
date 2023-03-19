// customer Class
class Customer {
  constructor(name, location, phone) {
    this.name = name;
    this.location = location;
    this.phone = phone;
  }
}
// UI Class
class UI {
  static displaycustomers() {
    const customers = Store.getcustomers();
    customers.forEach((customer) => UI.addCustomerToList(customer));
  }
  static addCustomerToList(customer) {
    let table = document.querySelector("table");
    const temp = document.createElement("tbody");
    let template = `
                <tr>
                    <td>${customer.name}</td>
                    <td>${customer.location}</td>
                    <td>${customer.phone}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
                </tr>`;
    temp.innerHTML += template;
    table.appendChild(temp);

    var tr = temp;
    let list = [];
    list.push(customer.name);
    var filter = document.getElementById("search");
    filter.addEventListener("keyup", filteritems);
    // // filter items
    function filteritems(e) {
      var text = e.target.value.toLowerCase();
      //   // get list
      if (list[0].startsWith(text)) {
        tr.style.display = "";
      } else {
        tr.style.display = "none";
      }
    }
  }

  static deleteCustomer(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#customer-form");
    container.insertBefore(div, form);
    // Vanish in 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#phone").value = "";
  }
}

// Store Class
class Store {
  static getcustomers() {
    let customers;
    if (localStorage.getItem("customers") === null) {
      customers = [];
    } else {
      customers = JSON.parse(localStorage.getItem("customers"));
    }
    return customers;
  }
  static addCustomer(customer) {
    const customers = Store.getcustomers();
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));
  }
  static removeCustomer(phone) {
    const customers = Store.getcustomers();
    customers.forEach((customer, index) => {
      if (customer.phone === phone) {
        customers.splice(index, 1);
      }
    });
    localStorage.setItem("customers", JSON.stringify(customers));
  }
}
// Event: Display customers
document.addEventListener("DOMContentLoaded", UI.displaycustomers);
// Event: Add a customer
document.querySelector("#customer-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const name = document.querySelector("#name").value;
  const location = document.querySelector("#location").value;
  const phone = document.querySelector("#phone").value;
  // Validate
  function validall() {
    UI.showAlert("you must fill in all fields", "danger");
  }
  function validname() {
    UI.showAlert("name must be 4 to 15 characters long", "danger");
  }
  function validlocation() {
    UI.showAlert("location must be 4 to 15 characters long", "danger");
  }
  function validphone() {
    UI.showAlert("phone# must be a number and 10 characters long", "danger");
  }
  function validation() {
    if (name === "" || location === "" || phone === "") {
      validall();
    } else if (name.length < 4 || name.length > 15) {
      validname();
    } else if (location.length < 4 || location.length > 15) {
      validlocation();
    } else if (isNaN(phone) === true || phone.length !== 10) {
      validphone();
    } else {
      // Instantiate customer
      const customer = new Customer(name, location, phone);
      // Add customer to UI
      UI.addCustomerToList(customer);
      // Add customer to store
      Store.addCustomer(customer);
      // Show success message
      UI.showAlert("customer Added ", "success");

      // Clear fieldsUI.clearFields();
      UI.clearFields();
    }
  }
  validation();
});

// Event: Remove a customer
document.querySelector("#table").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure you wanna remove this person?")) {
      // Remove customer from UI
      UI.deleteCustomer(e.target);
      // Remove customer from store
      Store.removeCustomer(
        e.target.parentElement.previousElementSibling.textContent
      );
      // Show success message
      UI.showAlert("customer Removed", "success");
    }
  }
});
