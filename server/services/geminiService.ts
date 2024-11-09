import axios from 'axios';

const GEMINI_API_URL = 'https://api.gemini.com/v1/gemini-1.5-flash';
const GEMINI_API_KEY=process.env.GEMINI_API_KEY;

interface RecipeRequest{
    ingredients: string[];
}

interface RecipeResponse{
    title:string;
    instructions:string;
    ingredients:string[];
}

interface HealthSuggestionRequest{
    foodConsumed: string;
}

interface HealthSuggestionResponse{
    suggestions: string[];
}

export const generateRecipe = async(recipeRequest: RecipeRequest): Promise<RecipeResponse | null> => {
    try{
        const response = await axios.post(`${GEMINI_API_URL}generate_recipe`, recipeRequest,{
            headers:{
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
            },
        });
        return response.data;
    }catch(error){
        console.error(`Error fetching recipe data ${error}`);
        return null;
    }
};

export const getHealthSuggestions = async (request: HealthSuggestionRequest): Promise<HealthSuggestionResponse | null> => {
    try {
      const response = await axios.post(`${GEMINI_API_URL}health-suggestions`, request, {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error getting health suggestions:', error);
      return null;
    }
  };
