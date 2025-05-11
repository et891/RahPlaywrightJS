import { expect, Page, Locator } from "@playwright/test";

/**
 * Сортирует таблицу по указанному имени столбца и направлению.
 *
 * @param page - Страница Playwright.
 * @param tableLocator - Локатор таблицы.
 * @param columnName - Название столбца, по которому нужно отсортировать.
 * @param order - Направление сортировки: 'asc' (1 клик) или 'desc' (2 клика). По умолчанию 'asc'.
 */
export async function sortBy(
  page: Page,
  tableLocator: Locator,
  columnName: string,
  order: "asc" | "desc" = "asc"
): Promise<void> {
  page.setDefaultTimeout(7000);

  const headerCells = tableLocator.locator("thead tr th");
  const count = await headerCells.count();

  for (let i = 0; i < count; i++) {
    const text = await headerCells.nth(i).innerText();
    if (text.trim() === columnName) {
      const clicks = order === "asc" ? 1 : 2;
      for (let j = 0; j < clicks; j++) {
        await headerCells.nth(i).click();
        await page.waitForTimeout(300); // небольшой интервал между кликами
      }
      return;
    }
  }

  throw new Error(`Столбец с названием "${columnName}" не найден.`);
}
