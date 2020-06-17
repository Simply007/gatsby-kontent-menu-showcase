/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: '@kentico/gatsby-source-kontent',
      options: {
        projectId: 'TODO', // Fill in your Project ID
        languageCodenames: [
          'default', // Languages in your project (Project settings -> Localization),
        ],
      },
    },
  ],
}
