import $ from 'jquery';
import axios from 'axios';
import Controller from '../src/controllers/TestController';

$(document).ready(function() {
  // MVC controller
  let mvc = new Controller();

  // When page first load, get information and render the information
  mvc.model.getInformationFromAPI(mvc.view.appendInformationFromGetRequest.bind(mvc.view));
  
  // Add Click events to the two check boxes
  mvc.view.addEventListenerToCheckBox(mvc.checkBoxEvent.bind(mvc));
});
