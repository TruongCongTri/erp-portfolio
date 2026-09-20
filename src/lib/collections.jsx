// The item after `item` in `list`, wrapping around to the first.
export const getNext = (list, item) =>
  list[(list.indexOf(item) + 1) % list.length];

// Default CTA window for a detail page: a teaser of the next item. The
// callout is dictionary text inside a translatable (data) region.
export const nextCta = (next, callout, description) => ({
  img: next.image,
  header: next.name ?? next.title,
  callout: <span translate="no">{callout}</span>,
  description,
});

export const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\u003c"),
    }}
  />
);
