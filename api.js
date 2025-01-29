import axios from "axios";

// Base URL of your backend
const BASE_URL = "http://192.168.151.250:8000";
const PYTHONURL = "https://know-code-byte-zeta-backend-41c0dpcnv-suuummiiits-projects.vercel.app" ; 


// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Example: User registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

// Example: User login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

// Example: Fetch user profile
export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};


export const generateDiet = async (data) => {
  try {
    // Make the API call
    const response = await axios.post(`${PYTHONURL}/plan_diet`, data);

    // Extract data from the response
    const nutritionalInfoJson = response.data[0];  // The JSON string containing the nutritional information
    const mealSuggestions = response.data[1];  // The meal suggestions array

    // Parse the JSON string to an object
    const nutritionalInfo = JSON.parse(nutritionalInfoJson);

    // Log the parsed nutritional info to verify it's correct
    console.log('Nutritional Info:', nutritionalInfo);
    console.log('Meal Suggestions:', mealSuggestions);

    // Prepare the response to match the structure expected by the Redux store
    const formattedResponse = {
      nutrients:  nutritionalInfo , 
      //  {
        // calories: nutritionalInfo.Calories,
        // proteins: nutritionalInfo.Proteins,
        // carbohydrates: nutritionalInfo.Carbohydrates,
        // fats: nutritionalInfo.Fats,
        // fiber: nutritionalInfo.Fiber || 0,  // Add fiber if available
        // iron: nutritionalInfo.Iron || 0,    // Add iron if available
        // sodium: nutritionalInfo.Sodium || 0, // Add sodium if available
        // sugar: nutritionalInfo.Sugar || 0,  // Add sugar if available
        // vitaminA: nutritionalInfo['Vitamin A'] || 0, // Handle Vitamin A
        // vitaminB12: nutritionalInfo['Vitamin B12'] || 0, // Handle Vitamin B12
        // vitaminC: nutritionalInfo['Vitamin C'] || 0, // Handle Vitamin C
        
      // },
      mealSuggestions: mealSuggestions,  // Directly use the meal suggestions array from the response
    };

    // Log the formatted response to verify it's in the correct shape
    console.log("Formatted Response:", formattedResponse);

    // Return the structured response
    return formattedResponse;

  } catch (error) {
    console.error('Error generating diet:', error);
    return null;  // Return null or handle error accordingly
  }
};

export default api;
