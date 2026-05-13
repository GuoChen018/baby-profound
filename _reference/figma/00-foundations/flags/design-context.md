# Flags — `1:4271`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Flags"

> Note: `get_design_context` returned only sparse metadata (the frame is too large for full code). The metadata below is itself the complete inventory and is sufficient — there's no need to recurse into sublayers since each flag is a leaf SVG symbol.

## Interpretation summary

The Flags frame is a **16×16 country-flag icon set** covering ~250 entities (countries + territories + supranational bodies like EU, UN, NATO). Every entry is a Figma component instance whose name is `Name=<Country>`. Profound uses this in geo selection UIs (likely the country/locale picker on Search/Visibility queries) and probably in country-of-origin chips on data tables.

Implementation note: at 16×16 these are PNG-rendered country flags (not generated SVG). Best translation:

1. Use a small flag library — recommended **`circle-flags`** (CSS) or **`country-flag-icons`** (npm) for ISO-2 lookup.
2. Or vendor a single sprite SVG / use unicode flag emoji where polish isn't critical.
3. Profound's set includes some non-ISO entries (Kosovo, Somaliland, Transnistria, Easter Island, EU, UN, NATO) — those need custom assets if you go the standard-library route.

## Coverage (from frame metadata)

**Total**: ~252 flag instances across 8 rows × 26 columns at 16×16px (with ~56px column pitch in the frame).

### Geographies (by region)

- **Africa** (52): Algeria, Angola, Benin, Botswana, Burkina Faso, Burundi, Cameroon, Cabo Verde, Central African Republic, Chad, Comoros, Congo, Congo (Democratic Republic), Côte d'Ivoire, Djibouti, Egypt, Equatorial Guinea, Eritrea, Eswatini, Ethiopia, Gabon, Gambia, Ghana, Guinea, Guinea-Bissau, Kenya, Lesotho, Liberia, Libya, Madagascar, Malawi, Mali, Mauritania, Mauritius, Morocco, Mozambique, Namibia, Niger, Nigeria, Rwanda, São Tomé and Príncipe, Senegal, Seychelles, Sierra Leone, Somalia, Somaliland, South Africa, South Sudan, Sudan, Tanzania, Togo, Tunisia, Uganda, Zambia, Zimbabwe, Western Sahara
- **Americas** (47): Antigua and Barbuda, Argentina, Aruba, Bahamas, Barbados, Belize, Bermuda, Bolivia (Plurinational State of), Bonaire, Brazil, Canada, Cayman Islands, Chile, Colombia, Costa Rica, Cuba, Curaçao, Dominica, Dominican Republic, Easter Island, Ecuador, El Salvador, Falkland Islands (Malvinas), French Guiana, Greenland, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica, Martinique, Mexico, Montserrat, Nicaragua, Panama, Paraguay, Peru, Puerto Rico, Saint Barthélemy, Saint Kitts and Nevis, Saint Lucia, Saint Martin (French part), Saint Pierre and Miquelon, Saint Vincent and the Grenadines, Sint Maarten (Dutch part), Suriname, Trinidad and Tobago, Turks and Caicos Islands, United States of America, Uruguay, Venezuela (Bolivarian Republic of), Virgin Islands (British), Virgin Islands (U.S.)
- **Asia** (49): Afghanistan, Armenia, Azerbaijan, Bahrain, Bangladesh, Bhutan, British Indian Ocean Territory, Brunei Darussalam, Cambodia, China, Christmas Island, Cocos (Keeling) Islands, Cyprus, Georgia, Hong Kong, India, Indonesia, Iran (Islamic Republic of), Iraq, Israel, Japan, Jordan, Kazakhstan, Korea (North), Korea (South), Kuwait, Kyrgyzstan, Lao People's Democratic Republic, Lebanon, Macao, Malaysia, Maldives, Mongolia, Myanmar, Nepal, Oman, Pakistan, Palestine, Philippines, Qatar, Saudi Arabia, Singapore, Sri Lanka, Syrian Arab Republic, Taiwan, Tajikistan, Thailand, Timor-Leste, Turkey, Turkmenistan, United Arab Emirates, Uzbekistan, Viet Nam, Yemen
- **Europe** (50): Åland Islands, Albania, Andorra, Austria, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Czechia, Denmark, Estonia, Faroe Islands, Finland, France, Germany, Gibraltar, Greece, Guernsey, Holy See, Hungary, Iceland, Ireland, Isle of Man, Italy, Jersey, Kosovo, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Réunion, Romania, Russian Federation, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Transnistria, Ukraine, United Kingdom of Great Britain and Northern Ireland
- **Oceania** (25): American Samoa, Australia, Cook Islands, Fiji, French Polynesia, Guam, Kiribati, Marshall Islands, Micronesia (Federated States of), Nauru, New Caledonia, New Zealand, Niue, Norfolk Island, Northern Mariana Islands, Palau, Papua New Guinea, Pitcairn, Samoa, Solomon Islands, Tokelau, Tonga, Tuvalu, Vanuatu, Wallis and Futuna
- **Antarctica/Polar** (3): Antarctica, French Southern Territories, South Georgia and the South Sandwich Islands, Mayotte
- **Supranational / non-state** (3): European Union, United Nations, Nato

> Component naming pattern: `Name=United States of America`, `Name=Korea (South)`, `Name=Côte d'Ivoire`, `Name=Lao People's Democratic Republic` — uses ISO long-form names with parenthetical disambiguation.

## Asset URLs (7-day expiry)

- Screenshot: `https://www.figma.com/api/mcp/asset/6662a1da-3732-49b2-aa93-87dea9cb5035` (1500×872 PNG)
