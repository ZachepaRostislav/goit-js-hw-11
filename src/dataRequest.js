import axios from "axios";

export default async function dataRequest(value, page) {

  const API_KEY = '34723066-8d4f91c8f936e3aca5c8bd269'
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios({
      method: 'GET',
      url: BASE_URL,
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

