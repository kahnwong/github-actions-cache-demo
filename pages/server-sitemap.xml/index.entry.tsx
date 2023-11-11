import type { GetServerSidePropsContext } from 'next'
import { END_POINT } from 'config/environment'
import { IJobType } from 'interfaces/JobPropertyTypeList'

const siteUrl = process.env.SITE_URL
const apiUrl = `${siteUrl}${END_POINT}`
function generateSiteMap(posts: IJobType[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map(
         (item) => `
       <url>
           <loc>${siteUrl}/${item?.type}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
            <priority>0.7</priority>
       </url>
     `
       )
       .join('')}
   </urlset>
 `
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // generate the XML sitemap
  let sitemap: string = ''
  await fetch(`${apiUrl}/job_type`)
    .then((resx) => resx.json())
    .then((json) => {
      sitemap = generateSiteMap(json?.payload ?? [])
    })

  ctx.res.setHeader('Content-Type', 'text/xml')
  // send the XML to the browser
  ctx.res.write(sitemap)
  ctx.res.end()

  return {
    props: {}
  }
}

export default function SiteMap() {}
