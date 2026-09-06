1Fi Shop — Design Specification

1. Design Goal

Recreate and extend the existing 1Fi mobile Shop experience without redesigning its visual language.

The design should feel:

Clean

Premium

Finance-oriented

Mobile-first

Lightweight and easy to scan

Consistent with the existing 1Fi application

The Marketplace must feel like a native section of the existing Shop page, not a separate ecommerce website.

2. Device / Layout

Primary viewport

Mobile-first layout

Reference viewport: approximately 390 × 844 px

Content should remain usable on smaller mobile screens.

Desktop/tablet layouts may expand naturally but should preserve the mobile visual hierarchy.

Global layout

Full-height application shell

Light off-white / very light grey background

Fixed bottom navigation

Scrollable content area

Rounded cards throughout

Generous horizontal padding

Horizontal spacing

Main page padding: approximately 14–16 px

Card-to-card vertical spacing: approximately 14–22 px

Section heading spacing: approximately 18–24 px

3. Color System

Use the existing 1Fi visual language.

Primary

1Fi Purple: vivid purple / violet

Used for active navigation, CTAs, section accents and selected states.

Gradient

Primary promotional cards use a purple gradient:

Deep violet / purple

Transition toward brighter violet

Background

Very light cool grey / off-white

Approximately #F6F7FB in appearance

Cards

White

Subtle borders where needed

Soft shadows

Large corner radius

Text

Primary: near-black / dark navy

Secondary: muted grey

Accent: purple

Positive / EMI

Green used sparingly for:

Limit availability

EMI-related positive messaging

Small status indicators

4. Typography

Typography should match the existing application rather than introducing a new font system.

Hierarchy

Large promotional value

Example:
₹1,56,091

Very large

Bold / extra-bold

White on promotional cards

Promotional labels

Example:
REMAINING TO SPEND

Small

Bold

Uppercase

High contrast

Section headings

Examples:

EXCLUSIVE OFFERS

OUR BRAND PARTNERS

Style:

Purple

Uppercase

Small

Bold

Slight letter spacing

Each section heading has a small vertical purple indicator/bar on its left.

Body text

Dark primary text

Medium weight

Compact line height

Secondary text

Muted grey

Smaller than primary text

5. App Header

The Shop page begins with a compact top header.

Left

1Fi logo inside a purple rounded-square icon

1Fi

Small PAY badge

Right

Search icon button

Desktop button with monitor icon

Notification/bell button

Small purple notification indicator

Header behavior

Compact height

White/light background

Horizontally aligned

No oversized branding

6. Shop Category Navigation

Immediately below the header is a horizontally arranged segmented navigation.

Options:

Top Brands

Nearby Stores

1Fi Marketplace

Container

Rounded pill-like container

Very light grey background

Subtle border

Horizontal scrolling if required

Inactive items

Grey text

Grey icon

Active item

1Fi Marketplace

White/light card inside the segmented container

Purple text

Purple icon

Slight shadow/border

Clearly selected

Interaction

Tapping:

Top Brands → blank/placeholder page

Nearby Stores → blank/placeholder page

1Fi Marketplace → Marketplace implementation

7. Existing Shop Content

The existing Shop page should remain visually unchanged.

Available Limit Card

Large purple promotional card.

Content

Top-left:

Green pill: LIMIT AVAILABLE

Main value:

₹1,56,091

Below:

REMAINING TO SPEND

Top-right:

0%

INTEREST

Divider line

Bottom-left:

White rounded Shop now button

Bottom-right:

Green/purple EMI-related messaging:
Mutual Fund Backed EMIs

Shape

Large rounded corners

Approximately 22–26 px radius

Purple gradient

Soft purple shadow

Payment Reminder Card

White rounded card below the limit card.

Left:

Calendar icon in a light purple rounded-square container

Center:

Don't miss a payment

Secondary text:
Set autopay with UPI - Paytm, PhonePe, GPay

Right:

Purple outlined Setup button

This card should remain compact.

Exclusive Offers

Section title:
EXCLUSIVE OFFERS

Small purple vertical indicator on the left.

Below:

Large promotional carousel/card

Dark navy background

Product image on right

Promotional copy on left

Green EMI price/status pill

Carousel indicators near bottom

Example content:

EVERYDAY PRO PERFORMANCE

Get Your New Flagship for Work

Starts at ₹2,160/mo

The exact product/content can be mocked.

Our Brand Partners

Section title:
OUR BRAND PARTNERS

Horizontal brand cards.

Each card:

White background

Rounded corners

Brand logo/icon

Brand name underneath

Compact width

Horizontally scrollable

8. 1Fi Marketplace

This is the primary new functionality required by the assignment.

The Marketplace should inherit all existing visual principles.

Marketplace Home

Header

Back/navigation control if entering Marketplace as a separate route.

Title:
1Fi Marketplace

Optional supporting text:
Shop with flexible EMI options

Search

Rounded search field:

Search icon

Placeholder: Search products

Should support product filtering/search.

Categories

Horizontal scrolling category chips.

Suggested categories:

All

Mobiles

Laptops

TVs

Appliances

Accessories

Active category

Purple background or purple outline

White/purple high-contrast text depending on the selected-state design

Inactive category

White/light grey

Muted text

9. Product Listing

Products should be rendered from a data/API layer rather than being hardcoded directly into JSX/UI components.

Product Card

Each card should contain:

Image

Large product image

Contained within a clean light background

