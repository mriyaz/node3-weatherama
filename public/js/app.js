console.log("js scripting is working!!");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch("/weather?address=" + location)
        .then((response) => {
            response.json().then(data => {
                if (data.errorMsg) {
                    //console.log(data.errorMsg);
                    messageOne.textContent = data.errorMsg;
                }
                else {
                    //console.log(data.location);
                    //console.log(data.forecast);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })

        });
})