import { ApiResponse, FileWrapper, RequestOptions } from '../core';
import { BatchDeleteCatalogObjectsRequest } from '../models/batchDeleteCatalogObjectsRequest';
import { BatchDeleteCatalogObjectsResponse } from '../models/batchDeleteCatalogObjectsResponse';
import { BatchRetrieveCatalogObjectsRequest } from '../models/batchRetrieveCatalogObjectsRequest';
import { BatchRetrieveCatalogObjectsResponse } from '../models/batchRetrieveCatalogObjectsResponse';
import { BatchUpsertCatalogObjectsRequest } from '../models/batchUpsertCatalogObjectsRequest';
import { BatchUpsertCatalogObjectsResponse } from '../models/batchUpsertCatalogObjectsResponse';
import { CatalogInfoResponse } from '../models/catalogInfoResponse';
import { CreateCatalogImageRequest } from '../models/createCatalogImageRequest';
import { CreateCatalogImageResponse } from '../models/createCatalogImageResponse';
import { DeleteCatalogObjectResponse } from '../models/deleteCatalogObjectResponse';
import { ListCatalogResponse } from '../models/listCatalogResponse';
import { RetrieveCatalogObjectResponse } from '../models/retrieveCatalogObjectResponse';
import { SearchCatalogItemsRequest } from '../models/searchCatalogItemsRequest';
import { SearchCatalogItemsResponse } from '../models/searchCatalogItemsResponse';
import { SearchCatalogObjectsRequest } from '../models/searchCatalogObjectsRequest';
import { SearchCatalogObjectsResponse } from '../models/searchCatalogObjectsResponse';
import { UpdateItemModifierListsRequest } from '../models/updateItemModifierListsRequest';
import { UpdateItemModifierListsResponse } from '../models/updateItemModifierListsResponse';
import { UpdateItemTaxesRequest } from '../models/updateItemTaxesRequest';
import { UpdateItemTaxesResponse } from '../models/updateItemTaxesResponse';
import { UpsertCatalogObjectRequest } from '../models/upsertCatalogObjectRequest';
import { UpsertCatalogObjectResponse } from '../models/upsertCatalogObjectResponse';
import { BaseApi } from './baseApi';
export declare class CatalogApi extends BaseApi {
    /**
     * Deletes a set of [CatalogItem]($m/CatalogItem)s based on the
     * provided list of target IDs and returns a set of successfully deleted IDs in
     * the response. Deletion is a cascading event such that all children of the
     * targeted object are also deleted. For example, deleting a CatalogItem will
     * also delete all of its [CatalogItemVariation]($m/CatalogItemVariation)
     * children.
     *
     * `BatchDeleteCatalogObjects` succeeds even if only a portion of the targeted
     * IDs can be deleted. The response will only include IDs that were
     * actually deleted.
     *
     * @param body An object containing the fields to POST for the request.
     *                                                        See the corresponding object definition for field details.
     * @return Response from the API call
     */
    batchDeleteCatalogObjects(body: BatchDeleteCatalogObjectsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<BatchDeleteCatalogObjectsResponse>>;
    /**
     * Returns a set of objects based on the provided ID.
     * Each [CatalogItem]($m/CatalogItem) returned in the set includes all of its
     * child information including: all of its
     * [CatalogItemVariation]($m/CatalogItemVariation) objects, references to
     * its [CatalogModifierList]($m/CatalogModifierList) objects, and the ids of
     * any [CatalogTax]($m/CatalogTax) objects that apply to it.
     *
     * @param body An object containing the fields to POST for the request.
     *                                                          See the corresponding object definition for field
     *                                                          details.
     * @return Response from the API call
     */
    batchRetrieveCatalogObjects(body: BatchRetrieveCatalogObjectsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<BatchRetrieveCatalogObjectsResponse>>;
    /**
     * Creates or updates up to 10,000 target objects based on the provided
     * list of objects. The target objects are grouped into batches and each batch is
     * inserted/updated in an all-or-nothing manner. If an object within a batch is
     * malformed in some way, or violates a database constraint, the entire batch
     * containing that item will be disregarded. However, other batches in the same
     * request may still succeed. Each batch may contain up to 1,000 objects, and
     * batches will be processed in order as long as the total object count for the
     * request (items, variations, modifier lists, discounts, and taxes) is no more
     * than 10,000.
     *
     * @param body An object containing the fields to POST for the request.
     *                                                        See the corresponding object definition for field details.
     * @return Response from the API call
     */
    batchUpsertCatalogObjects(body: BatchUpsertCatalogObjectsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<BatchUpsertCatalogObjectsResponse>>;
    /**
     * Uploads an image file to be represented by a [CatalogImage]($m/CatalogImage) object linked to an
     * existing
     * [CatalogObject]($m/CatalogObject) instance. A call to this endpoint can upload an image, link an
     * image to
     * a catalog object, or do both.
     *
     * This `CreateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an
     * image file part in
     * JPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.
     *
     * @param request
     * @param imageFile
     * @return Response from the API call
     */
    createCatalogImage(request?: CreateCatalogImageRequest, imageFile?: FileWrapper, requestOptions?: RequestOptions): Promise<ApiResponse<CreateCatalogImageResponse>>;
    /**
     * Retrieves information about the Square Catalog API, such as batch size
     * limits that can be used by the `BatchUpsertCatalogObjects` endpoint.
     *
     * @return Response from the API call
     */
    catalogInfo(requestOptions?: RequestOptions): Promise<ApiResponse<CatalogInfoResponse>>;
    /**
     * Returns a list of [CatalogObject]($m/CatalogObject)s that includes
     * all objects of a set of desired types (for example, all [CatalogItem]($m/CatalogItem)
     * and [CatalogTax]($m/CatalogTax) objects) in the catalog. The `types` parameter
     * is specified as a comma-separated list of valid [CatalogObject]($m/CatalogObject) types:
     * `ITEM`, `ITEM_VARIATION`, `MODIFIER`, `MODIFIER_LIST`, `CATEGORY`, `DISCOUNT`, `TAX`, `IMAGE`.
     *
     * __Important:__ ListCatalog does not return deleted catalog items. To retrieve
     * deleted catalog items, use [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects)
     * and set the `include_deleted_objects` attribute value to `true`.
     *
     * @param cursor          The pagination cursor returned in the previous response. Leave unset for an
     *                                  initial request. The page size is currently set to be 100. See [Pagination](https:
     *                                  //developer.squareup.com/docs/basics/api101/pagination) for more information.
     * @param types           An optional case-insensitive, comma-separated list of object types to retrieve.
     *                                  The valid values are defined in the [CatalogObjectType]($m/CatalogObjectType)
     *                                  enum, including `ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`,
     *                                  `MODIFIER`, `MODIFIER_LIST`, or `IMAGE`.  If this is unspecified, the operation
     *                                  returns objects of all the types at the version of the Square API used to make
     *                                  the request.
     * @param catalogVersion  The specific version of the catalog objects to be included in the response.
     *                                  This allows you to retrieve historical versions of objects. The specified version
     *                                  value is matched against the [CatalogObject]($m/CatalogObject)s' `version`
     *                                  attribute.
     * @return Response from the API call
     */
    listCatalog(cursor?: string, types?: string, catalogVersion?: bigint, requestOptions?: RequestOptions): Promise<ApiResponse<ListCatalogResponse>>;
    /**
     * Creates or updates the target [CatalogObject]($m/CatalogObject).
     *
     * @param body An object containing the fields to POST for the request.  See
     *                                                  the corresponding object definition for field details.
     * @return Response from the API call
     */
    upsertCatalogObject(body: UpsertCatalogObjectRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpsertCatalogObjectResponse>>;
    /**
     * Deletes a single [CatalogObject]($m/CatalogObject) based on the
     * provided ID and returns the set of successfully deleted IDs in the response.
     * Deletion is a cascading event such that all children of the targeted object
     * are also deleted. For example, deleting a [CatalogItem]($m/CatalogItem)
     * will also delete all of its
     * [CatalogItemVariation]($m/CatalogItemVariation) children.
     *
     * @param objectId  The ID of the catalog object to be deleted. When an object is deleted, other objects
     *                            in the graph that depend on that object will be deleted as well (for example, deleting
     *                            a catalog item will delete its catalog item variations).
     * @return Response from the API call
     */
    deleteCatalogObject(objectId: string, requestOptions?: RequestOptions): Promise<ApiResponse<DeleteCatalogObjectResponse>>;
    /**
     * Returns a single [CatalogItem]($m/CatalogItem) as a
     * [CatalogObject]($m/CatalogObject) based on the provided ID. The returned
     * object includes all of the relevant [CatalogItem]($m/CatalogItem)
     * information including: [CatalogItemVariation]($m/CatalogItemVariation)
     * children, references to its
     * [CatalogModifierList]($m/CatalogModifierList) objects, and the ids of
     * any [CatalogTax]($m/CatalogTax) objects that apply to it.
     *
     * @param objectId                The object ID of any type of catalog objects to be retrieved.
     * @param includeRelatedObjects   If `true`, the response will include additional objects that are
     *                                           related to the requested object, as follows:  If the `object` field of
     *                                           the response contains a `CatalogItem`, its associated `CatalogCategory`,
     *                                           `CatalogTax`, `CatalogImage` and `CatalogModifierList` objects will be
     *                                           returned in the `related_objects` field of the response. If the `object`
     *                                           field of the response contains a `CatalogItemVariation`, its parent
     *                                           `CatalogItem` will be returned in the `related_objects` field of the
     *                                           response.  Default value: `false`
     * @param catalogVersion          Requests objects as of a specific version of the catalog. This allows
     *                                           you to retrieve historical versions of objects. The value to retrieve a
     *                                           specific version of an object can be found in the version field of
     *                                           [CatalogObject]($m/CatalogObject)s.
     * @return Response from the API call
     */
    retrieveCatalogObject(objectId: string, includeRelatedObjects?: boolean, catalogVersion?: bigint, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveCatalogObjectResponse>>;
    /**
     * Searches for [CatalogObject]($m/CatalogObject) of any type by matching supported search attribute
     * values,
     * excluding custom attribute values on items or item variations, against one or more of the specified
     * query expressions.
     *
     * This (`SearchCatalogObjects`) endpoint differs from the
     * [SearchCatalogItems]($e/Catalog/SearchCatalogItems)
     * endpoint in the following aspects:
     *
     * - `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects`
     * can search for any type of catalog objects.
     * - `SearchCatalogItems` supports the custom attribute query filters to return items or item
     * variations that contain custom attribute values, where `SearchCatalogObjects` does not.
     * - `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted
     * items or item variations, whereas `SearchCatalogObjects` does.
     * - The both endpoints have different call conventions, including the query filter formats.
     *
     * @param body An object containing the fields to POST for the request.  See
     *                                                   the corresponding object definition for field details.
     * @return Response from the API call
     */
    searchCatalogObjects(body: SearchCatalogObjectsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SearchCatalogObjectsResponse>>;
    /**
     * Searches for catalog items or item variations by matching supported search attribute values,
     * including
     * custom attribute values, against one or more of the specified query expressions.
     *
     * This (`SearchCatalogItems`) endpoint differs from the
     * [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects)
     * endpoint in the following aspects:
     *
     * - `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects`
     * can search for any type of catalog objects.
     * - `SearchCatalogItems` supports the custom attribute query filters to return items or item
     * variations that contain custom attribute values, where `SearchCatalogObjects` does not.
     * - `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted
     * items or item variations, whereas `SearchCatalogObjects` does.
     * - The both endpoints use different call conventions, including the query filter formats.
     *
     * @param body An object containing the fields to POST for the request.  See the
     *                                                 corresponding object definition for field details.
     * @return Response from the API call
     */
    searchCatalogItems(body: SearchCatalogItemsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SearchCatalogItemsResponse>>;
    /**
     * Updates the [CatalogModifierList]($m/CatalogModifierList) objects
     * that apply to the targeted [CatalogItem]($m/CatalogItem) without having
     * to perform an upsert on the entire item.
     *
     * @param body An object containing the fields to POST for the request.
     *                                                      See the corresponding object definition for field details.
     * @return Response from the API call
     */
    updateItemModifierLists(body: UpdateItemModifierListsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateItemModifierListsResponse>>;
    /**
     * Updates the [CatalogTax]($m/CatalogTax) objects that apply to the
     * targeted [CatalogItem]($m/CatalogItem) without having to perform an
     * upsert on the entire item.
     *
     * @param body An object containing the fields to POST for the request.  See the
     *                                              corresponding object definition for field details.
     * @return Response from the API call
     */
    updateItemTaxes(body: UpdateItemTaxesRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateItemTaxesResponse>>;
}
