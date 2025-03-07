async function getData() {
    console.log("hello")
    const url = "https://cors-anywhere.herokuapp.com/https://a.4cdn.org/boards.json";
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    document.getElementsByTagName("div")[0].innerHTML = json
    } catch (error) {
    console.error(error.message);
    }
}
getData();