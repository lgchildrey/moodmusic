import axios from 'axios';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});

async function createAuthor({first = $(), last = 'Doe', numBooks = 0}) {
  return await pubRoot.post(`/authors/`, {
    data: {first, last, numBooks}
  })
}

(async () => {
  await createAuthor({
    first: "chris",
    numBooks: 4
  });

  let {data} = await getAllAuthors();
  console.log(data)
})();
$(function() {
    const $form = $('#login-form');
    const $message = $('#message');
  
    $form.submit(function(e) {
      e.preventDefault();
  
      $message.html('');
  
      const data = $form.serializeArray().reduce((o, x) => {
        o[x.name] = x.value;
        return o;
      }, {});
      
      $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data,
        xhrFields: {
            withCredentials: true,
        },
      }).then(() => {
        $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
        location.href = `../index.html`;
      }).catch(() => {
        $message.html('<span class="has-text-danger">Something went wrong. Please check your email and password.</span>');
      });
    });
  });