function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if(Client.checkForURL(formText)) {
    console.log("::: Form Submitted :::")

    submitData('http://localhost:8081/api', {url: formText})

    .then(function(res) {
		console.log(res);
        document.getElementById("results").innerHTML = `results: ${res.agreement}`;
        
    })
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}

const submitData = async (url = "", data = {}) => {
    console.log('Analyze:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


export { handleSubmit }
