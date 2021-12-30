const apiUrl = process.env.REACT_APP_APIURL || "http://localhost:5000";

const getBuyHomes = async () => {
  try {
    //Need to change uri to fetch buy homes.
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    if (!res) {
      console.log("boop");
      throw new Error("Server did not respond", {
        cause: {
          success: false,
          message: { email: "Server did not respond" },
        },
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Request error", { cause: data });
    }

    // return data;
    return {
      payload: [
        {
          image:
            "https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true",
          title: "Hiranandani Towers",
          location: "Vashi",
          price: "20-30L",
        },
      ],
    };
  } catch (e) {
    if (e instanceof TypeError && e.message === "Failed to fetch") {
      return Promise.reject(
        new Error("Server is offline", {
          cause: {
            message: {
              email: "Server is offline",
            },
          },
        })
      );
    }
    return Promise.reject(e);
  }
};

const PropertyService = { getBuyHomes };
export default PropertyService;
