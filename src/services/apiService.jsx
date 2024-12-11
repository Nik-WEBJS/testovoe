import axios from "axios";

const API_KEY =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";

const API_URL = "https://api.changenow.io/v1";

// Метод для получения списка доступных валют
export const getAvailableCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/currencies`, {
      params: { apiKey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении валют:", error);
    throw error;
  }
};

// Метод для получения минимальной суммы обмена
// export const getMinimalExchangeAmount = async (fromCurrency, toCurrency) => {
//   try {
//     const response = await axios.get(`${API_URL}/minimal-amount`, {
//       params: { from: fromCurrency, to: toCurrency, apiKey: API_KEY },
//     });
//     return response.data.minAmount;
//   } catch (error) {
//     console.error("Ошибка при получении минимальной суммы обмена:", error);
//     throw error;
//   }
// };

// // Метод для получения ожидаемой суммы обмена
// export const getEstimatedExchangeAmount = async (
//   fromCurrency,
//   toCurrency,
//   amount
// ) => {
//   try {
//     const response = await axios.get(`${API_URL}/estimated-amount`, {
//       params: {
//         from: fromCurrency,
//         to: toCurrency,
//         amount: amount,
//         apiKey: API_KEY,
//       },
//     });
//     return response.data.estimatedAmount;
//   } catch (error) {
//     console.error("Ошибка при получении ожидаемой суммы обмена:", error);
//     throw error;
//   }
// };
