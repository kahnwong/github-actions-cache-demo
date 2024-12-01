/** @type {string|string} */
const siteUrl = process.env.SITE_URL
module.exports = {
  siteUrl,
  changefreq: 'monthly',
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`]
  }
}
