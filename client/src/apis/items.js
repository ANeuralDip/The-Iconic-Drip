import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000
});

export const getItems = async (type, gender) => {
    var typeQuery = type ? `type=${type}` : '';
    var genderQuery = gender ? `category=${gender}` : '';
    try{
        const response = await api.get(`/items?${genderQuery}&${typeQuery}`);//perform the get request, gathering all the database values
        let data = response.data;
        return data;
    } catch (err) {
        console.error(err);
    }
}