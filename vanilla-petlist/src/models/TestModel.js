import axios from 'axios';

class Model {
  constructor() {
    this.listItemUL = document.getElementById('list-items');
  }
  getInformationFromAPI(callback) {
    axios.get('http://localhost:3000/static/search.json')
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        throw err;
      });
  }

  getInformationBoardingCheckBox(callback) {
    axios.get('http://localhost:3000/static/search.json?service=boarding')
      .then((response) => {
        this.listItemUL.innerHTML = '';
        callback(response);
      })
      .catch((err) => {
        throw err;
      });
  }

  getInformationSittingCheckBox(callback) {
    axios.get('http://localhost:3000/static/search.json?service=sitting')
      .then((response) => {
        this.listItemUL.innerHTML = '';
        callback(response);
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default Model;
