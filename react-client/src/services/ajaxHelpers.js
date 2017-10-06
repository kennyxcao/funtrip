import $ from 'jquery';
import _ from 'lodash';

const ajax = (method, url, data, contentType, dataType, callback) => {
  $.ajax({
    type: method,
    url: url, 
    data: data,
    contentType: contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: dataType || 'text',
    success: (results, status, xhr) => {
      console.log('AJAX ' + method + ' to ' + url + ' Sucessiful');
      callback(results);
    },
    error: (xhr, status, error) => {
      console.error('AJAX ' + method + ' to ' + url + ' Failed');
      console.error(xhr, status, error);        
    }
  }); 
};

const ajaxGet = (url, data, contentType, dataType, callback) => {
  ajax('GET', url, data, contentType, dataType, callback);
};

const ajaxPost = (url, data, contentType, dataType, callback) => {
  ajax('POST', url, data, contentType, dataType, callback);
};

const ajaxDelete = (url, data, contentType, dataType, callback) => {
  ajax('DELETE', url, data, contentType, dataType, callback);
};

const ajaxPatch = (url, data, contentType, dataType, callback) => {
  ajax('PATCH', url, data, contentType, dataType, callback);
};


export {ajaxGet, ajaxPost, ajaxDelete, ajaxPatch};