import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  domain: process.env.SHOPIFY_DOMAIN!,
  apiVersion: "",
});

export const parseShopifyResponse = (response: Client.Product[]) =>
  JSON.parse(JSON.stringify(response));
