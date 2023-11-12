
async function loadDogImage() {
    let response = await fetch('https://shibe.online/api/shibes');

    let imageUrl = await response.json();

    console.log('dog image: ' + imageUrl[0]);
    document.getElementById('dogPicture').src = imageUrl[0];
}