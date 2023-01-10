import DefaultTheme from 'vitepress/theme'
import App from '../../../src/App.vue'
import {EnhanceAppContext} from "vitepress";

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    ctx.app.component('App', App)
  }
}
