const renderProfile = function(profile, truth) {
    truth = false;
    let username = profile.data.user.name;
    let email = profile.data.user.data.email;
    let jwt = localStorage.getItem('jwt');
    let city = "";
    let person = "";
    let number = "";

    var card = `<div class="profile" style="background: #f9f1a2; height: 100vh;">
                    <section class="hero is-bold is-warning">
                        <div class="hero-body">
                            <div class ="container">
                                <h1 class="title" style="font-size: 300%;">${username}</h1>
                                <h2 class="subtitle">Your Account</h2>
                            </div>
                        </div>
                    </section>
                    <br/>
                    <br/>            
                    <div class="content" style="color: black;">
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Email: ${email}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Current City: ${city}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Emergency Contact Name: ${person}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Emergency Contact Number: ${number}</p>
                        </div>
                        <br/>
                        <br/>
                        <div class="editing" style="margin-left: 35%;">
                            <button id="back" type="button" class="button is-medium is-dark">Back</button>
                            <button id="edit" type="button" class="button is-medium is-primary" prof="${jwt}">Edit</button>
                        </div>
                    </div>     
                </div>`;
    return card; 
};

const renderUserProfile = function(profile, username, truth) {
    truth = true;
  //  let username = username;
    let city = profile.data.result.city;
    let email = profile.data.result.email;
    let person = profile.data.result.person;
    let jwt = localStorage.getItem('jwt');
    if (person === undefined) {
        person = "";
    }
    if (city === undefined) {
        city = "";
    }
    let number = profile.data.result.number;
    if (number === undefined) {
        number = "";
    }

    var card = `<div class="profile" style="background: #f9f1a2; height: 100vh;">
                    <section class="hero is-bold is-warning">
                        <div class="hero-body">
                            <div class ="container">
                                <h1 class="title" style="font-size: 300%;">${username}</h1>
                                <h2 class="subtitle">Your Account</h2>
                            </div>
                        </div>
                    </section>
                    <br/>
                    <br/>            
                    <div class="content" style="color: black;">
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Email: ${email}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Current City: ${city}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Emergency Contact Name: ${person}</p>
                        </div>
                        <div class ="container" style="font-size: 150%; font-family: Arial, Helvetica, sans-serif;">
                            <p>Emergency Contact Number: ${number}</p>
                        </div>
                        <br/>
                        <br/>
                        <div class="editing" style="margin-left: 35%;">
                            <button id="back" type="button" class="button is-medium is-dark">Back</button>
                            <button id="edit" type="button" class="button is-medium is-primary" prof="${jwt}">Edit</button>
                        </div>
                    </div>     
                </div>`;
    return card; 
};

const renderProfileEdit = function(profile, truth) {
let username = profile.data.user.name;
let email = profile.data.user.data.email;
    let jwt = localStorage.getItem('jwt');
    let city = "";
    let person = "";
    let number = "";
    if (truth === true) {
        city = profile.data.result.city;
        email = profile.data.result.email;
        person = profile.data.result.person;
        number = profile.data.result.number
    }

var form = `<div class="profile" style="background: #f9f1a2; height: 100vh;">
                <section class="hero is-bold is-warning">
                <div class="hero-body">
                    <div class ="container">
                        <h1 class="title" style="font-size: 300%;">${username}</h1>
                        <h2 class="subtitle">Edit Your Account</h2>
                    </div>
                </div>
                </section>
                <br/>
                <br/>
                <form name="editform">
                    <div class="field">
                    <label class="label"> Email</label>
                    <div class="control">
                        <input id="email" class="input" type="text" value="${email}">
                    </div>
                </div>
                <div class="field">
                    <label class="label"> Current City</label>
                    <div class="control">
                        <input id="city" class="input" type="text" value="${city}">
                    </div>
                </div>
                <div class="field">
                    <label class="label"> Emergency Contact Name</label>
                    <div class="control">
                        <input id="person" class="input" type="text" value="${person}">
                    </div>
                </div>
                <div class="field">
                    <label class="label"> Emergency Contact Number</label>
                    <div class="control">
                        <input id="number" class="input" type="text" value="${number}">
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" type="submit" id="submit" prof="${jwt}">Save</button>
                    </div>
                    <div class="control">
                        <button class="button is-dark" id="cancel" prof="${jwt}">Cancel</button>
                    </div>
                </div>
                </form>
            </div>`;
return form;
}

