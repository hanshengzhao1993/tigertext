import View from '../views/TestView';
import Model from '../models/TestModel';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.boardingCheckBox = document.getElementById('boarding');
    this.sittingCheckBox = document.getElementById('sitting');
  }

  checkBoxEvent(event) {
    if (event.srcElement.id === 'boarding') {
      this.sittingCheckBox.checked = false;
      this.model.getInformationBoardingCheckBox(this.view.appendInformationFromGetRequest.bind(this.view));
    } else {
      this.boardingCheckBox.checked = false;
      this.model.getInformationSittingCheckBox(this.view.appendInformationFromGetRequest.bind(this.view));
    }
  }
}

export default Controller;
