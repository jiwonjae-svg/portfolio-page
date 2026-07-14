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

    await expect(page).toHaveTitle('WONJIP CHOI | TypeScript Full-Stack + AI Workflow Engineer');
    await expect(page.getByRole('heading', { name: 'TypeScript full-stack systems with proof.' })).toBeVisible();
    const hiringEvidenceLink = page.getByRole('link', { name: 'View hiring evidence' });
    await expect(hiringEvidenceLink).toBeVisible();

    const candidateFacts = page.getByTestId('candidate-facts');
    await expect(candidateFacts).toBeVisible();
    await expect(candidateFacts).toContainText('Work visa sponsorship required');
    await expect(candidateFacts).toContainText('4+ years professional engineering experience');

    const box = await candidateFacts.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(720);

    const linkBox = await hiringEvidenceLink.boundingBox();
    const previewBox = await page.getByTestId('hiring-evidence-preview-shell').boundingBox();
    expect(linkBox).not.toBeNull();
    expect(previewBox).not.toBeNull();
    expect(linkBox!.y + linkBox!.height).toBeLessThanOrEqual(720);
    expect(linkBox!.y + linkBox!.height).toBeLessThanOrEqual(previewBox!.y);
    await expect(page.getByRole('navigation', { name: 'Portfolio sections' })).toBeHidden();

    await hiringEvidenceLink.click();
    await expect(page).toHaveURL(/#featured-projects$/);
    await expect
      .poll(async () => {
        const header = await page.locator('nav.fixed.top-0').boundingBox();
        const target = await page.locator('#featured-projects').boundingBox();
        return header && target ? target.y - (header.y + header.height) : -1;
      })
      .toBeGreaterThanOrEqual(0);

    await expectNoHorizontalOverflow(page);
  });

  test('keeps fixed navigation clear of anchor targets', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    for (const { targetId } of [
      { targetId: 'recruiter-snapshot' },
      { targetId: 'featured-projects' },
      { targetId: 'japan-readiness' },
      { targetId: 'contact' },
    ]) {
      await page.locator('nav.fixed.top-0').locator(`a[href="#${targetId}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`#${targetId}$`));
      await expect
        .poll(async () => {
          const header = await page.locator('nav.fixed.top-0').boundingBox();
          const target = await page.locator(`#${targetId}`).boundingBox();
          return header && target ? target.y - (header.y + header.height) : -1;
        })
        .toBeGreaterThanOrEqual(0);
    }
  });

  test('fills a wide first viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 2048, height: 1080 });
    await page.goto('/');

    await expect(page.getByTestId('candidate-facts')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('keeps the mobile first viewport usable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'TypeScript full-stack systems with proof.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View hiring evidence' })).toBeVisible();
    await expect(page.getByTestId('candidate-facts')).toContainText('Korea-based');
    await expectNoHorizontalOverflow(page);
  });

  test('switches role review paths without losing project evidence', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#target-roles');

    await page.getByRole('tab', { name: /Workflow \/ Reliability/ }).click();
    await expect(page.getByRole('tabpanel', { name: /Workflow \/ Reliability/ })).toContainText(
      'OpsFlow -> DocuMind -> Paste Guardian',
    );
    await expect(page.getByText('deterministic deploy decision states')).toBeVisible();
  });

  test('shows implemented, verified, and future scope inside DocuMind details', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#featured-projects');

    const trigger = page.getByRole('button', { name: 'Open DocuMind project details' });
    await trigger.focus();
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: 'DocuMind' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close DocuMind details' })).toBeFocused();
    await expect(dialog.getByText('Personal portfolio project')).toBeVisible();
    await expect(dialog.getByText('no company production users or team deployment claimed')).toBeVisible();
    await expect(dialog.getByText('Implemented')).toBeVisible();
    await expect(dialog.getByText('Verified')).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Future' })).toBeVisible();
    await expect(dialog.getByText('Owner-scoped retrieval')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('keeps project actions semantically separate and headings named', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#featured-projects');

    const docuMindCard = page.getByTestId('project-card-8');
    await expect(docuMindCard.getByRole('button', { name: 'Open DocuMind project details' })).toBeVisible();
    const particleVerseCard = page.getByTestId('project-card-3');
    await expect(particleVerseCard.getByText('released', { exact: true })).toBeVisible();
    await expect(docuMindCard.getByRole('link', { name: 'Open DocuMind source on GitHub' })).toBeVisible();
    await expect(
      page.getByTestId('project-card-9').getByRole('link', { name: 'Open OpsFlow Command Center source on GitHub' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/jiwonjae-svg/portfolio-page/blob/main/components/OpsFlowCommandCenter.tsx',
    );
    expect(await docuMindCard.locator('[role="button"] a, [role="button"] button').count()).toBe(0);

    for (const headingName of ['Target Roles', 'Japan Readiness', 'Featured Projects']) {
      await expect(page.getByRole('heading', { name: headingName })).toHaveCount(1);
    }

    const unnamedHeadings = await page.locator('h1, h2, h3, h4').evaluateAll((headings) =>
      headings.filter((heading) => !(heading.textContent || '').trim()).length,
    );
    expect(unnamedHeadings).toBe(0);
  });

  test('exposes accessible contact fields and a resume request path', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/#contact');

    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message', { exact: true })).toHaveAttribute('aria-describedby', 'contact-message-count');
    await expect(page.getByRole('link', { name: 'Request résumé / 職務経歴書' })).toHaveAttribute(
      'href',
      /subject=Resume%20request/,
    );
  });

  test('keeps card surfaces stable while scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const previewShell = page.getByTestId('hiring-evidence-preview-shell');
    await expect(previewShell).toHaveCSS('background-color', 'rgba(5, 7, 11, 0.72)');

    const docuMindCard = page.getByTestId('project-card-8');
    await docuMindCard.scrollIntoViewIfNeeded();
    await page.mouse.move(640, 450);

    for (const delta of [180, -120, 160, -80]) {
      await page.mouse.wheel(0, delta);
      await page.waitForTimeout(80);
      await expect(docuMindCard).toHaveCSS('opacity', '1');
    }

    await expect(
      docuMindCard.getByRole('button', { name: 'Show DocuMind preview 1' }),
    ).toHaveAttribute('aria-pressed', 'true');

    const objectFits = await docuMindCard.locator('img').evaluateAll((images) =>
      images.map((image) => getComputedStyle(image).objectFit),
    );
    expect(new Set(objectFits)).toEqual(new Set(['cover']));
  });
});
