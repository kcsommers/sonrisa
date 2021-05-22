import { OverlayTemplates, OrderableItem } from '@core';

export const getTemplate = (
  template: OverlayTemplates,
  data: any
): JSX.Element | null => {
  switch (template) {
    case OverlayTemplates.DOUGHNUT:
      const doughnut = data as OrderableItem;
      return <p>HIIIII</p>;
    default:
      return null;
  }
};
