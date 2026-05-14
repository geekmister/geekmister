import DefaultTheme from 'vitepress/theme';
import QuizQuestion from './components/QuizQuestion.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('QuizQuestion', QuizQuestion);
    if (DefaultTheme.enhanceApp) {
      return DefaultTheme.enhanceApp({ app, router, siteData });
    }
  },
};
