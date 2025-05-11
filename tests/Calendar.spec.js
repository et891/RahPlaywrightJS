const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const expectedList = [monthNumber, date, year];

  await test.step("Открываем страницу", async () => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  await test.step("Открываем календарь", async () => {
    await page.locator(".react-date-picker__inputGroup").click();
  });

  await test.step("Переходим к выбору года", async () => {
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
  });

  await test.step(`Выбираем год: ${year}`, async () => {
    await page.getByText(year).click();
  });

  await test.step(`Выбираем месяц: ${monthNumber}`, async () => {
    await page
      .locator(".react-calendar__year-view__months__month")
      .nth(Number(monthNumber) - 1)
      .click();
  });

  await test.step(`Выбираем день: ${date}`, async () => {
    await page.locator(`//abbr[text()='${date}']`).click();
  });

  await test.step("Проверяем введённую дату", async () => {
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < (await inputs.count()); index++) {
      const value = await inputs.nth(index).getAttribute("value");
      expect(value).toEqual(expectedList[index]);
    }
  });
});