const handleEditButtonPress = function(event) {
    event.preventDefault();
    var id = event.target.getAttribute('prof');
    async function getProfile() {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: { Authorization: `Bearer ${id}`}
        });
        return result;
    }
    async function run() {
        var truth = false;
        let profile = await getProfile();
        $(event.target.closest(".profile")).replaceWith(renderProfileEdit(profile, truth));
    }
    run();
};

const handleCancelButtonPress = function(event) {
    event.preventDefault();
    var id = event.target.getAttribute('prof');
    async function getProfile() {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: { Authorization: `Bearer ${id}`}
        });
        return result;
    }
    async function run() {
        var truth = false;
        let profile = await getProfile();
        $(event.target.closest(".profile")).replaceWith(renderProfile(profile, truth));
    }
    run();
};

const handleEditFormSubmit = function(event) {
    event.preventDefault();
    var id = event.target.getAttribute('prof');

    var email = $('#email').val();
    var city = $('#city').val();
    var person = $('#person').val();
    var number = $('#number').val();

    async function updateProfile() {
        await axios({
            method: 'POST',
            url: 'http://localhost:3000/user/details',
            headers: { Authorization: `Bearer ${id}`},
            data: {
                data: {
                    email: email,
                    city: city,
                    person: person,
                    number: number,
                }
            },
        });
    }
    updateProfile();

    async function getUserProfile() {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:3000/user/details',
            headers: { Authorization: `Bearer ${id}`}
        });
        return result;
    }
    async function getProfile() {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: { Authorization: `Bearer ${id}`}
        });
        return result;
    }
    async function run() {
        var truth = true;
        let profile = await getUserProfile();
        let file = await getProfile();
        let username = file.data.user.name;
        $(event.target.closest(".profile")).replaceWith(renderUserProfile(profile, username, truth));
    }
    run();
};
const handleBackButton = function(event) {
    event.preventDefault();
    location.href = `../privatepage/`;
}

const loadIntoDOM = function(profile, truth) {
    const $root = $('#root');
    var key = localStorage.getItem('jwt');
    if (truth === true) {
        async function getProfile() {
            const result = await axios({
                method: 'GET',
                url: 'http://localhost:3000/account/status',
                headers: { Authorization: `Bearer ${key}`}
            });
            return result;
        }
        async function run() {
            let file = await getProfile();
            let username = file.data.user.name;
            $root.append(renderUserProfile(profile, username, truth));
        }
        run();
    }
    if (truth === false) {
        $root.append(renderProfile(profile, truth));
    }
    //$root.on('click', '#submit', handleSubmitButtonPress);
    $root.on('click', '#edit', handleEditButtonPress);
    $root.on('click', '#submit', handleEditFormSubmit);
    $root.on('click', '#cancel', handleCancelButtonPress);
    $root.on('click', '#back', handleBackButton);
};
  
$(function() {
    var key = localStorage.getItem('jwt');
    var truth = false;
    //try {
    //     async function getUserProfile() {
    //         const result = await axios({
    //             method: 'GET',
    //             url: 'http://localhost:3000/user/details',
    //             headers: { Authorization: `Bearer ${key}`}
    //            });
    //         return result;
    //     }
    //     async function run() {
    //         truth = true;
    //         let profile = await getUserProfile();
    //         loadIntoDOM(profile, truth);
    //     }
    //     run();
    // } catch(error) {
        async function getProfile() {
            const result = await axios({
                method: 'GET',
                url: 'http://localhost:3000/account/status',
                headers: { Authorization: `Bearer ${key}`}
            });
            return result;
        }
        async function run() {
            truth = false;
            let profile = await getProfile();
            loadIntoDOM(profile, truth);
        }
        run();
   // }
});