import axios from "axios";

const API_URL = "https://api.changenow.io/v1";
const API_KEY =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";

// Функция для получения доступных валют
export const getAvailableCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/currencies`, {
      params: { apiKey: API_KEY },
    });
    return response.data.slice(0, 5);
  } catch (error) {
    console.error("Ошибка при загрузке валют:", error);
    throw new Error("Ошибка при загрузке валют");
  }
};

// Функция для получения минимальной суммы обмена
export const getMinimalExchangeAmount = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(
      `${API_URL}/min-amount/${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}?api_key=${API_KEY}`
    );
    return response.data.minAmount;
  } catch (error) {
    console.error("Ошибка при получении минимальной суммы обмена:", error);
    throw new Error("Ошибка при получении минимальной суммы обмена");
  }
};

// Функция для получения расчетной суммы обмена
export const fetchEstimatedAmount = async (
  amount,
  fromCurrency,
  toCurrency
) => {
  try {
    const response = await axios.get(
      `${API_URL}/exchange-amount/${amount}/${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}?api_key=${API_KEY}`
    );
    return response.data.estimatedAmount;
  } catch (error) {
    console.error("Ошибка при получении ожидаемой суммы обмена:", error);
    throw new Error("Ошибка при получении ожидаемой суммы обмена");
  }
};
