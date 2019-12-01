const mapStyle = require('./map-config');


const MAP = {
  MARKER_ICON: {
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAEtUlEQVRYhe2YX0xbVRzHv7fQSyltaS8FxwKZaCa4sEkrWXBshi0hiG/w4MsSZ4zZfFuiM5qYIEt8MvFdfSP+eWAPxIBhCNvqgDljWBjMMsqYTbmUf4V7b0/b29vb9vowpnVy/7RlPu37eM73e36fnJxzz7kHeKbiRBUTvt3Zedhit18wl5d7S8xmh4miHAAARYnKshyVRfFOkpCv28bHl/5XwN+7uz0Wh+MLZ22tx1VbW1VC03v60qkU+HA4wq+tzcqCcMk7Nnb3qQIqAHW3p+dLV13d2eqGhhqKMhZXsllsBYObHMt+98rQ0CUKUPYd8EZHR6nL7R6qa27urKisLDOay1WC55Mrfv84t7XVe9rnSxvJmIwOzjDMwPMeT3ehcABgdTotDR7Pm4zL9YPRTIkR02xv74cHjxx531oE3N8FzWYTXVFx6KzbLX11//6ven7dGbzR0WErdzjes1dVVRQL91h2t9tmsdvPT7W32/W8uoCMy/V5bVNTo5ZH4Dis8gLCWSCcBVZ5AQLPa457sKnpJduBA5f16pfqGWibrd1cVqa6mTY2t0B3daPmxMl/tcemJ7ExfhXPVVfvmTOXl1MWq7Vdr77mDN7u7DxsZ5gGtX6B40B3dcP2BBwA2NpPge58Q3MmKxjmhekzZ14sGJC2Wl+zMkyVWn+MMu0JlwsZ0/iSVTCM22y1thUMWGIyNdIWi3rY6dKK73qcqn1miwU0TTdp5rU6FYpym0p1l2nBKnk09t6LdFfagEAkm8mo9md5Thciy6l7Muk0oCgbWnlNQFmSFlKiqHpu2qAgNj2pmieTN2HXOExlUVSyqdRCwYCZeHwqznE7av2VTidS41f3hCSTN5GeGINDYw3GOW47IUm3tBh0LwuBc+fm61tamrU8As8jBgqUY/c6KAiwU9CEA4DQ7Ox848DAMS2P7g5IJZMBAJqAlU4nKnMbXNpgAKAoCmRRDOj5dI86KRb7nkQiom7FPEUikaQci32r59MFXLZaf9xZWVneH6x/xLFsoOX48WE9ny7gW1euZJKEXNfazfkqJYqKKAjXqP7+rJ7X0IU1TUjf5vJywT8+T2ojEFiUUql+I15DgK0TE0KC50czqVRRYACQliQkCBltGx2NGvEbvvKLiUTf2tJS0WtxbXFxKba+/plRv2HAttHRKIlEBiVCCp5GkRA5vrMzeHJ6mhjNGAYEAIHn+8ILC3P5oz3Smt8/m2FZ3Vt0rvICPO3zpZOEfMKxrOrxp6btUGhbisc/ap2ZkfPJ5QUIAN6RkWubDx9OyMmk4c+OLEnKdij0s3d4+Jd86+UNCABpQs6zc3N/GDIrCti5uXmyvn6hkFoFAbZOTAhiLHYxEgyu63m3gsEtKRq9mM/GyFVBgADw6vDw9e1gcDAejUpqniQhEre6OuAZGfEVWqdgQAAI0PQH4Xv3fsuk//vMkkmnEZqfv3Xs6NGPi6lR1PsgANzq6mKYmpqpQ17vy7ntf87MLCRY9vVWny9SzPhFzSAAnBgb24lHIu+G/f7Q47ZVvz8U5/l3ioUDDD4e6embBw/Yt+vrN00UdSoZjSa2Q6FPW0dGftqPsfdVcz09l2d7evI6KZ7paesvpbHzlsrze1IAAAAASUVORK5CYII=',
    scaledSize: {
      width: 40,
      height: 40,
      f: 'px',
      b: 'px'
    }
  },
  OPTS: {
    mapTypeControl: false,
    scaleControl: false,
    zoomControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: mapStyle
  }
}

export {MAP}