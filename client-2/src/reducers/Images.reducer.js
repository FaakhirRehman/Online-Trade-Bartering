const initState = [];
const imageReducer = async (state = initState, action) => {
  switch (action.type) {
    case 'APP_IMAGES':
      const resp = await fetch(
        `https://api.unsplash.com/search/photos?query=${action.payload} items`,
        {
          headers: {
            Authorization: `Client-ID 1I557UxM0SGd2-v1znBsHNC8A1wOo_hAtC9cPPS79zQ`,
          },
        }
      );
      const { results } = await resp.json();
      const { urls } = results[0];

      return urls;

    default:
      return state;
  }
};
export default imageReducer;
