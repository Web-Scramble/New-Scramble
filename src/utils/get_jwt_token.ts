import { getItemFromLocalStorage } from "./localStorage"
import { TOKEN } from "@/constants/keys"

 export const getJwtToken = () => {
    return getItemFromLocalStorage(TOKEN)
}