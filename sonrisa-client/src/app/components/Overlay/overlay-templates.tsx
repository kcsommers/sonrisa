import { OverlayTemplates } from '@core';
import { OrderOverlay } from '../OrderOverlay/OrderOverlay';

export const getTemplate = (
  template: OverlayTemplates,
  context: any
): JSX.Element | null => {
  switch (template) {
    case OverlayTemplates.ORDER:
      return <OrderOverlay item={context} />;
    default:
      return null;
  }
};
