/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 *  Welcome to the **Polar API** for [polar.sh](https://polar.sh).  The Public API is currently a [work in progress](https://github.com/polarsource/polar/issues/834) and is in active development. 🚀  #### Authentication  Use a [Personal Access Token](https://polar.sh/settings) and send it in the `Authorization` header on the format `Bearer [YOUR_TOKEN]`.  #### Feedback  If you have any feedback or comments, reach out in the [Polar API-issue](https://github.com/polarsource/polar/issues/834), or reach out on the Polar Discord server.  We\'d love to see what you\'ve built with the API and to get your thoughts on how we can make the API better!  #### Connecting  The Polar API is online at `https://api.polar.sh`. 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Article,
  ArticleCreate,
  ArticleUpdate,
  ArticleViewedResponse,
  HTTPValidationError,
  ListResourceArticle,
  Platforms,
} from '../models/index';

export interface ArticlesApiCreateRequest {
    articleCreate: ArticleCreate;
}

export interface ArticlesApiGetRequest {
    id: string;
}

export interface ArticlesApiLookupRequest {
    slug: string;
    organizationName: string;
    platform: Platforms;
}

export interface ArticlesApiSearchRequest {
    organizationName: string;
    platform: Platforms;
}

export interface ArticlesApiUpdateRequest {
    id: string;
    articleUpdate: ArticleUpdate;
}

export interface ArticlesApiViewedRequest {
    id: string;
}

/**
 * 
 */
export class ArticlesApi extends runtime.BaseAPI {

    /**
     * Create a new article.
     * Create article (Public API)
     */
    async createRaw(requestParameters: ArticlesApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Article>> {
        if (requestParameters.articleCreate === null || requestParameters.articleCreate === undefined) {
            throw new runtime.RequiredError('articleCreate','Required parameter requestParameters.articleCreate was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.articleCreate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create a new article.
     * Create article (Public API)
     */
    async create(requestParameters: ArticlesApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Article> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get article.
     * Get article (Public API)
     */
    async getRaw(requestParameters: ArticlesApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Article>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling get.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get article.
     * Get article (Public API)
     */
    async get(requestParameters: ArticlesApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Article> {
        const response = await this.getRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List articles.
     * List articles (Public API)
     */
    async listRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceArticle>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List articles.
     * List articles (Public API)
     */
    async list(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceArticle> {
        const response = await this.listRaw(initOverrides);
        return await response.value();
    }

    /**
     * Lookup article.
     * Lookup article (Public API)
     */
    async lookupRaw(requestParameters: ArticlesApiLookupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Article>> {
        if (requestParameters.slug === null || requestParameters.slug === undefined) {
            throw new runtime.RequiredError('slug','Required parameter requestParameters.slug was null or undefined when calling lookup.');
        }

        if (requestParameters.organizationName === null || requestParameters.organizationName === undefined) {
            throw new runtime.RequiredError('organizationName','Required parameter requestParameters.organizationName was null or undefined when calling lookup.');
        }

        if (requestParameters.platform === null || requestParameters.platform === undefined) {
            throw new runtime.RequiredError('platform','Required parameter requestParameters.platform was null or undefined when calling lookup.');
        }

        const queryParameters: any = {};

        if (requestParameters.slug !== undefined) {
            queryParameters['slug'] = requestParameters.slug;
        }

        if (requestParameters.organizationName !== undefined) {
            queryParameters['organization_name'] = requestParameters.organizationName;
        }

        if (requestParameters.platform !== undefined) {
            queryParameters['platform'] = requestParameters.platform;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles/lookup`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Lookup article.
     * Lookup article (Public API)
     */
    async lookup(requestParameters: ArticlesApiLookupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Article> {
        const response = await this.lookupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search articles.
     * Search articles (Public API)
     */
    async searchRaw(requestParameters: ArticlesApiSearchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceArticle>> {
        if (requestParameters.organizationName === null || requestParameters.organizationName === undefined) {
            throw new runtime.RequiredError('organizationName','Required parameter requestParameters.organizationName was null or undefined when calling search.');
        }

        if (requestParameters.platform === null || requestParameters.platform === undefined) {
            throw new runtime.RequiredError('platform','Required parameter requestParameters.platform was null or undefined when calling search.');
        }

        const queryParameters: any = {};

        if (requestParameters.organizationName !== undefined) {
            queryParameters['organization_name'] = requestParameters.organizationName;
        }

        if (requestParameters.platform !== undefined) {
            queryParameters['platform'] = requestParameters.platform;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Search articles.
     * Search articles (Public API)
     */
    async search(requestParameters: ArticlesApiSearchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceArticle> {
        const response = await this.searchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update an article.
     * Update an article (Public API)
     */
    async updateRaw(requestParameters: ArticlesApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Article>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update.');
        }

        if (requestParameters.articleUpdate === null || requestParameters.articleUpdate === undefined) {
            throw new runtime.RequiredError('articleUpdate','Required parameter requestParameters.articleUpdate was null or undefined when calling update.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.articleUpdate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update an article.
     * Update an article (Public API)
     */
    async update(requestParameters: ArticlesApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Article> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Track article view
     * Track article (Public API)
     */
    async viewedRaw(requestParameters: ArticlesApiViewedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ArticleViewedResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling viewed.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/articles/{id}/viewed`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Track article view
     * Track article (Public API)
     */
    async viewed(requestParameters: ArticlesApiViewedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ArticleViewedResponse> {
        const response = await this.viewedRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
