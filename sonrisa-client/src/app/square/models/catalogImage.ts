import { Schema } from '../schema';
/**
 * An image file to use in Square catalogs. It can be associated with catalog
 * items, item variations, and categories.
 */
export interface CatalogImage {
    /**
     * The internal name to identify this image in calls to the Square API.
     * This is a searchable attribute for use in applicable query filters
     * using the [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects).
     * It is not unique and should not be shown in a buyer facing context.
     */
    name?: string;
    /**
     * The URL of this image, generated by Square after an image is uploaded
     * using the [CreateCatalogImage]($e/Catalog/CreateCatalogImage) endpoint.
     */
    url?: string;
    /**
     * A caption that describes what is shown in the image. Displayed in the
     * Square Online Store. This is a searchable attribute for use in applicable query filters
     * using the [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects).
     */
    caption?: string;
}
export declare const catalogImageSchema: Schema<CatalogImage>;
