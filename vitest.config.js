export default {
  test: {
    globals: true,
    environment: "jsdom", // Использование jsdom для браузерного окружения
    coverage: {
      reporter: ["text", "html"], // Отчёт о покрытии
    },
  },
};
