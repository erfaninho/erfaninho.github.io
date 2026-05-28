# Testing Checklist

Use this list before publishing changes to the portfolio site.

## Automated Checks

- [ ] Install dependencies with `npm install` if dependencies changed.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Run `npm run preview` and spot-check the production build.

## Home Page

- [ ] Header links scroll or navigate to the correct sections.
- [ ] GitHub and LinkedIn icon buttons open the correct URLs.
- [ ] Theme toggle switches between light and dark modes without layout shifts.
- [ ] Hero portrait loads and keeps the correct aspect ratio.
- [ ] Hero metric magnifier appears on all four metric boxes.
- [ ] The metric magnifier replaces the cursor inside the metric boxes.
- [ ] The first metric box shows the same complete magnifier body and handle as the other three boxes.
- [ ] The magnified content stays aligned under the glass near card edges and corners.
- [ ] Background visual effects remain subtle and do not block text or clicks.

## Projects

- [ ] Project filter tags show the correct project cards.
- [ ] Selecting `all` restores every project.
- [ ] Project thumbnails load for all project cards.
- [ ] Project thumbnails look visually distinct and match their project concepts.
- [ ] Project text, role, outcome, and bullet lists remain readable on mobile and desktop.

## Sections

- [ ] Overview content is readable and does not overlap decorative elements.
- [ ] Experience timeline entries stay aligned at desktop and mobile widths.
- [ ] Studies cards keep consistent spacing and hierarchy.
- [ ] Skills groups are scannable and do not overflow their containers.
- [ ] Footer links and contact calls to action work.

## Contact Page

- [ ] Contact page loads through `/#/contact`.
- [ ] Email action opens a prefilled email draft.
- [ ] GitHub, LinkedIn, and repository links point to the configured URLs.
- [ ] Back/navigation controls return to the home page correctly.

## Responsive Layout

- [ ] Test at 375px, 768px, 1024px, and 1440px widths.
- [ ] No text overlaps neighboring content.
- [ ] Buttons keep icons and labels aligned.
- [ ] Project cards and metric cards remain usable on touch devices.
- [ ] Sticky header does not cover section headings after navigation.

## Accessibility

- [ ] Page can be navigated with keyboard only.
- [ ] Focus outlines are visible on links, buttons, filters, and theme toggle.
- [ ] Interactive controls have readable labels or accessible names.
- [ ] Images have useful alt text or are decorative where appropriate.
- [ ] Color contrast is readable in both light and dark modes.
- [ ] Motion effects do not make the page difficult to read.

## Deployment

- [ ] `dist/` is generated successfully by `npm run build`.
- [ ] GitHub Pages base paths work after deployment.
- [ ] Refreshing `/#/`, `/#/contact`, and section hash URLs does not break routing.
- [ ] Published site uses the expected profile, project, and contact configuration.