Consistent image area height

Product name

Bold

Maximum 2 lines

Price

Example:
₹79,999

EMI

Example:
EMI from ₹3,333/mo

Use green or purple accent for EMI messaging.

Optional metadata

Brand

Variant

Availability

Card style

White

Rounded corners

Subtle border/shadow

Compact spacing

A 2-column grid is preferred on mobile if it remains readable.

10. Product Details Screen

Selecting a product opens its details page.

Image Gallery

Large product image

Rounded image container

Thumbnail images below where applicable

Horizontal swipe support

Product Information

Display:

Product name

Brand

Rating/reviews if mock data exists

Price

EMI starting price

Short description

11. Product Variants

Where applicable, provide selectable variants.

Examples:

Storage

128 GB

256 GB

512 GB

Color

Black

Blue

Silver

Selected option:

Purple border

Light purple background

Strong text

Unselected option:

Neutral border

White background

Variant selection must update the selected product state.

12. EMI Plan Selection

This is a core Marketplace interaction.

Display a dedicated section:

Choose your EMI plan

Possible plans:

Duration

Monthly EMI

3 months

₹26,667/mo

6 months

₹13,334/mo

9 months

₹8,889/mo

12 months

₹6,667/mo

Values should come from product/EMI data, not be embedded directly in the component.

EMI Card

Each plan:

White background

Rounded corners

Border

Duration

Monthly EMI

Optional interest/fee information

Selected plan:

Purple border

Light purple background

Selected indicator/checkmark

Default to one sensible plan if appropriate.

13. Primary CTA

A fixed or prominent bottom CTA should be used on the product details screen.

Example:

Proceed with 12-month EMI

or

Continue with EMI

CTA:

Purple

White text

Full-width

Rounded

High visibility

The CTA should reflect the currently selected:

Product variant

EMI plan

14. Data Architecture

Do NOT hardcode product data directly into UI components.

Recommended structure:

src/
├── components/
├── pages/
├── services/
│ └── marketplaceApi.js
├── data/
│ └── marketplaceProducts.js
├── hooks/
└── ...

The exact structure should follow the existing project's architecture.

Product model

{
id,
name,
brand,
price,
images,
variants,
category,
description,
emiPlans
}

EMI model

{
months,
monthlyAmount,
interestRate,
processingFee
}

Mock APIs are acceptable.

Recommended logical endpoints:

GET /products
GET /products/:id
GET /products/:id/emi-plans

If no backend exists, implement equivalent asynchronous mock service functions.

15. State Management

Marketplace should maintain state for:

Products

Loading

Error

Search query

Selected category

Selected product

Selected variant

Selected EMI plan

Avoid unnecessary global state if local component state is sufficient.

16. Loading States

Marketplace must not immediately show a blank screen while data is loading.

Use:

Skeleton product cards

Skeleton image blocks

Skeleton text

Subtle loading indicators

Skeleton styling should match the existing rounded-card design.

17. Error States

If product data fails:

Display a clean state such as:

Couldn't load products

Supporting text:
Please try again.

CTA:
Retry

Do not expose raw API errors to users.

18. Empty States

For search/category filters with no products:

No products found

Supporting text:
Try another search or category.

Keep the state visually consistent with the app.

19. Responsive Behavior

Mobile

Primary target

2-column product grid where readable

Horizontal category scrolling

Full-width CTA

Compact cards

Bottom navigation remains fixed

Tablet

Wider product cards

2–3 column grid depending on available width

Desktop

Centered application container or appropriate existing desktop layout

More columns where appropriate

Preserve 1Fi's compact visual density

Do not turn the Marketplace into a generic desktop ecommerce site.

20. Navigation

Navigation should feel native to the existing application.

Expected flow:

Shop
↓
1Fi Marketplace
↓
Marketplace Home
↓
Product Card
↓
Product Details
↓
Select Variant
↓
Select EMI
↓
Proceed with EMI

Back navigation should return users to the previous Marketplace state where possible.

21. Interaction / Motion

Use subtle animations only.

Recommended:

Card press feedback

Selected variant transition

EMI selection transition

Page transition

Skeleton loading

Button state transitions

Avoid excessive animations.

The experience should feel:
smooth, fast, and premium.

22. Bottom Navigation

Existing bottom navigation should remain unchanged.

Current navigation:

Home

Shop — active

EMI Dues

Limit

Profile

Marketplace should not replace the existing bottom navigation.

23. Engineering Rules

Reuse existing 1Fi components wherever possible.

Reuse existing typography, colors, icons and spacing conventions.

Do not redesign unrelated Shop sections.

Keep Marketplace components modular.

Keep data separate from presentation.

Include loading states.

Include error states.

Include empty states.

Keep responsive behavior in mind.

Avoid unnecessary dependencies.

Keep the implementation easy to extend to a real backend.

Keep the code readable and production-oriented.

24. Visual Principles

The final implementation should preserve these characteristics visible in the reference:

Light neutral background

Strong purple brand accent

Rounded cards

Soft shadows

Compact mobile-first spacing

Clear visual hierarchy

Small uppercase purple section labels

White surfaces

Minimal borders

Purple primary CTAs

Green used for positive EMI/availability indicators

Horizontal scrolling sections

Fixed bottom navigation

Premium fintech aesthetic

The Marketplace should look like 1Fi built an ecommerce/EMI marketplace inside its existing app, not like a standalone ecommerce template.
