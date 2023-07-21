/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/Frostbite-ai/Tally_frontend_main
 */
module.exports = {
  // !STARTERCONF Change the siteUrl
  siteUrl: 'https://tally-frontend-main.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
