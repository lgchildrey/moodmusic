const handleCreateButtonPress = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    // const $message = $('#message');
    // $message.html('');
    async function createUser() {
      await axios({
          method: 'POST',
          url: 'http://localhost:3000/account/create',
          data: {
            name: $('#username').val(), 
            pass: $('#password').val(),
            data: {
              email: $('#email').val()
            }
          }
       });

       const result = await axios({
         method: 'POST',
         url: 'http://localhost:3000/account/login',
         data: {
          name: $('#username').val(), 
          pass: $('#password').val()
         }
       });

       localStorage.setItem('jwt', result.data.jwt);
    
   // createUser();
//   var key = result.data.jwt;
//   async function getProfile() {
//       const result1 = await axios({
//           method: 'GET',
//           url: 'http://localhost:3000/account/status',
//           headers: { Authorization: `Bearer ${key}`}
//       });
//       return result1;
//   }
//   //async function postToUser() {
//       let profile = await getProfile();
//       await axios({
//           method: 'POST',
//           url: 'http://localhost:3000/user/person',
//           headers: { Authorization: `Bearer ${key}`},
//           data: {
//               name: profile.data.user.name,
//               data: {
//                   email: profile.data.user.data.email,
//               }
//           }
//       });
//  // }
  }
  //postToUser();
  createUser();
    // $message.html('<span class="has-text-success">Success! You have an account now.</span>');
    location.href = `../index.html`;
};

const loadIntoDOM = function() {
  const $root = $('#sign');
  $root.on('click', '#create', handleCreateButtonPress);
};

$(function() {
    loadIntoDOM();
});