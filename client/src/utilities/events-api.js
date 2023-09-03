//const BASE_URL="http://localhost:4000/events"
const BASE_URL=REACT_APP_BASE_URL

export async function index() {

    const res = await fetch(BASE_URL, {
      method: "GET",
    });

    console.log(res);

    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
}

export async function create(data) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    const res = await fetch(BASE_URL, config);
  
    console.log(res);
  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
}

export async function show(id) {
    const URL = `${BASE_URL}/${id}`;
    const config = {
      method: "GET",
    };
    const res = await fetch(URL, config);

    console.log(res);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
}

export async function update(id, data) {

    const URL = `${BASE_URL}/${id}`;
    
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    const res = await fetch(URL, config);
  
    console.log("update response", res);
  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
}

export async function destroy(id){
    const URL = `${BASE_URL}/${id}`;
    const config = {
      method: "DELETE",
    };
    const res = await fetch(URL, config);

    console.log(res);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }