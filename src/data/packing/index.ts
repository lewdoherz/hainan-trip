import type { PackSection } from '../types';
import { SECTIONS as DOCUMENT_SECTIONS } from './documents';
import { SECTIONS as ADULT_SECTIONS } from './adults';
import { SECTIONS as CHILD_SECTIONS } from './children';
import { SECTIONS as BAG_SECTIONS } from './bags';
import { SECTIONS as MEDICAL_SECTIONS } from './medical';
import { SECTIONS as PRACTICAL_SECTIONS } from './practical';

const ALL: PackSection[] = [
  ...DOCUMENT_SECTIONS,
  ...ADULT_SECTIONS,
  ...CHILD_SECTIONS,
  ...BAG_SECTIONS,
  ...MEDICAL_SECTIONS,
  ...PRACTICAL_SECTIONS,
];

/**
 * The order of sections in the family's own packing list, so the app reads
 * like the document it came from.
 */
const ORDER = [
  'docs',
  'dad',
  'mom',
  'toddler',
  'baby',
  'cabin',
  'day-bag',
  'beach-bag',
  'medical',
  'buy-sanya',
  'sleep',
  'night-before-departure',
  'strategy',
  'top10',
];

const byId = new Map<string, PackSection>();
for (const section of ALL) {
  if (byId.has(section.id)) throw new Error(`Duplicate packing section id: ${section.id}`);
  byId.set(section.id, section);
}

const missing = ORDER.filter((id) => !byId.has(id));
const unlisted = ALL.map((s) => s.id).filter((id) => !ORDER.includes(id));
if (missing.length) throw new Error(`Packing sections missing: ${missing.join(', ')}`);
if (unlisted.length) throw new Error(`Packing sections not in ORDER: ${unlisted.join(', ')}`);

/**
 * Checkbox state is keyed on the item id, so a duplicate id would silently tie
 * two rows to one tick. Fail loudly instead.
 */
const seen = new Set<string>();
for (const section of ALL) {
  for (const group of section.groups) {
    for (const item of group.items) {
      if (seen.has(item.id)) throw new Error(`Duplicate packing item id: ${item.id}`);
      seen.add(item.id);
    }
  }
}

export const PACKING_SECTIONS: PackSection[] = ORDER.map((id) => byId.get(id)!);

/** Total number of tickable rows. */
export const PACKING_ITEM_COUNT = seen.size;
