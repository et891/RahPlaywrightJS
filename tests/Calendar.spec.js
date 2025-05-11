const { test, expect } = require("@playwright/test");
const { allure } = require("allure-playwright");

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const expectedDate = `${year}-${monthNumber.padStart(2, "0")}-${date.padStart(
    2,
    "0"
  )}`;

  await allure.step("Открываем сайт", async () => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  await allure.step("Открываем календарь", async () => {
    await page.locator(".react-date-picker__inputGroup").click();
  });

  await allure.step("Переход к выбору года", async () => {
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
  });

  await allure.step(`Выбор года: ${year}`, async () => {
    await page.getByText(year).click();
  });

  await allure.step(`Выбор месяца: ${monthNumber}`, async () => {
    await page
      .locator(".react-calendar__year-view__months__month")
      .nth(Number(monthNumber) - 1)
      .click();
  });

  await allure.step(`Выбор дня: ${date}`, async () => {
    await page.locator(`//abbr[text()='${date}']`).click();
  });

  await allure.step("Проверка даты", async () => {
    const value = await page
      .locator(".react-date-picker__inputGroup input")
      .first()
      .getAttribute("value");
    expect(value).toEqual(expectedDate);
  });
});
