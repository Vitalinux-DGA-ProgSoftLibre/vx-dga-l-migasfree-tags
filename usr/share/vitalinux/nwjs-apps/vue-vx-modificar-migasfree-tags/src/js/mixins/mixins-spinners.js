/*
  Tipos de spinners: http://greyby.github.io/vue-spinner/
  Ejemplos de uso: https://github.com/greyby/vue-spinner/
  Se pueden personalizar las siguientes props:
  <ring-loader :loading="loading" :color="color" :size="size"></ring-loader>
  color: Color del spinner
  size: Tamaño del spinner
  loading: Controla el show/hidden del spinner
*/
var PulseLoader = VueSpinner.PulseLoader
var GridLoader = VueSpinner.GridLoader
var ClipLoader = VueSpinner.ClipLoader
var RiseLoader = VueSpinner.RiseLoader
var BeatLoader = VueSpinner.BeatLoader
var SyncLoader = VueSpinner.SyncLoader
var RotateLoader = VueSpinner.RotateLoader
var FadeLoader = VueSpinner.FadeLoader
var PacmanLoader = VueSpinner.PacmanLoader
var SquareLoader = VueSpinner.SquareLoader
var ScaleLoader = VueSpinner.ScaleLoader
var SkewLoader = VueSpinner.SkewLoader
var MoonLoader = VueSpinner.MoonLoader
var RingLoader = VueSpinner.RingLoader
var BounceLoader = VueSpinner.BounceLoader
var DotLoader = VueSpinner.DotLoader

Vue.mixin({
  components: {
    PulseLoader,
    GridLoader,
    ClipLoader,
    RiseLoader,
    BeatLoader,
    SyncLoader,
    RotateLoader,
    FadeLoader,
    PacmanLoader,
    SquareLoader,
    ScaleLoader,
    SkewLoader,
    MoonLoader,
    RingLoader,
    BounceLoader,
    DotLoader
  }
})
