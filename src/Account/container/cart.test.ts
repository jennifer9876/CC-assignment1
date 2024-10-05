// Types
import { OnlineCartEntryProduct } from '@types';

// Fixtures
import {
  mockCartContext,
  mockProductItemContent,
} from 'src/features/Cart/containers/__fixtures__/Cart.fixtures';
import { cartTilePropFixture } from '../../__fixtures__/CartAlertTileProp.fixtures';

// Utils
import quantityMessageHandler from '../../tileMessages/quantityMessageHandler';
import { handleDuplicateFineLines } from '../../tileMessages/handleDuplicateFineLines';

// Content
import { injectQuantityToMessage } from '../../../content/Cart.content';

// Test comment
// This test file is for testing the quantityMessageHandler function

const mockCartProductTileContent = mockProductItemContent.productTiles;
const cartEntry = mockCartContext.allEntries[0]!;

jest.mock('../../tileMessages/handleDuplicateFineLines', () => ({
  handleDuplicateFineLines: jest.fn(),
}));

const mockHandleDuplicateFineLines = handleDuplicateFineLines as jest.Mock;

describe('quantityMessageHandler', () => {
  it('Should return null for unavailable item', () => {
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: false,
    };

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).toBeNull();
  });

  it('Should return null for unavailable core item with delivery fulfilment type', () => {
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: false,
      selectedFulfilmentType: 'Delivery',
    };

    mockHandleDuplicateFineLines.mockReturnValue({
      quantity: entryToTest.quantity,
      hasLargestQuantity: true,
    });

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).toBeNull();
  });

  it('Should return null for valid live item entry', () => {
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: true,
      product: {
        ...cartEntry.product,
        isMarketplace: false,
        isSpecialOrder: false,
        stockStatus: {
          status: 'InStock',
          stockLevel: 20,
        },
      },
    };

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).toBeNull();
  });

  it('Should not return null for live item entry which is out of stock', () => {
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: true,
      product: {
        ...cartEntry.product,
        isMarketplace: false,
        isSpecialOrder: false,
        stockStatus: {
          status: 'OutOfStock',
          stockLevel: 20,
        },
      },
    };

    mockHandleDuplicateFineLines.mockReturnValue({
      quantity: entryToTest.quantity,
      hasLargestQuantity: true,
    });

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result?.message).toBe(
      mockCartProductTileContent.alertMessage.outOfStockForClickAndCollect
    );
    expect(result?.errorType).toBe('Availability');
    expect(result?.alertVariant).toBe(cartTilePropFixture.alertVariant);
    expect(result?.alertVariantType).toBe(cartTilePropFixture.alertVariantType);
    expect(result?.firstButtonLabel).toBe(cartTilePropFixture.firstButtonLabel);
    expect(result?.secondButtonLabel).toBe(
      cartTilePropFixture.secondButtonLabel
    );
    expect(result?.secondButtonVariant).toBe(
      cartTilePropFixture.secondButtonVariant
    );
    expect(result?.onFirstButtonPress).not.toBe(undefined);
    expect(result?.onSecondButtonPress).not.toBe(undefined);
  });

  it('Should not return null for live item entry which exceeds item limit', () => {
    const maxOrderQuantity = 1;
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      product: {
        ...cartEntry.product,
        maxOrderQuantity,
      },
    };

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).not.toBeNull();
    expect(result).toEqual({
      ...cartTilePropFixture,
      alertVariant: 'alertNoActions',
      message: injectQuantityToMessage(
        mockCartProductTileContent.alertMessage.exceedItemLimit,
        maxOrderQuantity
      ),
    });
  });

  it('CSO should ignore stock level', () => {
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: true,
      product: {
        ...cartEntry.product,
        isMarketplace: false,
        isSpecialOrder: true,
        stockStatus: {
          status: 'NotAvailable',
          stockLevel: 0,
        },
      },
    };

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).toBeNull();
  });

  it('handles undefined quantity from handleDuplicateFineLines', () => {
    const maxOrderQuantity = 1;
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      product: {
        ...cartEntry.product,
        maxOrderQuantity,
      },
    };
    mockHandleDuplicateFineLines.mockReturnValue({
      quantity: undefined,
      hasLargestQuantity: true,
    });

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).not.toBeNull();
    expect(result).toEqual({
      ...cartTilePropFixture,
      alertVariant: 'alertNoActions',
      message: injectQuantityToMessage(
        mockCartProductTileContent.alertMessage.exceedItemLimit,
        maxOrderQuantity
      ),
    });
  });

  it('Should return cart alert props for core item that exceeding stock level with click & collect', () => {
    const itemStockLevel = cartEntry.product.stockStatus.stockLevel;
    const entryToTest: OnlineCartEntryProduct = {
      ...cartEntry,
      productAvailabilityFlag: false,
    };

    mockHandleDuplicateFineLines.mockReturnValue({
      quantity: itemStockLevel + 1,
      hasLargestQuantity: true,
    });

    const result = quantityMessageHandler(
      entryToTest,
      mockCartProductTileContent
    );

    expect(result).not.toBeNull();
    expect(result).toEqual({
      ...cartTilePropFixture,
      alertVariant: 'alertNoActions',
      message: injectQuantityToMessage(
        mockCartProductTileContent.alertMessage.exceedStockAvailability,
        itemStockLevel
      ),
    });
  });
});
