// import './css/style.css';
import './sass/style.sass';

// react
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './js/index.jsx'; // import index.jsx

(function() {
    ReactDOM.render(<Hello />, document.getElementById('app'));
})();

// vue
import Vue from 'vue';
new Vue({
  el: '#app_vue',
  data: {
      message: "Hello Vue"
  }
})