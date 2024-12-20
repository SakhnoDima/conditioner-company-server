import axios from "axios";
// const getLocations = require("./getLocations");
// const createLocation = require("./createLocation");

const API_TOKEN =
  "9589fcc5c3365f96a330d763a34d7b908b95c22760a0ae9b24a70d94e6bd34d3";

// const testLocations = require('./places3');

// let itemsId = []

export async function createWebflowPost() {
  const testLocations = [
    {
      isArchived: false,
      isDraft: false,
      fieldData: {
        name: "Aeon Heating & Air Conditioning",
        address: "6805 NY-56, Potsdam, NY 13676, USA",
        city: "Potsdam",
        number: "(315) 265-3744",
        site: "https://www.aeonheating.com/",
        rating: 4.3,
        totalreviews: 11,
        reviewslink:
          "https://www.google.com/maps/place/?q=place_id:ChIJq6qa5GZnzEwR2nYzIT6nEak",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        monday: "8:00 AM – 4:00 PM",
        tuesday: "8:00 AM – 4:00 PM",
        wednesday: "8:00 AM – 4:00 PM",
        thursday: "8:00 AM – 4:00 PM",
        friday: "8:00 AM – 4:00 PM",
        saturday: "Closed",
        sunday: "Closed",
        sitelink:
          "https://www.aeonheating.com/?utm_source=https://www.klimaanlagenfinder.de&utm_medium=website&utm_campaign=general",
        phonelink: "(315) 265-3744",
        emailaddress: "",
        emaillink: "",
        image: "",
      },
    },
  ];
  const url =
    "https://api.webflow.com/v2/collections/675fee9ed66623e9cfb33744/items";

  const postData = {
    items: testLocations,
  };

  console.log(postData);

  try {
    const response = await axios.post(url, postData, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Post created successfully:", response.data.items);
    // itemsId.push(response.data.id)
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response ? error.response.data : error.message
    );
  }
}

async function publishCollectionItem() {
  console.log("itemsId ", itemsId);
  const url =
    "https://api.webflow.com/v2/collections/6759955cc6851d70d6b59469/items/publish ";

  const postData = {
    itemIds: itemsId,
  };

  try {
    const response = await axios.post(url, postData, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Post publish successfully:", response.data);
  } catch (error) {
    console.error(
      "Error publish post:",
      error.response ? error.response.data : error.message
    );
  }
}

function createSlug(str) {
  return str
    .toLowerCase() // Переводить усі символи в нижній регістр
    .trim() // Видаляє зайві пробіли на початку і в кінці
    .replace(/[\s]+/g, "-") // Замінює всі пробіли на "-"
    .replace(/[^a-z0-9-]/g, ""); // Видаляє всі символи, крім букв, цифр і дефісу
}

function getIdByName(arr, name) {
  const item = arr.find((obj) => obj.name.toLowerCase() === name);
  return item ? item.id : null;
}
