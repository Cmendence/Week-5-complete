// Create a menu app as seen in this week’s video. What you
// create is up to you as long as it meets the following requirements:
// -Use at least one array.
// -Use at least two classes.
// -Your menu should have the options to create, view, and delete elements.

class Animal {
  constructor(name, animalType) {
    this.name = name; //This is the name of your animal(ie George, Betty).
    this.animalType = animalType; //Type of animal (Cow, Horse, Chicken, etc).
  }
}

class Pasture {
  constructor(name) {
    // Identifier for the pasture the user passes in.
    this.name = name; // Name of the pasture holding the animals (North/South/East/West, 1/2/3/4).
    this.animals = []; // This is an array that will hold all the animals that are assigned to this pasture.
  }

}

class Menu {
  constructor() {
    this.pastures = []; //This array will hold all the pastures created.
    this.selectedPasture = null; // Selector for pasture. Starts at null because nothing is selected by default.
  }

  start() {
    // Entry method for the application.
    let selection = this.showMainMenuOptions(); // Calls the showMenuOptions method and stores the returned value in the selection variable.

    while(selection != 0) {
      // Wwitch statement which allows users to select from the menu options and call on the appropriate methods.
      switch (selection) {
        case '1':
          this.createPasture(); // Calls createPasture method to create new pasture.
          break;
        case '2':
          this.viewPasture(); // Calls viewPasture method to view.
          break;
        case '3':
          this.removePasture(); // Calls deletePasture method to delete a pasture.
          break;
        case '4':
          this.displayPastures(); // Calls displayPatures method to show all pastures created.
          break;
        default:
          selection = 0;
          alert("Invalid Selection. Please try again."); // Alerts when user chooses invalid number and reloads the menu.
      }
      selection = this.showMainMenuOptions(); //This line is sorcery and makes the whole program work. I do not know what it does.
    }
    alert("Goodbye!"); // Alerts and exits app when user chooses 0.
  }

  showMainMenuOptions() {
    //Method that displays the menu options on start.
    return prompt(`
        0) Exit
        1) Create a Pasture
        2) View Pastures
        3) Remove Pasture
        4) Display All Pastures
    `);
  }

  showPastureMenuOptions(pastureInfo) {
    //Sub menu to add or remove animals from a pasture.
    //pastureInfo is the info passed in from the viewPasture method
    return prompt(`
    0) Back
    1) Add New Animal
    2) Remove Animal
    ~~~~~~~~~~~~~~~~~~~
    ${pastureInfo}
    `);
  }

  displayPastures() {
    // Displays all pastures created by user.
    let pastureString = ""; // Empty string that will hold and display created pastures.
    for (let i = 0; i < this.pastures.length; i++) {
      pastureString += i + ") " + this.pastures[i].name + "\n"; // Adds pasture name to pastureString
    }
    alert(pastureString); // Displays the pastureString variable to the user.
  }

  createPasture() {
    // Allows user to create a Pasture when they select option 1.
    let name = prompt("Enter name for new pasture:"); // Holds name of new pasture created by user.
    this.pastures.push(new Pasture(name)); // Pushes the name of the new pasture to the pastures array.
  }

  viewPasture() {
    // View a pasture when option 2 is selected. Options to add/remove animals inside.
    let index = prompt("Enter the index of the pasture you would like to view");

    if (index > -1 && index < this.pastures.length) {
      // Checks validity of user choice.
      this.selectedPasture = this.pastures[index]; // Navigates to the selected pasture.
      let description = "Pasture Name: " + this.selectedPasture.name + "\n";

      for (let i = 0; i < this.selectedPasture.animals.length; i++) {
        //Loops through the selected pasture and shows the contents
        description +=
          i + ") " + this.selectedPasture.animals[i].name + ' the ' 
          + this.selectedPasture.animals[i].animalType + '\n' // Updates description to include name and animal type of the animals.
      }

      let selection1 = this.showPastureMenuOptions(description); //Calls showPastureMenuOptions and passes description in as an argument.
      switch (selection1) {
        case "1":
          this.addAnimal(); //Calls addAnimal method.
          break;
        case "2": 
          this.removeAnimal(); //Calls removeAnimal method.
          break;
        default: // If user tries to input other number.
          "Invalid selection. Please try again.";
      }
    }
  }

  removePasture() {
    let index = prompt("Enter the index of the pasture you wish to delete");
    if (index > -1 && index < this.pastures.length) {
      //Checks user input for validity. Between 0 and the number of pastures created.
      this.pastures.splice(index, 1); // Removes the pasture at the user input (index).
    }
  }
  addAnimal() {
    let name = prompt("Enter name of new animal:"); //Name of animal(Midnight, Betty, Daisy).
    let animalType = prompt("What kind of animal is this?"); //Type of animal(Cow, chicken, pig).
    this.selectedPasture.animals.push(new Animal(name, animalType)); //Adds new animal to selected pasture.
  }

  removeAnimal() {
    let index = prompt("Enter index of the animal you'd like to remove:");
    if (index > -1 && index < this.selectedPasture.animals.length) {
      // Checks for valid selection.
      this.selectedPasture.animals.splice(index, 1); //Removes animal from the user input (index).
    }
  }
}

let menu = new Menu(); // Creates new instance of the Menu object.
menu.start(); // Calls the start method of the Menu object
