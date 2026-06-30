import { expect, type Page, test } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1 || document.body.scrollWidth > document.body.clientWidth + 1;
  });

  expect(hasOverflow).toBe(false);
}

test.describe('portfolio recruiter path', () => {
  test('keeps the desktop hero evidence visible at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await expect(page).toHaveTitle('Jiwonjae | AI-Enabled Full-Stack Engineer');
    await expect(page.getByRole('heading', { name: 'AI-enabled full-stack engineer for working systems.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Hiring Evidence' })).toBeVisible();

    const firstStat = page
      .locator('section')
      .first()
      .locator('.console-panel')
      .filter({ hasText: 'Portfolio Projects' });
    await expect(firstStat).toBeVisible();

    const box = await firstStat.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(720);

    await expectNoHorizontalOverflow(page);
  });

  test('fills a wide first viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 2048, height: 1080 });
    await page.goto('/');

    const heroGrid = page.locator('section:first-of-type > div').first();
    const gridBox = await heroGrid.boundingBox();

    expect(gridBox).not.toBeNull();
    expect(gridBox!.width).toBeGreaterThan(1800);
    expect(gridBox!.x).toBeLessThan(120);
    await expectNoHorizontalOverflow(page);
  });

  test('keeps the mobile first viewport usable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'AI-enabled full-stack engineer for working systems.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Hiring Evidence' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('switches role review paths without losing project evidence', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#target-roles');

    await page.getByRole('tab', { name: /Workflow \/ Reliability/ }).click();
    await expect(page.getByRole('tabpanel', { name: 'Workflow / Reliability' })).toContainText(
      'OpsFlow -> DocuMind -> Paste Guardian',
    );
    await expect(page.getByText('deterministic deploy decision states')).toBeVisible();
  });

  test('shows implemented, verified, and future scope inside DocuMind details', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#featured-projects');

    await page.getByRole('button', { name: 'Open DocuMind project details' }).click();

    const dialog = page.getByRole('dialog', { name: 'DocuMind' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Implemented')).toBeVisible();
    await expect(dialog.getByText('Verified')).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Future' })).toBeVisible();
    await expect(dialog.getByText('Owner-scoped retrieval')).toBeVisible();
  });
});
