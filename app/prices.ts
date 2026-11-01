// Storage upgrade prices from apple.com/shop (USD) and apple.com/tw/shop (TWD), read 2026-11-02.
// Each price is added to the product's base storage (the first tier, always 0).
// Prices are the same for every color, screen size and display finish of a product.
export const products = [
  { name: 'MacBook Neo', tiers: [256, 512], usd: [0, 100], twd: [0, 3000] },
  { name: 'MacBook Air (M5)', tiers: [512, 1000, 2000, 4000], usd: [0, 300, 800, 1800], twd: [0, 10500, 28000, 63000] },
  { name: 'MacBook Pro (M6)', tiers: [1000, 2000, 4000], usd: [0, 500, 1500], twd: [0, 17500, 52500] },
  { name: 'MacBook Pro (M5 Pro)', tiers: [1000, 2000, 4000], usd: [0, 500, 1500], twd: [0, 17500, 52500] },
  { name: 'MacBook Pro (M5 Max)', tiers: [2000, 4000, 8000], usd: [0, 1000, 3000], twd: [0, 35000, 105000] },
  { name: 'MacBook Pro PROLED XDR (M5 Pro)', tiers: [1000, 2000, 4000], usd: [0, 500, 1500], twd: [0, 17500, 52500] },
  { name: 'MacBook Pro PROLED XDR (M5 Max)', tiers: [2000, 4000, 8000, 16000], usd: [0, 1000, 3000, 7000], twd: [0, 35000, 105000, 245000] },
  { name: 'iMac (M6)', tiers: [256, 512, 1000, 2000], usd: [0, 200, 500, 1000], twd: [0, 7000, 17500, 35000] },
  { name: 'Mac mini (M6)', tiers: [256, 512, 1000, 2000], usd: [0, 200, 500, 1000], twd: [0, 7000, 17500, 35000] },
  { name: 'Mac mini (M5 Pro)', tiers: [512, 1000, 2000, 4000, 8000], usd: [0, 300, 800, 1800, 3800], twd: [0, 10500, 28000, 63000, 133000] },
  { name: 'Mac Studio (M5 Max)', tiers: [512, 1000, 2000, 4000, 8000], usd: [0, 300, 800, 1800, 3800], twd: [0, 10500, 28000, 63000, 133000] },
  { name: 'Mac Studio (M5 Ultra)', tiers: [1000, 2000, 4000, 8000, 16000], usd: [0, 500, 1500, 3500, 7500], twd: [0, 17500, 52500, 122500, 262500] }
]

export type Currency = 'usd' | 'twd'

// Apple sells storage in decimal units: 1TB = 1000GB
export const sizeLabel = (gb: number) => (gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`)

// One entry per paid storage option: the upgrade price divided by the GB it adds over the base
export function options(currency: Currency) {
  return products.flatMap(p => p.tiers.slice(1).map((gb, i) => ({
    id: `${p.name} ${gb}`,
    product: p.name,
    from: p.tiers[0]!,
    to: gb,
    price: p[currency][i + 1]!,
    perGB: p[currency][i + 1]! / (gb - p.tiers[0]!)
  })))
}
