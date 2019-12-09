const handleSubmitButtonPress = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const $message = $('#message');
    $message.html('');

    async function loginUser() {
      try {
        const result = await axios({
          method: 'POST',
          url: 'http://localhost:3000/account/login',
          data: {
            name: $('#username').val(), 
            pass: $('#password').val()
          }
       });

       localStorage.setItem('jwt', result.data.jwt);
       $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
       location.href = `../index.html`;
      } catch(error) {
        $message.html('<span class="has-text-danger">Something went wrong. Please check your email and password.</span>');
      }
    }
    loginUser();
};

const loadIntoDOM = function() {
  const $root = $('#login');
  $root.on('click', '#submit', handleSubmitButtonPress);
};

$(function() {
    loadIntoDOM();
});