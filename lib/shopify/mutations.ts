/**
 * @file GraphQL cart mutations — cartCreate, cartLinesAdd, cartLinesUpdate, cartLinesRemove (shared cart fragment).
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { cartFragment } from "./queries";

/* Cart mutations. Each returns the shared `...cart` fragment. */

export const createCartMutation = /* GraphQL */ `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const updateCartMutation = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;
