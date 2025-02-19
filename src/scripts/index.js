import Cleeng from './cleeng';

const cleengInstance = new Cleeng();

if (typeof window !== 'undefined') {
  window.cleeng = cleengInstance;
}
