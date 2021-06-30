import { ApiResponse, RequestOptions } from '../core';
import { CreateGiftCardRequest } from '../models/createGiftCardRequest';
import { CreateGiftCardResponse } from '../models/createGiftCardResponse';
import { LinkCustomerToGiftCardRequest } from '../models/linkCustomerToGiftCardRequest';
import { LinkCustomerToGiftCardResponse } from '../models/linkCustomerToGiftCardResponse';
import { ListGiftCardsResponse } from '../models/listGiftCardsResponse';
import { RetrieveGiftCardFromGANRequest } from '../models/retrieveGiftCardFromGANRequest';
import { RetrieveGiftCardFromGANResponse } from '../models/retrieveGiftCardFromGANResponse';
import { RetrieveGiftCardFromNonceRequest } from '../models/retrieveGiftCardFromNonceRequest';
import { RetrieveGiftCardFromNonceResponse } from '../models/retrieveGiftCardFromNonceResponse';
import { RetrieveGiftCardResponse } from '../models/retrieveGiftCardResponse';
import { UnlinkCustomerFromGiftCardRequest } from '../models/unlinkCustomerFromGiftCardRequest';
import { UnlinkCustomerFromGiftCardResponse } from '../models/unlinkCustomerFromGiftCardResponse';
import { BaseApi } from './baseApi';
export declare class GiftCardsApi extends BaseApi {
    /**
     * Lists all gift cards. You can specify optional filters to retrieve
     * a subset of the gift cards.
     *
     * @param type        If a type is provided, gift cards of this type are returned  (see
     *                              [GiftCardType]($m/GiftCardType)). If no type is provided, it returns gift cards of
     *                              all types.
     * @param state       If the state is provided, it returns the gift cards in the specified state  (see
     *                              [GiftCardStatus]($m/GiftCardStatus)). Otherwise, it returns the gift cards of all
     *                              states.
     * @param limit       If a value is provided, it returns only that number of results per page. The maximum
     *                              number of results allowed per page is 50. The default value is 30.
     * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this
     *                              cursor to retrieve the next set of results for the original query. If a cursor is not
     *                              provided, it returns the first page of the results.  For more information, see
     *                              [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
     * @param customerId  If a value is provided, returns only the gift cards linked to the specified
     *                              customer
     * @return Response from the API call
     */
    listGiftCards(type?: string, state?: string, limit?: number, cursor?: string, customerId?: string, requestOptions?: RequestOptions): Promise<ApiResponse<ListGiftCardsResponse>>;
    /**
     * Creates a digital gift card. You must activate the gift card before
     * it can be used. For more information, see
     * [Selling gift cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api#selling-
     * square-gift-cards).
     *
     * @param body An object containing the fields to POST for the request.  See the
     *                                             corresponding object definition for field details.
     * @return Response from the API call
     */
    createGiftCard(body: CreateGiftCardRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CreateGiftCardResponse>>;
    /**
     * Retrieves a gift card using the gift card account number (GAN).
     *
     * @param body An object containing the fields to POST for the request.
     *                                                      See the corresponding object definition for field details.
     * @return Response from the API call
     */
    retrieveGiftCardFromGAN(body: RetrieveGiftCardFromGANRequest, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveGiftCardFromGANResponse>>;
    /**
     * Retrieves a gift card using a nonce (a secure token) that represents the gift card.
     *
     * @param body An object containing the fields to POST for the request.
     *                                                        See the corresponding object definition for field details.
     * @return Response from the API call
     */
    retrieveGiftCardFromNonce(body: RetrieveGiftCardFromNonceRequest, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveGiftCardFromNonceResponse>>;
    /**
     * Links a customer to a gift card
     *
     * @param giftCardId   The ID of the gift card to link.
     * @param body         An object containing the fields to POST for the
     *                                                             request.  See the corresponding object definition for
     *                                                             field details.
     * @return Response from the API call
     */
    linkCustomerToGiftCard(giftCardId: string, body: LinkCustomerToGiftCardRequest, requestOptions?: RequestOptions): Promise<ApiResponse<LinkCustomerToGiftCardResponse>>;
    /**
     * Unlinks a customer from a gift card
     *
     * @param giftCardId
     * @param body         An object containing the fields to POST for the
     *                                                                 request.  See the corresponding object definition
     *                                                                 for field details.
     * @return Response from the API call
     */
    unlinkCustomerFromGiftCard(giftCardId: string, body: UnlinkCustomerFromGiftCardRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UnlinkCustomerFromGiftCardResponse>>;
    /**
     * Retrieves a gift card using its ID.
     *
     * @param id The ID of the gift card to retrieve.
     * @return Response from the API call
     */
    retrieveGiftCard(id: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveGiftCardResponse>>;
}