<script setup lang="ts">
import { options, sizeLabel, type Currency } from './prices'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  // GitHub Pages serves the site under /<repo>/, so prefix the base URL
  link: [{ rel: 'icon', href: `${useRuntimeConfig().app.baseURL}favicon.ico` }],
  htmlAttrs: { lang: 'en' }
})
useSeoMeta({ title: 'Mac Storage Price Calculator', description: 'What Apple charges per GB for Mac storage upgrades, in USD and TWD.' })

const currencies = [
  { label: 'USD (Apple US)', value: 'usd' },
  { label: 'TWD (Apple TW)', value: 'twd' }
]
const currency = ref<Currency>('twd')
const selected = ref('MacBook Air (M5) 1000')
const amount = ref<number | null>(1000)
const unit = ref<'GB' | 'TB'>('GB')
// 1TB = 1000GB, as Apple counts it
const gb = computed(() => (amount.value || 0) * (unit.value === 'TB' ? 1000 : 1))
// keep the same storage when the unit changes: 1000 GB becomes 1 TB
watch(unit, u => amount.value &&= u === 'TB' ? amount.value / 1000 : amount.value * 1000)

// en-US writes TWD as NT$, so it can't be mixed up with USD
const money = computed(() => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency.value.toUpperCase(),
  maximumFractionDigits: 2
}))

const list = computed(() => options(currency.value))
// group the options by product for the menu
const items = computed(() => Object.values(Object.groupBy(list.value, o => o.product)).map(group => [
  { type: 'label' as const, label: group![0]!.product, id: group![0]!.product },
  ...group!.map(o => ({ ...o, label: `${o.product} ${sizeLabel(o.from)} → ${sizeLabel(o.to)} · ${money.value.format(o.perGB)}/GB` }))
]))
const option = computed(() => list.value.find(o => o.id === selected.value)!)
</script>

<template>
  <UApp>
    <UHeader title="Mac Storage Price Calculator">
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <UContainer class="max-w-2xl space-y-6 py-8">
        <UCard :ui="{ body: 'space-y-6' }">
          <UTabs
            v-model="currency"
            :items="currencies"
            :content="false"
            class="w-full"
          />

          <UFormField
            label="Price based on"
            size="xl"
          >
            <USelectMenu
              v-model="selected"
              :items="items"
              value-key="id"
              class="w-full"
            >
              <template #item-label="{ item }">
                <template v-if="'perGB' in item">
                  {{ sizeLabel(item.from) }} → {{ sizeLabel(item.to) }}
                  <span class="text-muted">(+{{ money.format(item.price) }})</span>
                </template>
              </template>
              <template #item-trailing="{ item }">
                <span
                  v-if="'perGB' in item"
                  class="font-mono text-sm"
                >{{ money.format(item.perGB) }}/GB</span>
              </template>
            </USelectMenu>
          </UFormField>

          <UFormField
            label="Storage"
            size="xl"
          >
            <UFieldGroup class="w-full">
              <UInputNumber
                v-model="amount"
                :min="0"
                :step="unit === 'TB' ? 1 : 100"
                class="w-full"
              />
              <USelect
                v-model="unit"
                :items="['GB', 'TB']"
                aria-label="Unit"
                class="w-24"
              />
            </UFieldGroup>
          </UFormField>
        </UCard>

        <UCard :ui="{ body: 'space-y-1 text-center' }">
          <p class="text-4xl font-semibold">
            {{ money.format(gb * option.perGB) }}
          </p>
          <p class="text-muted">
            {{ money.format(option.perGB) }}/GB · +{{ money.format(option.price) }} for {{ option.to - option.from }}GB
          </p>
        </UCard>
      </UContainer>
    </UMain>
  </UApp>
</template>
