const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const expectedDate = `${year}-${monthNumber.padStart(2, "0")}-${date.padStart(
    2,
    "0"
  )}`;

  await test.step("Открываем сайт", async () => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  await test.step("Открываем календарь", async () => {
    await page.locator(".react-date-picker__inputGroup").click();
  });

  await test.step("Переход к выбору года", async () => {
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
  });

  await test.step(`Выбор года: ${year}`, async () => {
    await page.getByText(year).click();
  });

  await test.step(`Выбор месяца: ${monthNumber}`, async () => {
    await page
      .locator(".react-calendar__year-view__months__month")
      .nth(Number(monthNumber) - 1)
      .click();
  });

  await test.step(`Выбор дня: ${date}`, async () => {
    await page.locator(`//abbr[text()='${date}']`).click();
  });

  await test.step("Проверка выбранной даты", async () => {
    const fullDateInput = page
      .locator(".react-date-picker__inputGroup input")
      .first();
    const actualValue = await fullDateInput.getAttribute("value");
    expect(actualValue).toEqual(expectedDate);
  });
});
