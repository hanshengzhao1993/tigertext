class View {
  constructor() {
    this.boardingCheckBox = document.getElementById('boarding');
    this.sittingCheckBox = document.getElementById('sitting');
    this.listItemUL = document.getElementById('list-items');
  }
  addEventListenerToCheckBox(callBackEventHandler) {
    this.boardingCheckBox.addEventListener('click', callBackEventHandler);
    this.sittingCheckBox.addEventListener('click', callBackEventHandler);
  }

  appendInformationFromGetRequest(response) {
    response.data.search.forEach((item) => {
      const listItem = document.createElement('li');
      const itemTitle = document.createElement('a');
      const itemName = document.createElement('div');
      const itemPetName = document.createElement('div');
      const itemDescription = document.createElement('div');
      // Title
      const returnWordWith = (ele) => {
        if (ele.length > 0) {
          if (ele.includes("'")) {
            const idx = ele.indexOf("'");
            return `${ele.slice(0, idx).toLowerCase()}${ele.slice(idx + 1, ele.length).toLowerCase()}`;
          }
          return ele.toLowerCase();
        }
      };
      const title = item.title.trim()
        .split(' ')
        .filter((e) => {if (e.length > 0) { return e} })
        .map(returnWordWith)
        .join('-');
      itemTitle.innerHTML = title;
      itemTitle.setAttribute('href', '#');
      itemTitle.setAttribute('target', '_blank');
      // Name
      itemName.innerHTML = capitalizeFirstLetter(item.user.first);
      itemName.innerHTML += ` ${item.user.last[0].toUpperCase()}.`;
      // Description
      itemDescription.innerHTML = addEclipse(item.description);
      // Pet Name
      itemPetName.innerHTML = item.pet.name;
      listItem.appendChild(itemTitle);
      listItem.appendChild(itemName);
      listItem.appendChild(itemPetName);
      listItem.appendChild(itemDescription);
      this.listItemUL.appendChild(listItem);
    });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function addEclipse(string) {
      if (string.length < 48) {
        return string;
      }
      const splitString = string.slice(0, 48);
      let newString = splitString.split(' ');
      newString.pop();
      newString = `${newString.join(' ')}...`;
      return newString;
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default View;
