import axios from "axios";

const WEBFLOW_API_TOKEN =
  "9589fcc5c3365f96a330d763a34d7b908b95c22760a0ae9b24a70d94e6bd34d3";

export async function getLocations() {
  const url =
    "https://api.webflow.com/v2/collections/67595f51ff9dc33c60b6ed03/items";
  const headers = {
    Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
    "Accept-Version": "1.0.0",
  };

  try {
    const response = await axios.get(url, { headers });
    const items = response.data.items;
    const filteredItems = items.map((item) => ({
      id: item.id,
      name: item.fieldData?.name,
    }));
    console.log(filteredItems);

    return filteredItems;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}
