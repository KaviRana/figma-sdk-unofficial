
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FigmaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FigmaSDK.test()
    equal(testsdk instanceof FigmaSDK, true,
      'FigmaSDK.test() must return a client synchronously')
  })

})
