/**
 * @jest-environment jsdom
 */
/// <reference types="cordova-plus/types" />
import {describe, expect, test} from '@jest/globals';
import {waitEvent} from '../src/www/shared';

describe('waitEvent', () => {
  const fireDocumentEvent =
    typeof cordova !== 'undefined'
      ? cordova.fireDocumentEvent
      : jest.fn(event => {
          document.dispatchEvent(new Event(event));
        });

  test('waitEvent() once for sucess event', async () => {
    const p = waitEvent('sucess');
    fireDocumentEvent('sucess', undefined);

    const event = await p;
    expect(event.type).toBe('sucess');
  });

  test('waitEvent() once for fail event', async () => {
    const p = waitEvent('sucess', 'fail');
    fireDocumentEvent('fail', undefined);

    const event = await p.catch((x: Event) => x);
    expect(event.type).toBe('fail');
  });
});
