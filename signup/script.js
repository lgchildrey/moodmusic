import axios from 'axios';
$(function() {
  // import axios from 'axios';
  const $form = $('#sign-form');
  const $message = $('#message');
    $form.submit(function(e) {
      e.preventDefault();
      $message.html('');
      // const pubRoot = new axios.create({
      //   baseURL: "http://localhost:3000/account"
      // });
      // async function createUser({name = $('#username').value, pass = $('#password').value}) {
      //   return await pubRoot.post(`/create/`, {
      //     data: {name, pass}
      //   })
      // }
      // async function getAllUsers() {
      //   return await pubRoot.get('/create');
      // }
      //   let {data} = await getAllUsers();
         console.log("hi world")
      
      $message.html('<span class="has-text-success">Success! You have an account now.</span>');
      location.href = `../index.html`;
    });
  });