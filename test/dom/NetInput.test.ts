import * as tf from '@tensorflow/tfjs-core';

import { fetchImage } from '../../src/dom/fetchImage';
import { NetInput } from '../../src/dom/NetInput';
import { expectAllTensorsReleased, fakeTensor3d } from '../utils';

describe('NetInput', () => {

  let imgEl: HTMLImageElement

  beforeAll(async () => {
    imgEl = await fetchImage('base/test/img.png')
  })

  describe('toBatchTensor', () => {

    it('HTMLImageElement, batchSize === 1', () => tf.tidy(() => {
      const netInput = new NetInput([imgEl])
      const batchTensor = netInput.toBatchTensor(100)
      expect(batchTensor.shape).toEqual([1, 100, 100, 3])
    }))

    it('tf.Tensor3D, batchSize === 1', () => tf.tidy(() => {
      const tensor = tf.zeros<tf.Rank.R3>([200, 200, 3], 'int32')
      const netInput = new NetInput([tensor])
      const batchTensor = netInput.toBatchTensor(100)
      expect(batchTensor.shape).toEqual([1, 100, 100, 3])
    }))

    it('HTMLImageElements, batchSize === 4', () => tf.tidy(() => {
      const netInput = new NetInput([imgEl, imgEl, imgEl, imgEl])
      const batchTensor = netInput.toBatchTensor(100)
      expect(batchTensor.shape).toEqual([4, 100, 100, 3])
    }))

    it('tf.Tensor3Ds, batchSize === 4', () => tf.tidy(() => {
      const tensor = tf.zeros<tf.Rank.R3>([200, 200, 3], 'int32')
      const netInput = new NetInput([tensor, tensor, tensor, tensor])
      const batchTensor = netInput.toBatchTensor(100)
      expect(batchTensor.shape).toEqual([4, 100, 100, 3])
    }))

    it('tf.Tensor3Ds and HTMLImageElements, batchSize === 4', () => tf.tidy(() => {
      const tensor = tf.zeros<tf.Rank.R3>([200, 200, 3], 'int32')
      const netInput = new NetInput([tensor, tensor, imgEl, imgEl])
      const batchTensor = netInput.toBatchTensor(100)
      expect(batchTensor.shape).toEqual([4, 100, 100, 3])
    }))

  })

  describe('no memory leaks', () => {

    it('constructor', async () => {
      const tensors = [fakeTensor3d(), fakeTensor3d(), fakeTensor3d()]

      await expectAllTensorsReleased(() => {
        new NetInput([imgEl])
        new NetInput([imgEl, imgEl, imgEl])
        new NetInput([tensors[0]])
        new NetInput(tensors)
      })

      tensors.forEach(t => t.dispose())
    })

    describe('toBatchTensor', () => {

      it('single image element', async () => {
        await expectAllTensorsReleased(() => {
          const batchTensor = new NetInput([imgEl]).toBatchTensor(100, false)
          batchTensor.dispose()
        })
      })

      it('multiple image elements', async () => {
        await expectAllTensorsReleased(() => {
          const batchTensor = new NetInput([imgEl, imgEl, imgEl]).toBatchTensor(100, false)
          batchTensor.dispose()
        })
      })

    })

  })

})
