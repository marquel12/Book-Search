
// This file is used to make API calls to the Google Books API. The searchGoogleBooks function takes a query parameter and fetches the Google Books API with the query parameter as the search query. 
//The fetch function returns a promise that resolves to the response from the API, which can then be used to extract the data from the response.
export const searchGoogleBooks =  async (query: string) => {

  try {
    const response =await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
  
};
